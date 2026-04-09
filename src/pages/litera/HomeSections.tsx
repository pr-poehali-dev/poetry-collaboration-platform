import Icon from "@/components/ui/icon";
import { Section, navItems, poems, authors, HERO_IMG, MUSIC_IMG } from "./data";

interface HomeSectionsProps {
  favPoems: number[];
  toggleFav: (id: number) => void;
  setActiveSection: (s: Section) => void;
}

export function HomeSection({ favPoems, toggleFav, setActiveSection }: HomeSectionsProps) {
  return (
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
  );
}

interface FooterProps {
  setActiveSection: (s: Section) => void;
}

export function Footer({ setActiveSection }: FooterProps) {
  return (
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
  );
}
