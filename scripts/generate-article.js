import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Initialize OpenAI with a super-cheap model to avoid quota issues
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateArticle() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("No OPENAI_API_KEY found.");
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
  console.log(`Generating article for: ${selectedTopic} using gpt-4o-mini...`);
  
  const systemPrompt = `You are an elite SEO expert for an IPTV blog. Write a conversion-focused, long-tail article (800+ words) targeting UK/USA.
- Mention UK ISPs (Sky, Virgin) and Firestick/Nvidia Shield.
- INTERNAL LINKING: Use [/blog/sample-post] or [/blog/2026-04-20-best-iptv-subscription-sports].
- PRIMARY CTA: Use https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%F0%9F%98%80
- Format as Markdown with Frontmatter.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Super cheap model to bypass quota limits
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Write about: ${selectedTopic}` }
      ]
    });

    const content = response.choices[0].message.content;
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
