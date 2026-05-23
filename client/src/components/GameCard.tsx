import { Link } from "wouter";
import { ArrowRight, Calendar, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import type { Game } from "@shared/schema";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-card border border-white/5 overflow-hidden"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0" />
      
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden z-10">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary/90 text-background text-xs font-bold px-2 py-1 font-mono uppercase">
            {game.genre}
          </span>
          {game.isFeatured && (
            <span className="bg-accent text-white text-xs font-bold px-2 py-1 font-mono uppercase">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 z-10 bg-card/50 backdrop-blur-sm group-hover:bg-card/30 transition-colors">
        <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-4">
          <div className="flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            {game.platform}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {game.releaseDate}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
          {game.description}
        </p>

        <Link href={`/games/${game.id}`}>
          <button className="w-full py-3 border border-white/20 hover:border-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            View Details
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
