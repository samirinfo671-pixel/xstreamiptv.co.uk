import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Initialize OpenAI. It will automatically use process.env.OPENAI_API_KEY
const openai = new OpenAI();

async function generateArticle() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("No OPENAI_API_KEY found in environment variables.");
    process.exit(1);
  }

  console.log("Generating article ideas based on IPTV blueprint...");
  
  // Prompt to select a topic and generate a full SEO optimized article
  const systemPrompt = `You are an elite SEO strategist and expert content writer for an IPTV subscription blog targeting the UK and USA markets.
Your goal is to write a highly conversational, BOFU or MOFU targeted article perfectly structured for SEO.

Localization Rules:
- If the topic is UK-focused, mention UK ISPs (Virgin, Sky, BT), UK sports (Premier League, EFL), and the necessity of bypassing UK ISP blocks.
- If the topic is USA-focused, mention USA cable-cutting trends, NFL, NBA, and localized channel availability.
- Always assume a mix of these two core markets unless otherwise specified.

Device Expertise:
- Deeply mention specific setup nuances for: Amazon Firestick 4K/Max, Samsung/LG Smart TVs (Tizen/webOS), and Nvidia Shield Pro.
- Recommend top-tier apps: Tivimate, IPTV Smarters Pro, and iMPlayer.

Writing Rules:
- 100% unique, human-like writing (no robotic AI phrasing). Use bold text for emphasis but DON'T overdo it.
- Use H1, H2, H3 headers. Use concise, punchy paragraphs.
- Include a comprehensive FAQ at the bottom based on 'People Also Ask' data.
- Include DO-FOLLOW style contextual internal links to other areas like [/blog/best-iptv-subscription-sports] or [/blog/buy-iptv-subscription-trial].
- Mention our trusted partner brands naturally (Xstream IPTV UK, Good IPTV Hub, and 4K MEMBERSHIP) as the authority sources.
- PRIMARY CTA: Every article MUST end with a strong recommendation to start a trial via WhatsApp. Use this exact URL: https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%F0%9F%98%80
- INTERNAL LINKING: When linking to other blog posts, use the specific format [/blog/sample-post] or [/blog/2026-04-20-best-iptv-subscription-sports]. NEVER link to pages that don't exist.
- Format output EXACTLY in this Markdown structure with Frontmatter:
---
title: "The SEO Optimized Title"
description: "A compelling meta description under 155 chars."
date: "YYYY-MM-DD"
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80"
altText: "Descriptive alt text for the image"
---

# Your H1 Title

[Rest of the article in markdown...]
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // or gpt-4o-mini
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Write today's SEO optimized article about: 'Why you should use a VPN with your IPTV subscription in 2026'. Make it comprehensive." }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    
    if (!content) throw new Error("No content generated.");

    // Extract title from frontmatter to create a slug
    const titleMatch = content.match(/title:\s*"(.*?)"/);
    if (!titleMatch) throw new Error("Could not parse title from frontmatter.");
    
    const title = titleMatch[1];
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `${dateStr}-${slug}.md`;
    
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    
    // Ensure directory exists
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    const filepath = path.join(blogDir, filename);
    fs.writeFileSync(filepath, content.trim());
    
    console.log(`Successfully created new article: ${filepath}`);

  } catch (error) {
    console.error("Error generating article:", error);
    process.exit(1);
  }
}

generateArticle();
