import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// Using gemini-pro which proved stable for this key
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generateArticle() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No GEMINI_API_KEY found.");
    process.exit(1);
  }

  // Topic Engine: Rotating categories to ensure unique, long-tail content
  const topics = [
    "How to fix buffering on Firestick for IPTV in 2026 (UK & USA)",
    "Best IPTV apps for Samsung and LG Smart TVs 2026: No Box Needed",
    "Why you need a VPN for IPTV in 2026: Speed, Security and Privacy",
    "Top 5 IPTV providers for 4K Sports in the UK: Premier League Guide",
    "How to install IPTV on Nvidia Shield: The Ultimate 2026 Guide",
    "IPTV vs Cable in 2026: Which is better for USA cord-cutters?",
    "Best IPTV Subscription for Movies and VOD: 100k+ Titles Guide",
    "How to set up Tivimate with your IPTV subscription in 2026",
    "Legal IPTV vs Unverified: What is the difference in 2026?",
    "Best IPTV for Apple TV 4K: Top Apps and Setup 2026"
  ];

  // Pick a random topic to ensure variety
  const selectedTopic = topics[Math.floor(Math.random() * topics.length)];

  console.log(`Generating article for topic: ${selectedTopic}...`);
  
  const systemPrompt = `You are an elite SEO strategist and expert content writer.
Target: UK and USA IPTV market.
Goal: Write a unique, high-value, long-tail SEO article that targets low-competition keywords.

Localization & Expertise:
- Mention UK ISPs (Sky, Virgin) and USA cable trends.
- Mention Firestick, Nvidia Shield, and Smart TV setup.
- Focus on "Problem/Solution" content (e.g. how to fix buffering, how to install).

Structure:
- Use H1, H2, H3.
- Use do-follow style internal links to [/blog/sample-post] or [/blog/2026-04-20-best-iptv-subscription-sports].
- PRIMARY CTA: End with a link to WhatsApp: https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%F0%9F%98%80
- Format output as Markdown with Frontmatter:
---
title: "The SEO Optimized Long-Tail Title"
description: "Compelling meta description."
date: "YYYY-MM-DD"
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80"
altText: "Descriptive alt text"
---

# Your H1 Title

[Rest of content...]
`;

  try {
    const prompt = `${systemPrompt}\n\nToday's specific keyword/topic: '${selectedTopic}'. Focus on low-competition long-tail search intent. Make it at least 800 words.`;
    
    const result = await model.generateContent(prompt);
    const content = result.response.text();
    
    if (!content) throw new Error("No content generated.");

    const titleMatch = content.match(/title:\s*"(.*?)"/);
    if (!titleMatch) throw new Error("Could not parse title.");
    
    const title = titleMatch[1];
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `${dateStr}-${slug}.md`;
    
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

    const filepath = path.join(blogDir, filename);
    fs.writeFileSync(filepath, content.trim());
    
    console.log(`Success: Generated unique content for ${selectedTopic}`);

  } catch (error) {
    console.error("Gemini Error:", error);
    process.exit(1);
  }
}

generateArticle();
