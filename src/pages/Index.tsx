import { useState } from "react";
import { Section } from "./litera/data";
import Navbar from "./litera/Navbar";
import { HomeSection, Footer } from "./litera/HomeSections";
import {
  ProfileSection,
  PoemsSection,
  BooksSection,
  MusicSection,
  AuthorsSectionWrapper,
  AboutSection,
  ContactsSection,
} from "./litera/ContentSections";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [favPoems, setFavPoems] = useState<number[]>([2, 5]);
  const [subscribedAuthors, setSubscribedAuthors] = useState<number[]>([2]);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  const toggleFav = (id: number) => {
    setFavPoems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSubscribe = (id: number) => {
    setSubscribedAuthors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="pt-16">
        {activeSection === "home" && (
          <HomeSection
            favPoems={favPoems}
            toggleFav={toggleFav}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === "profile" && (
          <ProfileSection
            favPoems={favPoems}
            toggleFav={toggleFav}
          />
        )}
        {activeSection === "poems" && (
          <PoemsSection
            favPoems={favPoems}
            toggleFav={toggleFav}
            searchQuery={searchQuery}
          />
        )}
        {activeSection === "books" && (
          <BooksSection />
        )}
        {activeSection === "music" && (
          <MusicSection
            playingTrack={playingTrack}
            setPlayingTrack={setPlayingTrack}
          />
        )}
        {activeSection === "authors" && (
          <AuthorsSectionWrapper
            subscribedAuthors={subscribedAuthors}
            toggleSubscribe={toggleSubscribe}
          />
        )}
        {activeSection === "about" && <AboutSection />}
        {activeSection === "contacts" && <ContactsSection />}
      </main>

      {activeSection !== "music" && (
        <Footer setActiveSection={setActiveSection} />
      )}
    </div>
  );
}
