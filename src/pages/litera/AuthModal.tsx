import { useState } from "react";
import Icon from "@/components/ui/icon";
import { AuthUser } from "./useAuth";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<AuthUser>;
  onRegister: (name: string, email: string, password: string, role: string) => Promise<AuthUser>;
}

export default function AuthModal({ onClose, onLogin, onRegister }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await onLogin(email, password);
      } else {
        await onRegister(name, email, password, role);
      }
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border w-full max-w-sm p-8">
        <div className="flex items-start justify-between mb-6">
          <h3 className="font-display text-2xl">
            {tab === "login" ? "Вход" : "Регистрация"}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-border">
          {(["login", "register"] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className={`flex-1 pb-3 text-xs uppercase tracking-widest transition-colors ${
                tab === t ? "text-gold border-b border-gold -mb-px" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {tab === "register" && (
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ваше имя"
              className="w-full bg-background border border-border px-4 py-2.5 text-sm outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/40"
            />
          )}
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full bg-background border border-border px-4 py-2.5 text-sm outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/40"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            onKeyDown={e => e.key === "Enter" && submit()}
            className="w-full bg-background border border-border px-4 py-2.5 text-sm outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/40"
          />
          {tab === "register" && (
            <div>
              <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-2">Я на платформе как:</p>
              <div className="flex gap-2">
                {[
                  { id: "reader", label: "Читатель" },
                  { id: "author", label: "Автор" },
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`flex-1 py-2 text-xs border transition-all ${
                      role === r.id ? "border-gold bg-gold text-background" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-3 text-xs text-destructive">{error}</p>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-5 py-3 bg-gold text-background text-sm uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Подождите..." : tab === "login" ? "Войти" : "Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
}