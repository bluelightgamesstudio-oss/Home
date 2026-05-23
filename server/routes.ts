import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === Auth Setup (MUST be before other routes) ===
  await setupAuth(app);
  registerAuthRoutes(app);

  // === Games ===
  app.get(api.games.list.path, async (req, res) => {
    const games = await storage.getGames();
    res.json(games);
  });

  app.get(api.games.get.path, async (req, res) => {
    const game = await storage.getGame(Number(req.params.id));
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  });

  // === News ===
  app.get(api.news.list.path, async (req, res) => {
    const news = await storage.getNews();
    res.json(news);
  });

  app.get(api.news.get.path, async (req, res) => {
    const post = await storage.getNewsPost(Number(req.params.id));
    if (!post) {
      return res.status(404).json({ message: "News post not found" });
    }
    res.json(post);
  });

  // === Team ===
  app.get(api.team.list.path, async (req, res) => {
    const team = await storage.getTeam();
    res.json(team);
  });

  // === Contact ===
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === Seed Data (Safe to run on every startup, checks for existence internally if needed, or we just rely on db persistence) ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingGames = await storage.getGames();
  if (existingGames.length === 0) {
    await storage.createGame({
      title: "M.R. Slap 1",
      description: "A terrifying psychological horror experience where reality bends and nightmares come alive. Navigate through twisted environments, face unspeakable horrors, and uncover the dark truth lurking in the shadows. Only the bravest dare to enter M.R. Slap.",
      genre: "Horror",
      platform: "PC",
      releaseDate: "2026",
      imageUrl: "/images/mr-slap.png",
      isFeatured: true,
      trailerUrl: "#"
    });
  }

  const existingTeam = await storage.getTeam();
  if (existingTeam.length === 0) {
    await storage.createTeamMember({
      name: "Yaseen Mohammed",
      role: "Director",
      bio: "Creative visionary leading Bluelight Games Studio.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2670"
    });
  }

  const existingNews = await storage.getNews();
  if (existingNews.length === 0) {
    await storage.createNews({
      title: "Bluelight Games Studio 2025 - New Era Begins",
      content: "Welcome to 2025. Bluelight Games Studio is excited to announce our latest project in development. Stay tuned for more updates.",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2670"
    });
  }
}
