import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function generateArticle() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No API Key");
    process.exit(1);
  }

  const topic = "The Ultimate IPTV Guide 2026: Best Services for Firestick and Shield";
  
  const payload = {
    contents: [{
      parts: [{
        text: `Write a premium 800-word SEO article for an IPTV blog. Topic: ${topic}. Include frontmatter with title, description, date, image URL. End with WhatsApp CTA: https://api.whatsapp.com/send?phone=447871743874&text=TRIAL`
      }]
    }]
  };

  try {
    console.log("Using CURL to bypass SDK limitations...");
    // Using gemini-pro (the most stable fallback)
    const cmd = `curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}" \
      -H "Content-Type: application/json" \
      -X POST \
      -d '${JSON.stringify(payload)}'`;
    
    const response = JSON.parse(execSync(cmd).toString());
    
    if (response.error) {
      throw new Error(response.error.message);
    }

    const content = response.candidates[0].content.parts[0].text;
    const filename = `${new Date().toISOString().split('T')[0]}-iptv-guide-2026.md`;
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
    fs.writeFileSync(path.join(blogDir, filename), content);
    
    console.log(`SUCCESS: Manual CURL generation succeeded! Created ${filename}`);
  } catch (err) {
    console.error("CURL ERROR:", err.message);
    process.exit(1);
  }
}

generateArticle();
