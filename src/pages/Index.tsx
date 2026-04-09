import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/c594449b-200e-4beb-9cd7-c1f851b856f4/files/4ca2d958-22fa-4e64-a36c-d895cdfa827b.jpg";
const AUTHOR_IMG = "https://cdn.poehali.dev/projects/c594449b-200e-4beb-9cd7-c1f851b856f4/files/a97ec54a-2d65-4949-b30d-58f1bf6aaf30.jpg";
const MUSIC_IMG = "https://cdn.poehali.dev/projects/c594449b-200e-4beb-9cd7-c1f851b856f4/files/d5e42bf7-b32a-4a65-a358-5bf1ea8d2f88.jpg";

type Section = "home" | "profile" | "poems" | "books" | "music" | "authors" | "about" | "contacts";

const navItems: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "poems", label: "Стихотворения" },
  { id: "books", label: "Книги" },
  { id: "music", label: "Музыка" },
  { id: "authors", label: "Авторы" },
  { id: "about", label: "О нас" },
  { id: "contacts", label: "Контакты" },
];

const poems = [
  { id: 1, title: "Осенний вечер", author: "Анна Светлова", preview: "Листья падают, как строки стихов,\nВ тишине — лишь шёпот ветра...", likes: 142, favorited: false, category: "Лирика" },
  { id: 2, title: "Городская ночь", author: "Михаил Горин", preview: "Фонари горят, как звёзды вниз,\nАсфальт блестит под летним дождём...", likes: 89, favorited: true, category: "Философия" },
  { id: 3, title: "Первый снег", author: "Елена Вишнева", preview: "Белый холст — и мир молчит,\nЗима рисует без спешки...", likes: 203, favorited: false, category: "Природа" },
  { id: 4, title: "Море внутри", author: "Дмитрий Крылов", preview: "Внутри меня — шторм и штиль,\nИ берег, что не найти...", likes: 176, favorited: false, category: "Лирика" },
  { id: 5, title: "Письма в никуда", author: "Анна Светлова", preview: "Пишу слова, что не дойдут,\nВкладываю в конверт из снов...", likes: 118, favorited: true, category: "Любовь" },
  { id: 6, title: "Тишина говорит", author: "Игорь Тёмный", preview: "Когда замолкают все слова,\nТишина начинает петь...", likes: 95, favorited: false, category: "Философия" },
];

const books = [
  { id: 1, title: "Осколки рассвета", author: "Анна Светлова", year: 2024, genre: "Поэзия", pages: 128, cover: AUTHOR_IMG, rating: 4.8 },
  { id: 2, title: "Городские хроники", author: "Михаил Горин", year: 2023, genre: "Проза", pages: 312, cover: HERO_IMG, rating: 4.5 },
  { id: 3, title: "Между строк", author: "Елена Вишнева", year: 2024, genre: "Эссе", pages: 204, cover: MUSIC_IMG, rating: 4.7 },
  { id: 4, title: "Северные мотивы", author: "Дмитрий Крылов", year: 2022, genre: "Поэзия", pages: 96, cover: AUTHOR_IMG, rating: 4.6 },
];

const musicians = [
  { id: 1, title: "Листопад", artist: "Анна Светлова", duration: "3:42", genre: "Романс", plays: "12.4к" },
  { id: 2, title: "Ночной город", artist: "Михаил Горин", duration: "4:18", genre: "Инди", plays: "8.7к" },
  { id: 3, title: "Снежный вальс", artist: "Елена Вишнева", duration: "2:55", genre: "Классика", plays: "19.2к" },
  { id: 4, title: "Морской бриз", artist: "Дмитрий Крылов", duration: "5:01", genre: "Медитация", plays: "6.3к" },
  { id: 5, title: "Письмо осени", artist: "Анна Светлова", duration: "3:27", genre: "Романс", plays: "15.8к" },
];

const authors = [
  { id: 1, name: "Анна Светлова", bio: "Поэт, прозаик. Лауреат премии «Золотое перо».", works: 34, followers: "2.1к", avatar: AUTHOR_IMG },
  { id: 2, name: "Михаил Горин", bio: "Городская проза, философская лирика.", works: 18, followers: "1.4к", avatar: HERO_IMG },
  { id: 3, name: "Елена Вишнева", bio: "Музыкант, поэт. Природная лирика.", works: 27, followers: "3.2к", avatar: MUSIC_IMG },
  { id: 4, name: "Дмитрий Крылов", bio: "Философ, поэт. Морские мотивы.", works: 15, followers: "980", avatar: AUTHOR_IMG },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [favPoems, setFavPoems] = useState<number[]>([2, 5]);
  const [subscribedAuthors, setSubscribedAuthors] = useState<number[]>([2]);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [supportOpen, setSupportOpen] = useState<number | null>(null);
  const [supportAmount, setSupportAmount] = useState("150");

  const toggleFav = (id: number) => {
    setFavPoems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSubscribe = (id: number) => {
    setSubscribedAuthors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredPoems = poems.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Navigation */}
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
          </div>
        )}
      </nav>

      <main className="pt-16">

        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            <section className="relative h-[92vh] flex items-end overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
              <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
                <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-body">Творческая платформа</p>
                <h1 className="font-display text-7xl md:text-9xl text-foreground leading-[0.9] mb-6">Литера</h1>
                <p className="font-body text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed">
                  Место, где слова обретают силу. Стихи, книги, музыка — всё,<br />что рождается из глубины творческого духа.
                </p>
                <div className="flex items-center gap-6">
                  <button onClick={() => setActiveSection("poems")} className="px-8 py-3 bg-gold text-background font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
                    Читать
                  </button>
                  <button onClick={() => setActiveSection("authors")} className="text-muted-foreground text-sm tracking-widest uppercase hover:text-gold transition-colors flex items-center gap-2">
                    Авторы <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            </section>

            <section className="border-y border-border py-10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { num: "1 240", label: "Авторов" },
                    { num: "8 490", label: "Стихотворений" },
                    { num: "342", label: "Книг" },
                    { num: "560", label: "Музыкальных треков" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="font-display text-4xl text-gold mb-1">{stat.num}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-24">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="section-number">01</div>
                  <h2 className="font-display text-5xl -mt-6">Избранные стихи</h2>
                  <div className="gold-divider mt-4" />
                </div>
                <button onClick={() => setActiveSection("poems")} className="text-gold text-sm uppercase tracking-widest hover:opacity-70 transition-opacity hidden md:flex items-center gap-2">
                  Все стихи <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-px bg-border">
                {poems.slice(0, 3).map((poem) => (
                  <div key={poem.id} className="bg-background p-8 card-hover cursor-pointer group">
                    <div className="text-xs text-gold uppercase tracking-widest mb-4">{poem.category}</div>
                    <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors">{poem.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 whitespace-pre-line italic font-display">{poem.preview}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground/60">{poem.author}</span>
                      <button onClick={(e) => { e.stopPropagation(); toggleFav(poem.id); }} className={`transition-colors ${favPoems.includes(poem.id) ? "text-gold" : "text-muted-foreground/40 hover:text-gold"}`}>
                        <Icon name="Heart" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-card py-24">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <div className="section-number">02</div>
                    <h2 className="font-display text-5xl -mt-6">Авторы платформы</h2>
                    <div className="gold-divider mt-4" />
                  </div>
                  <button onClick={() => setActiveSection("authors")} className="text-gold text-sm uppercase tracking-widest hover:opacity-70 transition-opacity hidden md:flex items-center gap-2">
                    Все авторы <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                  {authors.map((author) => (
                    <div key={author.id} className="card-hover cursor-pointer group" onClick={() => setActiveSection("authors")}>
                      <div className="aspect-[3/4] overflow-hidden mb-4">
                        <img src={author.avatar} alt={author.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h3 className="font-display text-xl group-hover:text-gold transition-colors">{author.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{author.bio}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground/60">
                        <span>{author.works} работ</span>
                        <span>{author.followers} подп.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-24">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="section-number">03</div>
                  <h2 className="font-display text-5xl -mt-6">Музыка авторов</h2>
                  <div className="gold-divider mt-4" />
                </div>
                <button onClick={() => setActiveSection("music")} className="text-gold text-sm uppercase tracking-widest hover:opacity-70 transition-opacity hidden md:flex items-center gap-2">
                  Все треки <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="relative rounded-sm overflow-hidden">
                <img src={MUSIC_IMG} alt="Музыка" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                  <button onClick={() => setActiveSection("music")} className="flex items-center gap-4 px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-background transition-all">
                    <Icon name="Music" size={20} />
                    <span className="font-body text-sm tracking-widest uppercase">Слушать музыку</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PROFILE */}
        {activeSection === "profile" && (
          <div className="animate-fade-in max-w-5xl mx-auto px-6 py-16">
            <div className="flex items-start gap-12 mb-16">
              <div className="relative">
                <div className="w-36 h-36 overflow-hidden border-2 border-gold/30">
                  <img src={AUTHOR_IMG} alt="Профиль" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-gold text-background flex items-center justify-center">
                  <Icon name="Camera" size={14} />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="font-display text-5xl mb-2">Анна Светлова</h1>
                <p className="text-gold text-sm uppercase tracking-widest mb-4">Поэт · Прозаик</p>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  Пишу о том, что нельзя не написать. Слова — мой способ дышать. Лауреат премии «Золотое перо» 2023.
                </p>
                <div className="flex gap-8 mt-6 text-sm">
                  <div><span className="font-display text-3xl text-gold">34</span><span className="text-muted-foreground ml-2 text-xs uppercase tracking-widest">Работ</span></div>
                  <div><span className="font-display text-3xl text-gold">2.1к</span><span className="text-muted-foreground ml-2 text-xs uppercase tracking-widest">Подписчиков</span></div>
                  <div><span className="font-display text-3xl text-gold">142</span><span className="text-muted-foreground ml-2 text-xs uppercase tracking-widest">Лайков</span></div>
                </div>
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
        )}

        {/* POEMS */}
        {activeSection === "poems" && (
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
              {(searchQuery ? filteredPoems : poems).map((poem) => (
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
        )}

        {/* BOOKS */}
        {activeSection === "books" && (
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
        )}

        {/* MUSIC */}
        {activeSection === "music" && (
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
        )}

        {/* AUTHORS */}
        {activeSection === "authors" && (
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
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
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
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { role: "Основатель", name: "Артём Волков" },
                    { role: "Редактор", name: "Мария Сонина" },
                    { role: "Разработка", name: "Илья Крест" },
                  ].map((member, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 bg-border mx-auto mb-3 flex items-center justify-center">
                        <Icon name="User" size={24} className="text-muted-foreground" />
                      </div>
                      <div className="font-display text-lg">{member.name}</div>
                      <div className="text-xs text-gold uppercase tracking-widest mt-1">{member.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {activeSection === "contacts" && (
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
        )}
      </main>

      {activeSection !== "music" && (
        <footer className="border-t border-border mt-16 py-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-display text-2xl text-gold">Литера</span>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {navItems.map(item => (
                <button key={item.id} onClick={() => setActiveSection(item.id)} className="text-xs text-muted-foreground/60 uppercase tracking-widest hover:text-gold transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/40">© 2026 Литера</p>
          </div>
        </footer>
      )}
    </div>
  );
}
