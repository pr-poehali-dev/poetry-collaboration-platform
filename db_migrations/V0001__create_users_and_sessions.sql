CREATE TABLE IF NOT EXISTS t_p14828443_poetry_collaboration.users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  bio TEXT DEFAULT '',
  role TEXT DEFAULT 'reader',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p14828443_poetry_collaboration.sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES t_p14828443_poetry_collaboration.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days')
);
