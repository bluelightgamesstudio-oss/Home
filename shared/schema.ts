import { pgTable, text, serial, timestamp, boolean, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Export auth schema
export * from "./models/auth";

// === TABLE DEFINITIONS ===

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  genre: text("genre").notNull(),
  platform: text("platform").notNull(), // e.g., "PC, Console"
  releaseDate: text("release_date").notNull(),
  imageUrl: text("image_url").notNull(),
  trailerUrl: text("trailer_url"),
  isFeatured: boolean("is_featured").default(false),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const team = pgTable("team", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertGameSchema = createInsertSchema(games).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, publishedAt: true });
export const insertTeamSchema = createInsertSchema(team).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// === TYPES ===

export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;

export type NewsPost = typeof news.$inferSelect;
export type InsertNewsPost = z.infer<typeof insertNewsSchema>;

export type TeamMember = typeof team.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
