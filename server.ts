import express from "express";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // 1. AI Marketing Strategy Advisor (gemini-4-argon with high thinking)
  app.post("/api/ai/advisor", async (req, res) => {
    try {
      const { prompt, businessType, goal } = req.body;
      const fullPrompt = `Act as Sruthi Kristipati's expert digital marketing advisor. A client or recruiter is asking: "${prompt}". Business Type: ${businessType || 'General Digital Brand'}, Goal: ${goal || 'Growth & Engagement'}. Provide actionable, high-impact strategies covering social media marketing, Meta Ads, content planning, and creative execution.`;

      const response = await ai.models.generateContent({
        model: "gemini-4-argon",
        contents: fullPrompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          systemInstruction: "You are Sruthi Kristipati's digital marketing assistant. Sruthi is a Social Media & Digital Marketing Executive with ~3 years experience in Dubai and India, expert in Meta Ads, content strategy, Instagram Reels, and AI-assisted workflows.",
        },
      });

      res.json({ success: true, text: response.text });
    } catch (err: any) {
      console.error("Advisor error:", err);
      res.status(500).json({ success: false, error: err.message || "Failed to generate marketing advisory." });
    }
  });

  // 2. AI Brand Creative Generator (gemini-nano-banana-2.1 with 1K, 2K, 4K resolution options)
  app.post("/api/ai/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio, imageSize } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-nano-banana-2.1",
        contents: {
          parts: [{ text: prompt || "Professional digital marketing campaign visual, modern editorial aesthetic, 8k resolution" }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio || "1:1",
            imageSize: imageSize || "1K",
          },
        },
      });

      let imageUrl = "";
      let textOut = "";
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          } else if (part.text) {
            textOut += part.text;
          }
        }
      }

      res.json({ success: true, imageUrl, text: textOut });
    } catch (err: any) {
      console.error("Image gen error:", err);
      res.status(500).json({ success: false, error: err.message || "Failed to generate image." });
    }
  });

  // 3. Photo-to-Video Reel Animate (gemini-omni-1.1-flash via Interactions API)
  app.post("/api/ai/animate-video", async (req, res) => {
    try {
      const { imageBase64, mimeType, prompt, aspectRatio } = req.body;
      
      const inputParts: any[] = [];
      if (imageBase64) {
        inputParts.push({
          type: "image",
          mime_type: mimeType || "image/png",
          data: imageBase64,
        });
      }
      inputParts.push({
        type: "text",
        text: prompt || "Animate this marketing photo into a dynamic Instagram Reel with cinematic lighting and subtle motion.",
      });

      const interaction = await ai.interactions.create(
        {
          model: "gemini-omni-1.1-flash",
          input: inputParts,
          background: false,
          store: false,
          stream: false,
          response_format: {
            type: "video",
            aspect_ratio: aspectRatio || "9:16",
            duration: "5s",
            resolution: "720p",
          },
        },
        { timeout: 300000 }
      );

      const videoPart = (interaction as any).output_video;
      if (videoPart && videoPart.data) {
        const videoUrl = `data:${videoPart.mime_type || 'video/mp4'};base64,${videoPart.data}`;
        res.json({ success: true, videoUrl });
      } else {
        res.status(500).json({ success: false, error: "No video returned from omni model." });
      }
    } catch (err: any) {
      console.error("Video animate error:", err);
      res.status(500).json({ success: false, error: err.message || "Failed to generate video reel." });
    }
  });

  // 4. Contact Form Endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, inquiryType, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Please fill in all required fields." });
    }
    console.log("New portfolio inquiry received:", { name, email, inquiryType, message });
    res.json({ success: true, message: "Thank you! Your message has been sent to Sruthi Kristipati." });
  });

  // Setup Vite in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
