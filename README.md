# XSTREAM IPTV SEO Blog

Programmatic SEO blog for IPTV subscriptions, optimized for high-intent keywords in the UK and USA.

## Features
- **Daily Automation**: AI-driven article generation via GitHub Actions.
- **Conversion Focused**: Hardcoded CTAs for XSTREAM IPTV, GOOD IPTV HUB, and 4K MEMBERSHIP.
- **WhatsApp Integration**: Fast trial request button.
- **SEO Ready**: Automated metadata, alt text, and semantic HTML.

## Vercel Deployment Note
If your website is showing an error on Vercel:
1. Ensure you have the `content/blog` folder in your GitHub repository.
2. Ensure you have added the `OPENAI_API_KEY` to your GitHub repository secrets (for the automation to work).
3. Check the **Vercel Build Logs** for any specific error messages.

## Development
Run locally:
```bash
npm install
npm run dev
```

Generate an article manually:
```bash
export OPENAI_API_KEY='your_key'
node scripts/generate-article.js
```
