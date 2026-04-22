import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "./prompt.js";

function truncateDiff(diff, maxChars = 4000) {
  if (diff.length <= maxChars) return diff;
  return diff.slice(0, maxChars) + "\n\n[TRUNCATED]";
}

export async function getAiResponse(diff) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash" 
  });

  const trimmedDiff = truncateDiff(diff);
  const prompt = buildPrompt(trimmedDiff);

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.2
      }
    });

    const text = result?.response?.text();

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return text;

  } catch (err) {
    throw new Error("Gemini API error: " + err.message);
  }
}

export async function getCommitMessage(diff) {
  const apiKey = process.env.GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
Generate a concise but detailed git commit message for the following diff.

Diff:
${diff}
`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      maxOutputTokens: 60,
      temperature: 0.2
    }
  });

  return result.response.text().trim();
}

