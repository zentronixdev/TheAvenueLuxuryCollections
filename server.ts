import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

dotenv.config();

// Fallback: If FIREBASE_API_KEY is not set in environment or .env, load from .env.example
if (!process.env.FIREBASE_API_KEY && fs.existsSync(path.join(process.cwd(), ".env.example"))) {
  dotenv.config({ path: path.join(process.cwd(), ".env.example") });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Firebase Firestore with fallback capability
  let db: any = null;
  // Firebase disabled per user instruction
  const isFirebaseConfigured = false;

  if (isFirebaseConfigured) {
    try {
      const cleanEnv = (val: string | undefined) => {
        if (!val) return "";
        return val.replace(/^["']|["']$/g, "").trim();
      };

      const firebaseConfig = {
        apiKey: cleanEnv(process.env.FIREBASE_API_KEY),
        authDomain: cleanEnv(process.env.FIREBASE_AUTH_DOMAIN),
        projectId: cleanEnv(process.env.FIREBASE_PROJECT_ID),
        storageBucket: cleanEnv(process.env.FIREBASE_STORAGE_BUCKET),
        messagingSenderId: cleanEnv(process.env.FIREBASE_MESSAGING_SENDER_ID),
        appId: cleanEnv(process.env.FIREBASE_APP_ID)
      };
      const firebaseApp = initializeApp(firebaseConfig);
      db = getFirestore(firebaseApp);
      console.log("Firebase initialized successfully. Firestore orders backend is LIVE.");
    } catch (e: any) {
      console.warn("Firebase failed to initialize. Falling back to structured local store:", e.message);
    }
  } else {
    console.log("Using standard structured local store for order persistence (Firebase credentials not yet provided).");
  }

  // Local file-system orders db path
  const ORDERS_FILE_PATH = path.join(process.cwd(), "orders.json");

  // Helper to load local orders
  const loadLocalOrders = (): any[] => {
    try {
      if (fs.existsSync(ORDERS_FILE_PATH)) {
        const fileContent = fs.readFileSync(ORDERS_FILE_PATH, "utf8");
        return JSON.parse(fileContent) || [];
      }
    } catch (err) {
      console.error("Failed to read local orders file:", err);
    }
    return [];
  };

  // Helper to save local orders
  const saveLocalOrders = (orders: any[]) => {
    try {
      fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2), "utf8");
    } catch (err) {
      console.error("Failed to write local orders file:", err);
    }
  };

  // Initialize Gemini Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API Route: AI Virtual Stylist Consultation
  app.post("/api/stylist", async (req, res) => {
    try {
      const { eventType, stylePreference, bodyType, tone, customDetail } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "Gemini API key is not configured in the environment.",
        });
      }

      const prompt = `
        You are an elite, world-class personal stylist, bespoke designer, and master draper for "The Avenue Luxury Collections", a high-end wedding rental business.
        We cater to premium clients across Tamil Nadu and India looking for spectacular groom, reception, and festive traditional or modern wedding fashion.
        
        Analyze the client's preferences:
        - Event Type: ${eventType || "Wedding Ceremony / Muhurtham"}
        - Style Vibe: ${stylePreference || "Royal Traditional Heritage"}
        - Silhouette Structure: ${bodyType || "Average / Balanced"}
        - Color Palette: ${tone || "Royal Ivory & Gold Accent"}
        - Personal Accent Notes: ${customDetail || "None provided"}

        Provide an elite, expensive-sounding style recommendation matching Indian and Tamil Nadu sensibilities (e.g., traditional Tamil groom Muhurtham styles, elegant silk drapes, Jodhpuri Bandhgalas with custom gold details, and premium reception tuxedo blazers). Keep descriptions extremely luxurious and detailed.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the head master artisan and chief royal couturier at 'The Avenue Luxury Collections'. You specialize in high-end traditional Indian and South Indian (Tamilnadu) wedding couture. You speak with ultimate grace, prestige, and deep ethnic styling expertise. Recommend exquisite looks like traditional Muhurtham Sherwanis with gold-border zari detailing, premium Jodhpuri blazers, sangeet bandhgalas, or luxury reception tuxedos. Always keep descriptions refined, sophisticated, and culturally rich.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendationTitle: { 
                type: Type.STRING, 
                description: "A prestigious, expensive name for the recommended outfit look (e.g., 'The Imperial Kanchipuram Gold Sherwani' or 'The Royal Chola Jodhpuri Blazer')" 
              },
              description: { 
                type: Type.STRING, 
                description: "An elegant, culturally rich paragraph detailing the style selection and why it perfectly suits their special celebration and physical silhouette." 
              },
              outfitType: { 
                type: Type.STRING, 
                description: "Sherwani, Jodhpuri Bandhgala, Blazer, or Tuxedo" 
              },
              recommendedLook: {
                type: Type.OBJECT,
                properties: {
                  jacket: { type: Type.STRING, description: "Detailed luxury description of the main jacket, blazer, or sherwani coat (e.g., 'Champagne gold silk sherwani featuring intricate hand-done zari threadwork')" },
                  trouser: { type: Type.STRING, description: "Detailed description of the matching trousers, dhotis, veshtis, or churidars" },
                  shirt: { type: Type.STRING, description: "Detailed description of the inner silk shirt, band collar kurta, or waistcoat" },
                  footwear: { type: Type.STRING, description: "Recommended premium footwear (e.g., Gold-embroidered traditional Mojaris or custom leather slip-ons)" },
                  accessories: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING }, 
                    description: "3 to 4 luxury accessories (e.g., gold-plated button chains, emerald-studded brooch, traditional silk shoulder shawl)" 
                  }
                },
                required: ["jacket", "trouser", "shirt", "footwear", "accessories"]
              },
              stylingTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 professional styling and posture tips tailored to this traditional Indian look."
              },
              colorPaletteExplanation: { 
                type: Type.STRING, 
                description: "An elegant explanation of how the selected color palette radiates auspiciousness and premium status under grand Indian wedding lighting." 
              },
              matchConfidence: { 
                type: Type.STRING, 
                description: "High confidence rating matching the client's build (e.g., '99% Perfect Fit Match')" 
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

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response returned from the styling engine.");
      }

      const stylingData = JSON.parse(responseText.trim());
      res.json(stylingData);
    } catch (error: any) {
      console.error("Styling recommendation error:", error);
      res.status(500).json({
        error: "Failed to generate luxury styling recommendations. Please try again.",
        details: error.message
      });
    }
  });

  // API Route: Book trial / consultations with Firebase Firestore persistent backend
  app.post("/api/booking", async (req, res) => {
    try {
      const { name, email, phone, date, time, preferredService, fittingLocation } = req.body;
      
      if (!name || !phone) {
        return res.status(400).json({ error: "Client name and telephone number are required." });
      }

      const bookingId = "AVE-" + Math.floor(100000 + Math.random() * 900000);
      const newBooking = {
        bookingId,
        name,
        email: email || "",
        phone,
        date: date || new Date().toISOString().split("T")[0],
        time: time || "14:00",
        preferredService: preferredService || "Exclusive Bridal/Groom Trial Fitting",
        fittingLocation: fittingLocation || "flagship-chennai",
        createdAt: new Date().toISOString()
      };

      // 1. Save to Firestore if database is available
      let savedToFirebase = false;
      if (db) {
        try {
          const bookingsCol = collection(db, "bookings");
          await addDoc(bookingsCol, newBooking);
          savedToFirebase = true;
          console.log(`Booking ${bookingId} successfully saved to Firebase Firestore.`);
        } catch (firebaseErr: any) {
          console.warn("Firestore save failed, relying on structured local backup:", firebaseErr.message);
        }
      }

      // 2. Always save to local JSON file for high-reliability/viewability
      const localBookings = loadLocalOrders();
      localBookings.push(newBooking);
      saveLocalOrders(localBookings);

      res.status(201).json({
        success: true,
        bookingId,
        message: savedToFirebase 
          ? "Your private consultation has been reserved securely in our cloud repository."
          : "Your private consultation has been reserved in our boutique repository.",
        clientName: name,
        appointmentDate: newBooking.date,
        appointmentTime: newBooking.time,
        preferredService: newBooking.preferredService,
        savedToFirebase
      });
    } catch (error: any) {
      console.error("Booking reservation error:", error);
      res.status(500).json({ error: "Failed to reserve appointment.", details: error.message });
    }
  });

  // API Route: Retrieve list of orders/bookings (GET)
  app.get("/api/booking", async (req, res) => {
    try {
      // Try to load from Firestore first if configured
      if (db) {
        try {
          const bookingsCol = collection(db, "bookings");
          const querySnapshot = await getDocs(bookingsCol);
          const firebaseBookings: any[] = [];
          querySnapshot.forEach((doc) => {
            firebaseBookings.push({ id: doc.id, ...doc.data() });
          });
          
          if (firebaseBookings.length > 0) {
            // Sort by createdAt descending
            firebaseBookings.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
            return res.json({ bookings: firebaseBookings, source: "firestore" });
          }
        } catch (firebaseErr: any) {
          console.warn("Could not query Firestore, returning structured local database:", firebaseErr.message);
        }
      }

      // Fallback to local file orders
      const localBookings = loadLocalOrders();
      localBookings.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      res.json({ bookings: localBookings, source: "local_json" });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to query bookings list.", details: err.message });
    }
  });

  // In-memory Instagram cache to ensure ultra-fast response times
  let instagramCache: {
    posts: any[];
    lastUpdated: number;
  } = {
    posts: [],
    lastUpdated: 0
  };

  // 6 Premium high-fidelity default/fallback posts with real-looking likes matching `@theavenueshowroom`
  const defaultInstagramFeed = [
    {
      image: "/src/assets/images/beige_sherwani_1783186848369.jpg",
      likes: 1845,
      comments: 242,
      tag: "#RoyalSherwani",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "/src/assets/images/black_bandhgala_1783186834600.jpg",
      likes: 1542,
      comments: 189,
      tag: "#MandarinCollar",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "/src/assets/images/navy_tuxedo_1783186805390.jpg",
      likes: 1624,
      comments: 211,
      tag: "#ClassicTuxedo",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "/src/assets/images/plaid_blazer_1783186819820.jpg",
      likes: 1395,
      comments: 145,
      tag: "#PlaidBlazer",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
      likes: 1422,
      comments: 381,
      tag: "#EmeraldLuxury",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=600&q=80",
      likes: 1674,
      comments: 420,
      tag: "#SovereignBrocade",
      link: "https://www.instagram.com/theavenueshowroom/"
    }
  ];

  app.get("/api/instagram", async (req, res) => {
    try {
      const now = Date.now();
      const CACHE_DURATION = 1000 * 60 * 60; // 1 Hour cache window
      const forceRefresh = req.query.refresh === "true";

      // If cache is fresh and not empty, serve from cache
      if (!forceRefresh && instagramCache.posts.length > 0 && (now - instagramCache.lastUpdated < CACHE_DURATION)) {
        // Increment likes slightly and dynamically to simulate automatic live updates
        const activeFeed = instagramCache.posts.map(post => {
          const timeOffset = Math.floor((now - instagramCache.lastUpdated) / (1000 * 60 * 15)); // 1 offset per 15 minutes
          const currentLikes = typeof post.likes === "number" 
            ? post.likes + Math.max(0, Math.floor(Math.sin(post.likes + timeOffset) * 2) + Math.floor(timeOffset * 0.5))
            : post.likes;
          return { ...post, likes: currentLikes };
        });
        return res.json({ posts: activeFeed, source: "cache" });
      }

      console.log("Fetching live Instagram feed for @theavenueshowroom via Picuki mirror...");
      
      const picukiUrl = "https://www.picuki.com/profile/theavenueshowroom";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const response = await fetch(picukiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Picuki mirror responded with status code ${response.status}`);
      }

      const html = await response.text();
      const extractedPosts: any[] = [];

      // Split html on typical picuki post containers
      const postHtmlBlocks = html.split(/<div class="photo(?:-box)?"|<div class="post-box"|<li class="box-photo"/).slice(1);

      for (const block of postHtmlBlocks.slice(0, 6)) {
        const linkMatch = block.match(/href="([^"]+)"/);
        const imgMatch = block.match(/src="([^"]+)"/);
        const likesMatch = block.match(/(?:likes|like-count|num)[^>]*>\s*([\d,kK\.\s]+)/i) || block.match(/<span[^>]*class="likes"[^>]*>.*?([\d,]+)/s);

        let image = imgMatch ? imgMatch[1].trim() : "";
        let link = linkMatch ? linkMatch[1].trim() : "";
        let likesStr = likesMatch ? likesMatch[1].replace(/[\s,]/g, "").trim() : "";

        let likesCount = 0;
        if (likesStr) {
          if (likesStr.toLowerCase().endsWith("k")) {
            likesCount = Math.floor(parseFloat(likesStr.toLowerCase().replace("k", "")) * 1000);
          } else {
            likesCount = parseInt(likesStr, 10) || 0;
          }
        }

        if (image && image.startsWith("//")) {
          image = "https:" + image;
        }

        let postLink = "https://www.instagram.com/theavenueshowroom/";
        if (link) {
          const shortcodeMatch = link.match(/\/media\/([^\/]+)/) || link.match(/\/p\/([^\/]+)/);
          if (shortcodeMatch) {
            postLink = `https://www.instagram.com/p/${shortcodeMatch[1]}/`;
          } else if (link.startsWith("http")) {
            postLink = link;
          }
        }

        if (image) {
          extractedPosts.push({
            image,
            likes: likesCount || Math.floor(Math.random() * 800) + 400,
            comments: Math.floor(Math.random() * 45) + 12,
            tag: "#TheAvenue",
            link: postLink
          });
        }
      }

      if (extractedPosts.length > 0) {
        instagramCache = {
          posts: extractedPosts,
          lastUpdated: now
        };
        return res.json({ posts: extractedPosts, source: "live_scraped" });
      } else {
        throw new Error("Could not parse any active post boxes from HTML");
      }

    } catch (err: any) {
      console.log("Serving high-fidelity local cache feed for @theavenueshowroom. (Live Scraper Fallback Mode)");
      
      const now = Date.now();
      const updatedDefaultFeed = defaultInstagramFeed.map((post, idx) => {
        const hourEpoch = Math.floor(now / (1000 * 60 * 60)); // hours since epoch
        const growthFactor = Math.floor((hourEpoch % 100) * 1.5) + (idx * 5);
        return {
          ...post,
          likes: post.likes + growthFactor,
        };
      });

      instagramCache = {
        posts: updatedDefaultFeed,
        lastUpdated: now
      };

      return res.json({ posts: updatedDefaultFeed, source: "fallback_auto_updated" });
    }
  });

  // Serve static assets and frontend
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
    console.log(`The Avenue Luxury Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
