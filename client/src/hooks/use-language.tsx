import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.games": "Games",
    "nav.news": "News",
    "nav.studio": "Studio",
    "nav.contact": "Contact",
    "nav.account": "Account",
    "nav.signin": "Sign In",
    "hero.welcome": "The Official Opening and Beginning of",
    "hero.tagline": "A single developer's vision. One passion. Infinite possibilities.",
    "hero.subtagline": "Crafting immersive worlds with dedication and creative excellence.",
    "hero.explore": "Explore Games",
    "hero.studio": "Our Studio",
    "story.title": "Our Story",
    "story.p1": "Bluelight Games Studio was born from a single developer's passion to create compelling gaming experiences. What started as a dream has evolved into a dedicated studio committed to pushing the boundaries of interactive entertainment.",
    "story.p2": "Running as a lean, focused operation with one developer at the helm, we embody the spirit of indie game development. Every line of code, every creative decision, and every pixel on screen reflects our commitment to excellence and innovation.",
    "story.p3": "We believe that great games don't require massive teams—they require passion, determination, and a relentless pursuit of quality. As a solo developer studio, we're doing our absolute best to deliver unforgettable experiences that resonate with players worldwide.",
    "story.cta": "Join us as we craft the future of gaming, one project at a time.",
    "games.title": "Game Library",
    "games.subtitle": "Explore our collection of immersive worlds. From high-octane action to deep narrative experiences.",
    "games.latest": "Latest Releases",
    "games.viewall": "View All Games",
    "games.details": "View Game Details",
    "games.search": "Search games...",
    "games.back": "Back to Library",
    "games.about": "About the Game",
    "games.trailer": "Official Trailer",
    "games.info": "Game Info",
    "games.release": "Release Date",
    "games.platforms": "Platforms",
    "games.rating": "Rating",
    "games.coming": "Coming Soon",
    "news.title": "Transmission Log",
    "news.subtitle": "Studio Updates",
    "news.readmore": "Read More",
    "news.readfull": "Read Full Story",
    "contact.title": "Get In Touch",
    "contact.subtitle": "Have a question, a partnership proposal, or just want to say hi? Our communication channels are open.",
    "contact.email": "Email Us",
    "contact.name": "Codename (Name)",
    "contact.email_label": "Frequency (Email)",
    "contact.message": "Transmission (Message)",
    "contact.submit": "Send Transmission",
    "signup.title": "Create Your Bluelight ID",
    "signup.subtitle": "Join our community and unlock exclusive features. Having an account is completely optional, but it will enhance your experience with Bluelight Games Studio.",
    "signup.why": "Why Create an Account?",
    "signup.feature1": "Early access to game announcements and updates",
    "signup.feature2": "Personalized recommendations based on your interests",
    "signup.feature3": "Beta testing opportunities for upcoming releases",
    "signup.feature4": "Join exclusive community events",
    "signup.google": "Sign In with Google",
    "signup.google_subtitle": "Sign in with your Google account to get started",
    "account.title": "Account Profile",
    "account.status": "Account Status",
    "account.active": "Active",
    "account.type": "Account Type",
    "account.member": "Community Member",
    "account.about": "About Your Account",
    "account.about_p": "Your Bluelight ID gives you access to exclusive features and updates. Keep your profile up to date to get the best experience from Bluelight Games Studio.",
    "account.features": "Upcoming Features",
    "account.wishlist": "Wishlist functionality for games",
    "account.tracking": "Game progress tracking and achievements",
    "account.customization": "Community profile customization",
    "account.beta": "Beta access notifications",
    "account.logout": "Sign Out",
    "footer.tagline": "Forging immersive digital experiences for the next generation of gamers. We build worlds you won't want to leave.",
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.connect": "Connect",
    "footer.privacy": "Privacy Policy",
    "about.title": "We Are Bluelight",
    "about.values.v1.title": "Immersion First",
    "about.values.v1.desc": "We prioritize atmosphere and world-building above all else.",
    "about.values.v2.title": "Player Agency",
    "about.values.v2.desc": "Your choices matter. We build systems, not scripts.",
    "about.values.v3.title": "Technical Mastery",
    "about.values.v3.desc": "Bleeding edge technology powering seamless experiences.",
    "about.team": "Meet The Team",
    "games.mrslap.description": "Step into the chaotic world of M.R. Slap 1: The Doubled Identify. A journey of mystery and high-stakes slapping action."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
