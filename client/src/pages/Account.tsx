import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { LogOut, User, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function Account() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/signup");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-24 flex items-center justify-center">
        <div className="text-center text-muted-foreground font-mono">Loading account data...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const firstName = user.claims?.first_name || "Player";
  const email = user.claims?.email || "No email provided";
  const profileImage = user.claims?.profile_image_url;

  return (
    <div className="min-h-screen pt-24 pb-24 flex flex-col justify-center">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-black uppercase mb-12 text-white">
            {t("account.title").split(' ')[0]} <span className="text-primary">{t("account.title").split(' ').slice(1).join(' ')}</span>
          </h1>

          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-card border border-white/10 p-8 rounded-none">
              <div className="flex items-start gap-6 mb-8">
                {profileImage && (
                  <img 
                    src={profileImage} 
                    alt={firstName}
                    className="w-24 h-24 rounded-full border border-primary/50 object-cover"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-3xl font-display font-bold text-white mb-2">{firstName}</h2>
                  <p className="text-primary font-mono text-sm">Bluelight Player</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs font-mono uppercase text-muted-foreground mb-1">Email Address</p>
                    <p className="text-white">{email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-none">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {t("account.about")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("account.about_p")}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="text-primary font-semibold">{t("account.status")}:</span> {t("account.active")}
                </p>
                <p>
                  <span className="text-primary font-semibold">{t("account.type")}:</span> {t("account.member")}
                </p>
              </div>
            </div>

            {/* Upcoming Features */}
            <div className="bg-primary/5 border border-primary/30 p-6 rounded-none">
              <h3 className="font-display font-bold text-lg text-white mb-4">{t("account.features")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">→</span>
                  <span>{t("account.wishlist")}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">→</span>
                  <span>{t("account.tracking")}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">→</span>
                  <span>{t("account.customization")}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">→</span>
                  <span>{t("account.beta")}</span>
                </li>
              </ul>
            </div>

            {/* Logout Button */}
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t("account.logout")}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
