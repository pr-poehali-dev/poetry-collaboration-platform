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
import { useAuth } from "./litera/useAuth";
import AuthModal from "./litera/AuthModal";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [favPoems, setFavPoems] = useState<number[]>([2, 5]);
  const [subscribedAuthors, setSubscribedAuthors] = useState<number[]>([2]);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { user, login, register, logout } = useAuth();

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
        user={user}
        onAuthClick={() => setAuthModalOpen(true)}
        onLogout={logout}
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
            user={user}
            onAuthClick={() => setAuthModalOpen(true)}
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

      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLogin={login}
          onRegister={register}
        />
      )}
    </div>
  );
}
