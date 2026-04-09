import { useState, useEffect } from "react";

const AUTH_URL = "https://functions.poehali.dev/41772aca-056c-471f-be21-1273d8c1bd53";
const SESSION_KEY = "litera_session";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar_url: string;
}

function getSessionId(): string {
  return localStorage.getItem(SESSION_KEY) || "";
}

function saveSession(sid: string) {
  localStorage.setItem(SESSION_KEY, sid);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

async function authFetch(action: string, method: string, body?: object, sessionId?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (sessionId) headers["X-Session-Id"] = sessionId;
  const res = await fetch(`${AUTH_URL}?action=${action}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sid = getSessionId();
    if (!sid) { setLoading(false); return; }
    authFetch("me", "GET", undefined, sid).then(data => {
      setUser(data.user || null);
      setLoading(false);
    });
  }, []);

  const register = async (name: string, email: string, password: string, role: string) => {
    const data = await authFetch("register", "POST", { name, email, password, role });
    if (data.error) throw new Error(data.error);
    saveSession(data.session_id);
    setUser(data.user);
    return data.user;
  };

  const login = async (email: string, password: string) => {
    const data = await authFetch("login", "POST", { email, password });
    if (data.error) throw new Error(data.error);
    saveSession(data.session_id);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    const sid = getSessionId();
    await authFetch("logout", "POST", undefined, sid);
    clearSession();
    setUser(null);
  };

  return { user, loading, register, login, logout };
}
