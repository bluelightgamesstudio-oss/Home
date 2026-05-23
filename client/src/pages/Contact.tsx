import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/Button";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";

export default function Contact() {
  const { toast } = useToast();
  const { mutate, isPending } = useSubmitContact();
  const { t } = useLanguage();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertMessage) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Transmission Received",
          description: "We will respond to your signal shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Transmission Failed",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-24 flex flex-col justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase mb-8 text-white">
              {t("contact.title").split(' ')[0]} <span className="text-primary">{t("contact.title").split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              {t("contact.subtitle")}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-none border border-primary/20">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold font-display uppercase text-lg text-white">{t("contact.email")}</h3>
                  <p className="text-muted-foreground">bluelightgamesstudio@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-white/10 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase font-display text-white">{t("contact.name")}</label>
                <input 
                  {...form.register("name")}
                  className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                  placeholder="Enter your name"
                />
                {form.formState.errors.name && <span className="text-destructive text-xs">{form.formState.errors.name.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase font-display text-white">{t("contact.email_label")}</label>
                <input 
                  {...form.register("email")}
                  className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                  placeholder="Enter your email"
                />
                {form.formState.errors.email && <span className="text-destructive text-xs">{form.formState.errors.email.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase font-display text-white">{t("contact.message")}</label>
                <textarea 
                  {...form.register("message")}
                  rows={5}
                  className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Your message here..."
                />
                {form.formState.errors.message && <span className="text-destructive text-xs">{form.formState.errors.message.message}</span>}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                isLoading={isPending}
              >
                {t("contact.submit")}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
