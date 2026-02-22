import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { 
  departures, 
  type Departure, 
  type InsertDeparture 
} from "@shared/schema";

export interface IStorage {
  getDepartures(sessionId: string): Promise<Departure[]>;
  upsertDeparture(departure: InsertDeparture): Promise<Departure>;
  clearDeparture(id: number): Promise<Departure | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getDepartures(sessionId: string): Promise<Departure[]> {
    return await db.select().from(departures).where(eq(departures.sessionId, sessionId));
  }

  async upsertDeparture(insertDeparture: InsertDeparture): Promise<Departure> {
    // Check if exists for session and category
    const [existing] = await db.select()
      .from(departures)
      .where(and(
        eq(departures.sessionId, insertDeparture.sessionId),
        eq(departures.category, insertDeparture.category)
      ));

    if (existing) {
      const [updated] = await db.update(departures)
        .set({ restrictedItems: insertDeparture.restrictedItems })
        .where(eq(departures.id, existing.id))
        .returning();
      return updated;
    }

    const [created] = await db.insert(departures).values(insertDeparture).returning();
    return created;
  }

  async clearDeparture(id: number): Promise<Departure | undefined> {
    const [updated] = await db.update(departures)
      .set({ isCleared: true })
      .where(eq(departures.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
