import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini AI client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for AI Stylist
  app.post("/api/stylist", async (req, res) => {
    try {
      const { eventType, stylePreference, bodyType, tone, customDetail } = req.body;

      if (!eventType || !stylePreference || !bodyType || !tone) {
        return res.status(400).json({ error: "Missing required profile fields." });
      }

      const prompt = `
You are the prestigious Lead Stylist at "The Avenue", a premier bespoke luxury couture studio in Chennai, Tamil Nadu.
Analyze the user's profile and recommend exactly ONE of our available masterpiece outfits from our catalog that best suits them.

User Profile:
- Special Wedding Event: ${eventType}
- Attire Styling Vibe: ${stylePreference}
- Body Structure Silhouette: ${bodyType}
- Preferred Color Palette: ${tone}
- Special Alterations & Accent Notes: ${customDetail || "None provided"}

Our Complete Product Catalog:
1. "The Avenue Royal Navy Tuxedo Blazer" (Category: Blazers)
   - Fabric: Super 140s Italian Merino Wool with Black Silk Shawl Lapels
   - Ideal for: High-end reception galas, evening celebrations, and dapper black-tie festivities.
2. "Sovereign Plaid Checked Blazer" (Category: Blazers)
   - Fabric: Premium Plaid Checks & Woolen Blend
   - Ideal for: Sangeets, cocktail parties, and contemporary bold styling statements.
3. "Obsidian Jodhpuri Bandhgala" (Category: Blazers)
   - Fabric: Premium Obsidian Black Cashmere Blend with Subtle Gold Speckles
   - Ideal for: Traditional yet sleek receptions, grand dinners, and majestic high-collar looks.
4. "Imperial Tamilnadu Gold-Border Sherwani" (Category: Sherwani)
   - Fabric: Premium Champagne Silk & Gold-Olive Brocade
   - Ideal for: Sacred wedding muhurthams, royal traditional ceremonies, and classic groom attire.

Your task:
1. Select the EXACT matching product name from the catalog that best satisfies the user's style, event, and color preferences.
2. Formulate custom, structured details (jacket/coat fit, trouser pairing, shirt, footwear, accessories, and styling tips) tailored to their body type and event.
3. Keep the tone sophisticated, elegant, and professional.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional bespoke fashion concierge for luxury groom couture. Always respond in valid JSON matching the schema.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendationTitle: {
                type: Type.STRING,
                description: "Must be the EXACT name of one of the products: 'The Avenue Royal Navy Tuxedo Blazer', 'Sovereign Plaid Checked Blazer', 'Obsidian Jodhpuri Bandhgala', or 'Imperial Tamilnadu Gold-Border Sherwani'."
              },
              description: {
                type: Type.STRING,
                description: "A professional, personalized narrative explaining why this exact outfit is perfect for the user's specific body silhouette, selected wedding event, and style preference."
              },
              outfitType: {
                type: Type.STRING,
                description: "The category of the dress, either 'Blazers' or 'Sherwani'."
              },
              recommendedLook: {
                type: Type.OBJECT,
                properties: {
                  jacket: { type: Type.STRING, description: "Styling and fit details for the jacket/coat/outer garment." },
                  trouser: { type: Type.STRING, description: "Styling and color recommendations for the trousers or veshti." },
                  shirt: { type: Type.STRING, description: "Styling details for the shirt or kurta inner." },
                  footwear: { type: Type.STRING, description: "The exact type of footwear to wear with this look." },
                  accessories: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of 3-4 custom accessories to complete this specific look."
                  }
                },
                required: ["jacket", "trouser", "shirt", "footwear", "accessories"]
              },
              stylingTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 3 tailored etiquette and styling tips specific to the user's body shape and event."
              },
              colorPaletteExplanation: {
                type: Type.STRING,
                description: "Explain how the color selection harmonizes with their preferred wedding color palette."
              },
              matchConfidence: {
                type: Type.STRING,
                description: "e.g., '95% Match' or '98% Match' based on your stylist evaluation."
              }
            },
            required: [
              "recommendationTitle",
              "description",
              "outfitType",
              "recommendedLook",
              "stylingTips",
              "colorPaletteExplanation",
              "matchConfidence"
            ]
          }
        }
      });

      const recommendationData = JSON.parse(response.text || "{}");
      res.json(recommendationData);
    } catch (err: any) {
      console.error("Gemini AI Stylist error:", err);
      res.status(500).json({ error: "Failed to generate bespoke styling prescription." });
    }
  });

  // Vite dev server setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
