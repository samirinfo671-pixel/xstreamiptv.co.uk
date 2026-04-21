import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function listModels() {
  const models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
    "gemini-1.0-pro",
    "gemini-pro"
  ];
  
  console.log("Starting deep scan of models...");
  
  for (const m of models) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      await model.generateContent("hi");
      console.log(`✅ WORKING: ${m}`);
      process.exit(0);
    } catch (e) {
      console.log(`❌ FAILED: ${m} - ${e.message}`);
    }
  }
}

listModels();
