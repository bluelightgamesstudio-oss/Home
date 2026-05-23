import { Link } from "wouter";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import bluelightLogo from "/images/bluelight-logo.png";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer mb-6">
              <img src={bluelightLogo} alt="Bluelight Games Studio" className="w-12 h-12 object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-primary font-display font-bold text-lg mb-6">{t("footer.explore")}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/games" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.games")}</Link></li>
              <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.news")}</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.studio")}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-display font-bold text-lg mb-6">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>bluelightgamesstudio@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-display font-bold text-lg mb-6">{t("footer.connect")}</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/bluelightgamesstudio/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/Bluelight143255" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@bluelightgamesstudio?si=WzZYmUNv9Qw01siO" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
                data-testid="link-youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Bluelight Games Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
