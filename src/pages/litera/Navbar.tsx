import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, navItems } from "./data";

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  menuOpen,
  setMenuOpen,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCard = () => {
    navigator.clipboard.writeText("5228600527576708");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => setActiveSection("home")}
          className="font-display text-2xl text-gold tracking-wide hover:opacity-80 transition-opacity"
        >
          Литера
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`nav-link text-sm font-body tracking-wider uppercase ${
                activeSection === item.id ? "text-gold active" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <Icon name="Search" size={18} />
          </button>
          <button
            onClick={() => setActiveSection("profile")}
            className="p-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <Icon name="User" size={18} />
          </button>
          <button
            className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/40 text-gold text-sm hover:bg-gold hover:text-background transition-all"
            onClick={() => setSupportModalOpen(true)}
          >
            <Icon name="Heart" size={14} />
            Поддержать сайт
          </button>
          <button
            className="hidden md:flex items-center gap-2 px-4 py-1.5 border border-gold text-gold text-sm hover:bg-gold hover:text-background transition-all"
            onClick={() => {}}
          >
            Войти
          </button>
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border px-6 py-3 bg-background">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Icon name="Search" size={16} className="text-muted-foreground" />
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск авторов, стихов, книг..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background py-4 px-6 space-y-3">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
              className={`block w-full text-left text-sm uppercase tracking-wider ${
                activeSection === item.id ? "text-gold" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-border">
            <button
              onClick={() => { setSupportModalOpen(true); setMenuOpen(false); }}
              className="flex items-center gap-2 text-sm text-gold uppercase tracking-wider"
            >
              <Icon name="Heart" size={14} />
              Поддержать сайт
            </button>
          </div>
        </div>
      )}
    </nav>

    {supportModalOpen && (

      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border w-full max-w-sm p-8">
          <div className="flex items-start justify-between mb-6">
            <h3 className="font-display text-2xl">Поддержать сайт</h3>
            <button onClick={() => setSupportModalOpen(false)} className="text-muted-foreground hover:text-foreground">
              <Icon name="X" size={18} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Спасибо, что цените нашу работу! Переведите любую сумму на карту:
          </p>
          <div className="border border-border p-4 mb-3">
            <div className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-1">Банк</div>
            <div className="font-body text-sm">Сбербанк</div>
          </div>
          <div
            className="border border-border p-4 flex items-center justify-between cursor-pointer hover:border-gold transition-colors group"
            onClick={copyCard}
          >
            <div>
              <div className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-1">Номер карты</div>
              <div className="font-body text-lg tracking-widest">5228 6005 2757 6708</div>
            </div>
            <div className={`flex items-center gap-1.5 text-xs transition-colors ${copied ? "text-gold" : "text-muted-foreground/40 group-hover:text-gold"}`}>
              <Icon name={copied ? "Check" : "Copy"} size={14} />
              {copied ? "Скопировано" : "Копировать"}
            </div>
          </div>
          <p className="text-xs text-muted-foreground/40 mt-4 text-center">
            Нажмите на карту, чтобы скопировать номер
          </p>
        </div>
      </div>
    )}
    </>
  );
}