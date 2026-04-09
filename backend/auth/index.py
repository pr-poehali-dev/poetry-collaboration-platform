"""
Авторизация: регистрация, вход, выход, получение текущего пользователя.
Роутинг через ?action=register|login|logout|me. v2
"""
import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = "t_p14828443_poetry_collaboration"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Id",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def json_response(data: dict, status: int = 200) -> dict:
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, ensure_ascii=False)}

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    body = json.loads(event.get("body") or "{}")
    session_id = event.get("headers", {}).get("x-session-id", "")
    action = (event.get("queryStringParameters") or {}).get("action", "me")

    conn = get_conn()
    cur = conn.cursor()

    # POST ?action=register
    if method == "POST" and action == "register":
        name = body.get("name", "").strip()
        email = body.get("email", "").strip().lower()
        password = body.get("password", "")
        role = body.get("role", "reader")

        if not name or not email or not password:
            return json_response({"error": "Заполните все поля"}, 400)
        if len(password) < 6:
            return json_response({"error": "Пароль должен быть не менее 6 символов"}, 400)

        cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = %s", (email,))
        if cur.fetchone():
            return json_response({"error": "Email уже зарегистрирован"}, 400)

        pw_hash = hash_password(password)
        cur.execute(
            f"INSERT INTO {SCHEMA}.users (name, email, password_hash, role) VALUES (%s, %s, %s, %s) RETURNING id, name, email, role, bio, avatar_url",
            (name, email, pw_hash, role)
        )
        user = cur.fetchone()
        sid = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {SCHEMA}.sessions (id, user_id) VALUES (%s, %s)", (sid, user[0]))
        conn.commit()
        return json_response({"session_id": sid, "user": {"id": user[0], "name": user[1], "email": user[2], "role": user[3], "bio": user[4] or "", "avatar_url": user[5] or ""}})

    # POST ?action=login
    if method == "POST" and action == "login":
        email = body.get("email", "").strip().lower()
        password = body.get("password", "")

        cur.execute(f"SELECT id, name, email, role, bio, avatar_url, password_hash FROM {SCHEMA}.users WHERE email = %s", (email,))
        row = cur.fetchone()
        if not row or row[6] != hash_password(password):
            return json_response({"error": "Неверный email или пароль"}, 401)

        sid = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {SCHEMA}.sessions (id, user_id) VALUES (%s, %s)", (sid, row[0]))
        conn.commit()
        return json_response({"session_id": sid, "user": {"id": row[0], "name": row[1], "email": row[2], "role": row[3], "bio": row[4] or "", "avatar_url": row[5] or ""}})

    # POST ?action=logout
    if method == "POST" and action == "logout":
        if session_id:
            cur.execute(f"DELETE FROM {SCHEMA}.sessions WHERE id = %s", (session_id,))
            conn.commit()
        return json_response({"ok": True})

    # GET ?action=me (default)
    if not session_id:
        return json_response({"user": None})
    cur.execute(
        f"SELECT u.id, u.name, u.email, u.role, u.bio, u.avatar_url FROM {SCHEMA}.users u "
        f"JOIN {SCHEMA}.sessions s ON s.user_id = u.id WHERE s.id = %s AND s.expires_at > NOW()",
        (session_id,)
    )
    row = cur.fetchone()
    if not row:
        return json_response({"user": None})
    return json_response({"user": {"id": row[0], "name": row[1], "email": row[2], "role": row[3], "bio": row[4] or "", "avatar_url": row[5] or ""}})