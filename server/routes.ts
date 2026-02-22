import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Middleware to ensure session ID exists for anonymous users if not using actual auth
  // For simplicity in this lite build, we'll expect the client to send a session identifier 
  // or we rely on the session cookie if express-session is configured (which it is in index.ts)
  
  app.get(api.departures.list.path, async (req, res) => {
    const sessionId = req.sessionID || "default-session"; 
    const items = await storage.getDepartures(sessionId);
    res.json(items);
  });

  app.post(api.departures.sync.path, async (req, res) => {
    try {
      const input = api.departures.sync.input.parse(req.body);
      // Ensure we use the server-side session ID if possible, or trust the client for this anonymous app
      // Overriding sessionId from session if available to be safe
      const secureInput = { ...input, sessionId: req.sessionID || input.sessionId };
      
      const item = await storage.upsertDeparture(secureInput);
      res.json(item);
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

  app.post(api.departures.clear.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await storage.clearDeparture(id);
    if (!item) {
      return res.status(404).json({ message: "Departure not found" });
    }
    res.json(item);
  });

  return httpServer;
}
