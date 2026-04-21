import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Initialize OpenAI client for OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://xstreamiptv.co.uk", // Required for OpenRouter
    "X-Title": "IPTV Blog Automation", // Required for OpenRouter
  }
});

async function generateArticle() {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("CRITICAL: No OPENROUTER_API_KEY found.");
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
  console.log(`Generating unique content for: ${selectedTopic} via OpenRouter...`);
  
  const systemPrompt = `You are an elite SEO strategist. Write a premium 800+ word IPTV guide in Markdown with Frontmatter.
Target: UK/USA. Mention Firestick and Premium setups.
CTA: https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%F0%9F%98%80
Format with:
---
title: "Article Title"
description: "SEO Description"
date: "YYYY-MM-DD"
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80"
altText: "Alt Text"
---
# H1 Title
...content...`;

  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001", // Using Gemini through OpenRouter for stability
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Write a high-traffic article about: ${selectedTopic}` }
      ]
    });

    const content = response.choices[0].message.content;
    const titleMatch = content.match(/title:\s*"(.*?)"/);
    const title = titleMatch ? titleMatch[1] : "Premium IPTV Guide 2026";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = `${new Date().toISOString().split('T')[0]}-${slug}.md`;
    
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
    fs.writeFileSync(path.join(blogDir, filename), content.trim());
    
    console.log(`SUCCESS: Created ${filename} via OpenRouter`);
  } catch (error) {
    console.error("ERROR:", error.message);
    process.exit(1);
  }
}

generateArticle();
