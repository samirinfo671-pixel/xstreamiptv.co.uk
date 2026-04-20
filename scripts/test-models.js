import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function listModels() {
  try {
    // There isn't a direct listModels in the client SDK like this usually, 
    // but we can try common ones or just catch the error.
    console.log("Checking model availability for key...");
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];
    
    for (const m of models) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        await model.generateContent("test");
        console.log(`✅ Model ${m} is WORKING!`);
        process.exit(0);
      } catch (e) {
         console.log(`❌ Model ${m} failed: ${e.message}`);
      }
    }
  } catch (error) {
    console.error("List error:", error);
  }
}

listModels();
