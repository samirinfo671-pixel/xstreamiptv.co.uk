import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function generateArticle() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No GEMINI_API_KEY found.");
    process.exit(1);
  }

  // Dual-Model Fallback for maximum reliability
  const modelsToTry = ["gemini-1.5-flash-latest", "gemini-1.5-flash", "gemini-pro"];
  let content = "";
  let usedModel = "";

  const topics = [
    "How to fix buffering on Firestick for IPTV in 2026 (UK & USA)",
    "Best IPTV apps for Samsung and LG Smart TVs 2026: No Box Needed",
    "Why you need a VPN for IPTV in 2026: Speed, Security and Privacy",
    "Top 5 IPTV providers for 4K Sports in the UK: Premier League Guide",
    "How to install IPTV on Nvidia Shield: The Ultimate 2026 Guide"
  ];

  const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
  
  const systemPrompt = `You are an elite SEO expert for an IPTV blog. Write a premium 800+ word article in Markdown with Frontmatter.
Target: UK/USA markets. 
CTA: Message on WhatsApp at https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%F0%9F%98%80
Format with:
---
title: "Article Title"
description: "Meta description"
date: "YYYY-MM-DD"
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80"
altText: "Alt description"
---
# H1 Title
...content...`;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Searching for model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(`${systemPrompt}\n\nToday's Topic: ${selectedTopic}`);
      content = result.response.text();
      if (content) {
        usedModel = modelName;
        break;
      }
    } catch (err) {
      console.warn(`Model ${modelName} not available for this key. Trying next...`);
    }
  }

  if (!content) {
    console.error("CRITICAL: Your Gemini key is not working with any standard models. Please check AI Studio.");
    process.exit(1);
  }

  try {
    const titleMatch = content.match(/title:\s*"(.*?)"/);
    const title = titleMatch ? titleMatch[1] : "New IPTV Guide 2026";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = `${new Date().toISOString().split('T')[0]}-${slug}.md`;
    
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
    fs.writeFileSync(path.join(blogDir, filename), content.trim());
    
    console.log(`SUCCESS: Article generated via ${usedModel} -> ${filename}`);
  } catch (error) {
    console.error("File save error:", error.message);
    process.exit(1);
  }
}

generateArticle();
