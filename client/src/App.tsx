import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/hooks/use-language";
import Home from "@/pages/Home";
import Games from "@/pages/Games";
import GameDetails from "@/pages/GameDetails";
import About from "@/pages/About";
import News from "@/pages/News";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Signup from "@/pages/Signup";
import Account from "@/pages/Account";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/games" component={Games} />
      <Route path="/games/:id" component={GameDetails} />
      <Route path="/about" component={About} />
      <Route path="/news" component={News} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/signup" component={Signup} />
      <Route path="/account" component={Account} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden font-body">
          <Navbar />
          <main>
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
