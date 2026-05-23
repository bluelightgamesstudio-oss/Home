import { db } from "./db";
import {
  games, news, team, messages,
  type Game, type InsertGame,
  type NewsPost, type InsertNewsPost,
  type TeamMember, type InsertTeamMember,
  type Message, type InsertMessage
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getGames(): Promise<Game[]>;
  getGame(id: number): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;
  
  getNews(): Promise<NewsPost[]>;
  getNewsPost(id: number): Promise<NewsPost | undefined>;
  createNews(post: InsertNewsPost): Promise<NewsPost>;
  
  getTeam(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getGames(): Promise<Game[]> {
    return await db.select().from(games);
  }

  async getGame(id: number): Promise<Game | undefined> {
    const [game] = await db.select().from(games).where(eq(games.id, id));
    return game;
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const [game] = await db.insert(games).values(insertGame).returning();
    return game;
  }

  async getNews(): Promise<NewsPost[]> {
    return await db.select().from(news).orderBy(desc(news.publishedAt));
  }

  async getNewsPost(id: number): Promise<NewsPost | undefined> {
    const [post] = await db.select().from(news).where(eq(news.id, id));
    return post;
  }

  async createNews(insertPost: InsertNewsPost): Promise<NewsPost> {
    const [post] = await db.insert(news).values(insertPost).returning();
    return post;
  }

  async getTeam(): Promise<TeamMember[]> {
    return await db.select().from(team);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const [member] = await db.insert(team).values(insertMember).returning();
    return member;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
