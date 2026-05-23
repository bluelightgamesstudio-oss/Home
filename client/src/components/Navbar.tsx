import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, User, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import bluelightLogo from "/images/bluelight-logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/games", label: t("nav.games") },
    { href: "/news", label: t("nav.news") },
    { href: "/about", label: t("nav.studio") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => {
    const isActive = location === href;
    return (
      <Link href={href} className={`
        relative group cursor-pointer transition-colors duration-200
        ${isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'}
        ${mobile ? 'text-2xl font-display uppercase tracking-widest py-2' : 'font-display tracking-wide uppercase text-sm'}
      `}
      onClick={() => mobile && setIsOpen(false)}
      >
        {label}
        {!mobile && (
          <span className={`
            absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
          `} />
        )}
      </Link>
    );
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}
    `}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <img src={bluelightLogo} alt="Bluelight Games Studio" className="w-10 h-10 object-contain transition-transform group-hover:scale-110" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <Link href="/account" className="px-5 py-2 bg-primary/10 border border-primary/50 hover:bg-primary hover:text-background text-primary font-display font-bold uppercase tracking-wider text-xs transition-all duration-300 clip-path-polygon flex items-center gap-2"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                >
                  <User className="w-3 h-3" />
                  {t("nav.account")}
                </Link>
              ) : (
                <Link href="/signup" className="px-5 py-2 bg-primary/10 border border-primary/50 hover:bg-primary hover:text-background text-primary font-display font-bold uppercase tracking-wider text-xs transition-all duration-300 clip-path-polygon"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                >
                  {t("nav.signin")}
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-primary/20 p-8 md:hidden flex flex-col items-center gap-6 shadow-2xl shadow-primary/10"
          >
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} mobile />
            ))}
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <Link href="/account" className="text-2xl font-display uppercase tracking-widest py-2 text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Account
                  </Link>
                ) : (
                  <Link href="/signup" className="text-2xl font-display uppercase tracking-widest py-2 text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
