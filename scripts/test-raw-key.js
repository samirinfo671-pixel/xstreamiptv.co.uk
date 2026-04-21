import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

async function testKey() {
  try {
    // Force API version v1
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });
    const result = await model.generateContent("hello");
    console.log("SUCCESS on v1!", result.response.text());
  } catch (err) {
    console.log("REAL ERROR on v1:", err.message);
  }
}

testKey();
