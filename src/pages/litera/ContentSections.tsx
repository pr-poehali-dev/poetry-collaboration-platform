import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, poems, books, musicians, authors, HERO_IMG, MUSIC_IMG, AUTHOR_IMG } from "./data";
import { AuthUser } from "./useAuth";

// ── PROFILE ───────────────────────────────────────────────────────────────────

interface ProfileSectionProps {
  favPoems: number[];
  toggleFav: (id: number) => void;
  user: AuthUser | null;
  onAuthClick: () => void;
}

export function ProfileSection({ favPoems, toggleFav, user, onAuthClick }: ProfileSectionProps) {
  if (!user) {
    return (
      <div className="animate-fade-in max-w-5xl mx-auto px-6 py-32 text-center">
        <Icon name="User" size={48} className="mx-auto mb-6 text-muted-foreground/30" />
        <h1 className="font-display text-4xl mb-4">Войдите в аккаунт</h1>
        <p className="text-muted-foreground mb-8">Чтобы увидеть профиль, нужно войти или зарегистрироваться.</p>
        <button onClick={onAuthClick} className="px-8 py-3 bg-gold text-background text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
          Войти / Регистрация
        </button>
      </div>
    );
  }

  const roleLabel = user.role === "author" ? "Автор" : "Читатель";

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-start gap-12 mb-16">
        <div className="relative">
          <div className="w-36 h-36 overflow-hidden border-2 border-gold/30 bg-muted flex items-center justify-center">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <Icon name="User" size={48} className="text-muted-foreground/40" />
            )}
          </div>
          <button className="absolute bottom-2 right-2 w-8 h-8 bg-gold text-background flex items-center justify-center">
            <Icon name="Camera" size={14} />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="font-display text-5xl mb-2">{user.name}</h1>
          <p className="text-gold text-sm uppercase tracking-widest mb-4">{roleLabel}</p>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            {user.bio || "Расскажите о себе — отредактируйте профиль."}
          </p>
          <p className="text-xs text-muted-foreground/40 mt-2">{user.email}</p>
          <div className="flex gap-3 mt-6">
            <button className="px-6 py-2 bg-gold text-background text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
              Редактировать
            </button>
            <button className="px-6 py-2 border border-border text-muted-foreground text-sm uppercase tracking-widest hover:text-foreground hover:border-foreground transition-colors">
              Настройки
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-12">
        <h2 className="font-display text-3xl mb-8">Мои работы</h2>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {poems.filter(p => p.author === "Анна Светлова").map(poem => (
            <div key={poem.id} className="bg-background p-6 card-hover">
              <div className="text-xs text-gold uppercase tracking-widest mb-2">{poem.category}</div>
              <h3 className="font-display text-xl mb-2">{poem.title}</h3>
              <p className="text-muted-foreground text-sm italic font-display leading-relaxed whitespace-pre-line">{poem.preview}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground/60">
                <span className="flex items-center gap-1"><Icon name="Heart" size={12} /> {poem.likes}</span>
                <button className="hover:text-gold transition-colors">Редактировать</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-12 mt-12">
        <h2 className="font-display text-3xl mb-8">Избранное</h2>
        {favPoems.length === 0 ? (
          <p className="text-muted-foreground text-sm">Нет избранных работ</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {poems.filter(p => favPoems.includes(p.id)).map(poem => (
              <div key={poem.id} className="bg-background p-6">
                <div className="text-xs text-gold uppercase tracking-widest mb-2">{poem.category}</div>
                <h3 className="font-display text-xl mb-1">{poem.title}</h3>
                <p className="text-xs text-muted-foreground/60">{poem.author}</p>
                <button onClick={() => toggleFav(poem.id)} className="mt-3 text-gold">
                  <Icon name="Heart" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── POEMS ─────────────────────────────────────────────────────────────────────

interface PoemsSectionProps {
  favPoems: number[];
  toggleFav: (id: number) => void;
  searchQuery: string;
}

export function PoemsSection({ favPoems, toggleFav, searchQuery }: PoemsSectionProps) {
  const filteredPoems = poems.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayPoems = searchQuery ? filteredPoems : poems;

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="section-number">01</div>
        <h1 className="font-display text-6xl -mt-6 mb-4">Стихотворения</h1>
        <div className="gold-divider" />
      </div>
      <div className="flex items-center gap-4 mb-10 overflow-x-auto scrollbar-hidden pb-2">
        {["Все", "Лирика", "Философия", "Природа", "Любовь"].map(cat => (
          <button key={cat} className="whitespace-nowrap px-4 py-1.5 border border-border text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
            {cat}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {displayPoems.map((poem) => (
          <div key={poem.id} className="bg-background p-8 card-hover cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs text-gold uppercase tracking-widest">{poem.category}</span>
              <button onClick={() => toggleFav(poem.id)} className={`transition-colors ${favPoems.includes(poem.id) ? "text-gold" : "text-muted-foreground/30 hover:text-gold"}`}>
                <Icon name="Heart" size={14} />
              </button>
            </div>
            <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors">{poem.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed italic font-display whitespace-pre-line mb-6">{poem.preview}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground/60">
              <span>{poem.author}</span>
              <span className="flex items-center gap-1"><Icon name="Heart" size={11} /> {poem.likes + (favPoems.includes(poem.id) ? 1 : 0)}</span>
            </div>
          </div>
        ))}
      </div>
      {searchQuery && filteredPoems.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Icon name="Search" size={32} className="mx-auto mb-4 opacity-30" />
          <p className="font-display text-2xl">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}

// ── BOOKS ─────────────────────────────────────────────────────────────────────

export function BooksSection() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="section-number">02</div>
        <h1 className="font-display text-6xl -mt-6 mb-4">Книги</h1>
        <div className="gold-divider" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="card-hover cursor-pointer group">
            <div className="aspect-[2/3] overflow-hidden mb-4 relative">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-background/90 px-2 py-0.5 text-xs text-gold font-body">★ {book.rating}</div>
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-gold text-background text-xs uppercase tracking-widest">Читать</button>
              </div>
            </div>
            <span className="text-xs text-gold uppercase tracking-widest">{book.genre}</span>
            <h3 className="font-display text-xl mt-1 group-hover:text-gold transition-colors">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground/60">
              <span>{book.year}</span>
              <span>{book.pages} стр.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MUSIC ─────────────────────────────────────────────────────────────────────

interface MusicSectionProps {
  playingTrack: number | null;
  setPlayingTrack: (id: number | null) => void;
}

export function MusicSection({ playingTrack, setPlayingTrack }: MusicSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="relative h-72 overflow-hidden">
        <img src={MUSIC_IMG} alt="Музыка" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6">
          <div className="section-number">03</div>
          <h1 className="font-display text-6xl -mt-6">Музыка</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="gold-divider mb-12" />
        <div className="space-y-px bg-border">
          {musicians.map((track, i) => (
            <div
              key={track.id}
              className={`flex items-center gap-6 p-5 cursor-pointer group transition-colors ${playingTrack === track.id ? "bg-card" : "bg-background hover:bg-card"}`}
              onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
            >
              <div className="w-8 text-center flex-shrink-0">
                {playingTrack === track.id ? (
                  <Icon name="Pause" size={16} className="text-gold mx-auto" />
                ) : (
                  <>
                    <span className="text-muted-foreground/40 text-sm group-hover:hidden">{String(i + 1).padStart(2, "0")}</span>
                    <Icon name="Play" size={16} className="text-gold hidden group-hover:block mx-auto" />
                  </>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-body text-sm ${playingTrack === track.id ? "text-gold" : "text-foreground"}`}>{track.title}</div>
                <div className="text-xs text-muted-foreground/60 mt-0.5">{track.artist}</div>
              </div>
              <span className="text-xs text-muted-foreground/40 uppercase tracking-widest hidden md:block">{track.genre}</span>
              <span className="text-xs text-muted-foreground/40 hidden md:block">{track.plays}</span>
              <span className="text-xs text-muted-foreground/60">{track.duration}</span>
              <button className="text-muted-foreground/30 hover:text-gold transition-colors" onClick={e => e.stopPropagation()}>
                <Icon name="Heart" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {playingTrack && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm px-6 py-4 z-40">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            <div className="flex-1">
              <div className="text-sm font-body text-gold">{musicians.find(t => t.id === playingTrack)?.title}</div>
              <div className="text-xs text-muted-foreground">{musicians.find(t => t.id === playingTrack)?.artist}</div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-foreground"><Icon name="SkipBack" size={18} /></button>
              <button onClick={() => setPlayingTrack(null)} className="w-10 h-10 bg-gold text-background flex items-center justify-center">
                <Icon name="Pause" size={16} />
              </button>
              <button className="text-muted-foreground hover:text-foreground"><Icon name="SkipForward" size={18} /></button>
            </div>
            <div className="flex-1 hidden md:block">
              <div className="h-0.5 bg-border rounded-full"><div className="h-full w-1/3 bg-gold rounded-full" /></div>
            </div>
            <span className="text-xs text-muted-foreground">{musicians.find(t => t.id === playingTrack)?.duration}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── AUTHORS ───────────────────────────────────────────────────────────────────

interface AuthorsSectionProps {
  subscribedAuthors: number[];
  toggleSubscribe: (id: number) => void;
  supportOpen: number | null;
  setSupportOpen: (id: number | null) => void;
  supportAmount: string;
  setSupportAmount: (v: string) => void;
}

export function AuthorsSection({
  subscribedAuthors,
  toggleSubscribe,
  supportOpen,
  setSupportOpen,
  supportAmount,
  setSupportAmount,
}: AuthorsSectionProps) {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="section-number">04</div>
        <h1 className="font-display text-6xl -mt-6 mb-4">Авторы</h1>
        <div className="gold-divider" />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {authors.map((author) => (
          <div key={author.id} className="flex gap-6 p-6 border border-border card-hover cursor-pointer group">
            <div className="w-24 h-32 overflow-hidden flex-shrink-0">
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-2xl group-hover:text-gold transition-colors">{author.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{author.bio}</p>
              <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground/60">
                <span>{author.works} работ</span>
                <span>{author.followers} подписчиков</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSubscribe(author.id); }}
                  className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-all ${
                    subscribedAuthors.includes(author.id)
                      ? "bg-gold text-background"
                      : "border border-gold text-gold hover:bg-gold hover:text-background"
                  }`}
                >
                  {subscribedAuthors.includes(author.id) ? "Подписан" : "Подписаться"}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setSupportOpen(author.id); }}
                  className="px-4 py-1.5 text-xs uppercase tracking-widest border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all flex items-center gap-1.5"
                >
                  <Icon name="Heart" size={11} /> Поддержать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {supportOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-sm p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl">Поддержать автора</h3>
                <p className="text-muted-foreground text-sm mt-1">{authors.find(a => a.id === supportOpen)?.name}</p>
              </div>
              <button onClick={() => setSupportOpen(null)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={18} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Ваша поддержка помогает автору продолжать творить.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {["50", "150", "300", "500", "1000", "другая"].map(amount => (
                <button
                  key={amount}
                  onClick={() => setSupportAmount(amount === "другая" ? "" : amount)}
                  className={`py-2 text-sm border transition-all ${
                    supportAmount === amount ? "border-gold bg-gold text-background" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  {amount === "другая" ? "Своя" : `${amount} ₽`}
                </button>
              ))}
            </div>
            <input
              value={supportAmount}
              onChange={e => setSupportAmount(e.target.value)}
              placeholder="Введите сумму"
              className="w-full bg-background border border-border px-4 py-2 text-sm outline-none focus:border-gold transition-colors mb-4"
            />
            <button className="w-full py-3 bg-gold text-background text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
              Поддержать {supportAmount ? `${supportAmount} ₽` : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <div className="animate-fade-in">
      <div className="relative h-80 overflow-hidden">
        <img src={HERO_IMG} alt="О нас" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="absolute bottom-8 max-w-7xl mx-auto left-0 right-0 px-6">
          <h1 className="font-display text-6xl">О платформе</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="gold-divider mb-12" />
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="font-display text-3xl mb-6">Наша миссия</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              «Литера» — это пространство, где творческий голос обретает место. Мы создали платформу для тех, кто живёт словом, звуком и образом.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Здесь авторы публикуют стихи, прозу, книги и музыку, находят своих читателей и слушателей, строят творческие связи.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl mb-6">Для авторов</h2>
            <ul className="space-y-3 text-muted-foreground text-sm">
              {[
                "Бесплатная публикация творческих работ",
                "Система монетизации и поддержки от читателей",
                "Аналитика: просмотры, лайки, подписчики",
                "Личный профиль и портфолио автора",
                "Сообщество единомышленников",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-12">
          <h2 className="font-display text-3xl mb-8 text-center">Команда</h2>
          <div className="flex justify-center">
            <div className="text-center max-w-xs">
              <div className="w-24 h-24 bg-border mx-auto mb-4 flex items-center justify-center overflow-hidden border border-gold/20">
                <Icon name="User" size={36} className="text-muted-foreground/40" />
              </div>
              <div className="font-display text-xl mb-1">Батыров Абдулхаким Арсенович</div>
              <div className="flex justify-center gap-3 mt-2">
                {["Основатель", "Редактор", "Разработка"].map(r => (
                  <span key={r} className="text-xs text-gold uppercase tracking-widest">{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CONTACTS ──────────────────────────────────────────────────────────────────

export function ContactsSection() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="section-number">05</div>
        <h1 className="font-display text-6xl -mt-6 mb-4">Контакты</h1>
        <div className="gold-divider" />
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Есть вопрос или предложение? Напишите нам — ответим в течение дня.
          </p>
          <div className="space-y-5">
            {[
              { icon: "Mail", label: "Почта", value: "hello@litera.ru" },
              { icon: "MessageCircle", label: "Telegram", value: "@litera_platform" },
              { icon: "Instagram", label: "Instagram", value: "@litera.ru" },
            ].map((contact, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center text-gold">
                  <Icon name={contact.icon as "Mail"} size={16} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground/60 uppercase tracking-widest">{contact.label}</div>
                  <div className="text-sm">{contact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl mb-6">Написать нам</h2>
          <div className="space-y-4">
            <input placeholder="Ваше имя" className="w-full bg-transparent border border-border px-4 py-3 text-sm outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/40" />
            <input placeholder="Email" className="w-full bg-transparent border border-border px-4 py-3 text-sm outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/40" />
            <textarea rows={5} placeholder="Сообщение..." className="w-full bg-transparent border border-border px-4 py-3 text-sm outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/40 resize-none" />
            <button className="w-full py-3 bg-gold text-background text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LOCAL STATE WRAPPER for Authors (supportOpen needs useState) ───────────────
// (exported from here so Index stays clean)
export function AuthorsSectionWrapper({
  subscribedAuthors,
  toggleSubscribe,
}: {
  subscribedAuthors: number[];
  toggleSubscribe: (id: number) => void;
}) {
  const [supportOpen, setSupportOpen] = useState<number | null>(null);
  const [supportAmount, setSupportAmount] = useState("150");

  return (
    <AuthorsSection
      subscribedAuthors={subscribedAuthors}
      toggleSubscribe={toggleSubscribe}
      supportOpen={supportOpen}
      setSupportOpen={setSupportOpen}
      supportAmount={supportAmount}
      setSupportAmount={setSupportAmount}
    />
  );
}