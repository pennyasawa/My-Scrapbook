import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const departures = pgTable("departures", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(), // For anonymous user tracking
  category: text("category").notNull(), // HABITS, MINDSET, etc.
  restrictedItems: text("restricted_items").notNull(), // User input
  isCleared: boolean("is_cleared").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDepartureSchema = createInsertSchema(departures).omit({
  id: true,
  createdAt: true,
  isCleared: true 
});

export type Departure = typeof departures.$inferSelect;
export type InsertDeparture = z.infer<typeof insertDepartureSchema>;

export const DEPARTURE_CATEGORIES = [
  "HABITS",
  "MINDSET",
  "ROLES",
  "EXPECTATIONS",
  "THE YEAR"
] as const;
