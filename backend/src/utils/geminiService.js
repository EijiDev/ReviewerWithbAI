import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const MODEL_PRIMARY = "gemini-2.0-flash";
const MODEL_FALLBACK = "gemini-2.5-flash";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const SYSTEM_PROMPT = `
Ikaw ay isang professinal na teacher na nagpapaliwanag in Taglish.

GOAL:
Mag-explain na parang kinukwento mo lang sa kaibigan mo but still in professional way.
Chill, friendly, at madaling intindihin.

STYLE RULES:

1. FEYNMAN STYLE
Explain like 18 years old ang kausap.
Simple words lang.
Kapag may technical term, explain agad in simple way.
Gumamit ng examples.

2. CASUAL TAGLISH
Natural mix ng Filipino at English.
Parang normal na usapan.
Huwag tunog textbook.
Huwag formal.
Huwag gumamit ng malalalim na Tagalog o English words.
Keep it simple and everyday language lang.

3. WRITING STYLE
Short sentences.
Break into small paragraphs.
Parang nagkukwento lang.
May konting energy.
Hindi robotic.
Hindi pang-report.

If the explanation sounds formal or deep,
rewrite it immediately in a simpler and more casual way.

EXAMPLE NG TAMANG STYLE:

"So basically, ang HTML ay parang skeleton ng website. Kumbaga sa bahay, siya yung poste at pader. Pero pag HTML lang, mukhang payat and walang kulay — boring! Kaya diyan papasok ang CSS para lagyan ng kulay and design."
`;

async function generateWithFallback(
  prompt,
  useModel = MODEL_PRIMARY,
  retries = 2,
) {
  const model = genAI.getGenerativeModel({
    model: useModel,
    generationConfig: { responseMimeType: "application/json" },
  });

  try {
    return await model.generateContent(prompt);
  } catch (error) {
    console.error(`Attempt with ${useModel} failed:`, error.message);

    if (
      (error.status === 429 || error.status === 404) &&
      useModel === MODEL_PRIMARY
    ) {
      console.warn("Switching to fallback model...");
      return generateWithFallback(prompt, MODEL_FALLBACK, retries);
    }

    if ((error.status === 429 || error.status === 503) && retries > 0) {
      await new Promise((res) => setTimeout(res, 30000));
      return generateWithFallback(prompt, useModel, retries - 1);
    }

    throw error;
  }
}

export async function generateReview(extractedText, fileName) {
  const cleanText = extractedText
    .replace(/\s+/g, " ")
    .replace(/Slide \d+/g, "")
    .trim()
    .slice(0, 10000);

  const prompt = `
${SYSTEM_PROMPT}
Context from file "${fileName}":
${cleanText}

Generate a COMPLETE REVIEW in this JSON format:
{
  "title": "Title of the powerpoint",
  "introduction": "1-2 sentence intro",
  "explanation": "Every keypoints explain it in Feynman style in Taglish the sentence is based on the powerpoint keypoint and also do not use deep tagalog words"
  "keyPoints": [{"point": "title", "explanation": "1 and half sentence and also do not use deep tagalog and english words"}],
  "quizQuestions": [
    {
      "question": "in english",
      "choices": ["A", "B", "C", "D"],
      "answer": "exact text of choice in english",
      "explanation": "why this is correct"
    }
  ]
}

Note:
- 15 key points
- 15 quiz questions
- Taglish only
`;

  try {
    const result = await generateWithFallback(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("❌ Final Service Error:", error);
    throw new Error(
      "Quota Exceeded: Masyadong maraming requests today. Try again tomorrow or use a new API key.",
    );
  }
}

export async function askFollowUp(question, originalText) {
  const cleanText = originalText.replace(/\s+/g, " ").slice(0, 5000);
  const prompt = `${SYSTEM_PROMPT}\nContext: ${cleanText}\nQuestion: "${question}"\nAnswer in Taglish (Feynman technique).`;

  try {
    const result = await generateWithFallback(prompt);
    const text = result.response.text();

    const parsed = JSON.parse(text);
    return parsed.response;

  } catch (error) {
    return "Medyo overloaded ang servers. Try again later, friend!";
  }
}