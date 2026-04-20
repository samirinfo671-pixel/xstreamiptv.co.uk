import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// Standard model name
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateArticle() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No GEMINI_API_KEY found.");
    process.exit(1);
  }

  const topics = [
    "How to fix buffering on Firestick for IPTV in 2026 (UK & USA)",
    "Best IPTV apps for Samsung and LG Smart TVs 2026: No Box Needed",
    "Why you need a VPN for IPTV in 2026: Speed, Security and Privacy",
    "Top 5 IPTV providers for 4K Sports in the UK: Premier League Guide",
    "How to install IPTV on Nvidia Shield: The Ultimate 2026 Guide"
  ];

  const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
  console.log(`Generating article for: ${selectedTopic} using Gemini...`);
  
  const systemPrompt = `You are an elite SEO expert for an IPTV blog. Write a conversion-focused, long-tail article (800+ words) targeting UK/USA.
- Mention UK ISPs (Sky, Virgin) and Firestick/Nvidia Shield.
- INTERNAL LINKING: Use [/blog/sample-post] or [/blog/2026-04-20-best-iptv-subscription-sports].
- PRIMARY CTA: Use https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%F0%9F%98%80
- Format as Markdown with Frontmatter.
---
title: "The SEO Optimized Title"
description: "A compelling meta description under 155 chars."
date: "YYYY-MM-DD"
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80"
altText: "Descriptive alt text for the image"
---
`;

  try {
    const prompt = `${systemPrompt}\n\nWrite today's SEO article about: ${selectedTopic}`;
    const result = await model.generateContent(prompt);
    const content = result.response.text();

    const titleMatch = content.match(/title:\s*"(.*?)"/);
    const title = titleMatch ? titleMatch[1] : "New IPTV Guide 2026";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = `${new Date().toISOString().split('T')[0]}-${slug}.md`;
    
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
    fs.writeFileSync(path.join(blogDir, filename), content.trim());
    
    console.log(`Success: Generated article ${filename}`);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

generateArticle();
