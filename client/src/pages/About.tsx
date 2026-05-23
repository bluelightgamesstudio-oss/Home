import { motion } from "framer-motion";
import { useTeam } from "@/hooks/use-team";
import { useLanguage } from "@/hooks/use-language";
import { Linkedin, Twitter } from "lucide-react";

export default function About() {
  const { data: teamMembers, isLoading } = useTeam();
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Studio Intro */}
      <section className="container px-4 md:px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase mb-8 text-white">
            {t("about.title").split(' ').slice(0, 2).join(' ')} <span className="text-primary">{t("about.title").split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("story.p1")}
          </p>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="bg-white/5 border-y border-white/5 py-24 mb-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: t("about.values.v1.title"), 
                desc: t("about.values.v1.desc") 
              },
              { 
                title: t("about.values.v2.title"), 
                desc: t("about.values.v2.desc") 
              },
              { 
                title: t("about.values.v3.title"), 
                desc: t("about.values.v3.desc") 
              }
            ].map((value, i) => (
              <div key={i} className="text-center p-6 border border-white/5 hover:border-primary/30 transition-colors bg-background/50">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container px-4 md:px-6">
        <h2 className="text-4xl font-display font-bold uppercase mb-12 text-center">
          {t("about.team")}
        </h2>
        
        {isLoading ? (
          <div className="text-center text-muted-foreground font-mono">Loading Personnel Data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers?.map((member) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white uppercase font-display mb-1">{member.name}</h3>
                  <p className="text-primary font-mono text-xs uppercase tracking-widest mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{member.bio}</p>
                  
                  <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Linkedin className="w-4 h-4 text-white hover:text-primary cursor-pointer" />
                    <Twitter className="w-4 h-4 text-white hover:text-primary cursor-pointer" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
