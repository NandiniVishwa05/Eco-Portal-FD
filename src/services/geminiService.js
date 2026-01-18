import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });

export const getAIInsight = async (topic, context) => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert environmental scientist and behavioral economist. 
      Provide a short, 2-3 sentence insight or encouraging tip about the following topic: "${topic}".
      Context: ${context}.
      Keep the tone professional yet motivating. Focus on the impact of individual choice.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Insight currently unavailable. Keep making green choices!";
  } catch (error) {
    console.error("Error fetching AI insight:", error);
    return "Our AI is currently taking a nap to save energy. Check back later!";
  }
};

export const getSimulatedAdvice = async (uses, scrubbers) => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
          The user has used a reusable bag ${uses} times this month and purchased ${scrubbers} natural coir scrubbers.
          Based on this data, provide a short, enthusiastic 2-sentence feedback message encouraging them to continue or improve.
          Mention "EcoPoints" as a reward.
        `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Great job! Keep racking up those EcoPoints!";
  } catch (error) {
    console.error("Error fetching AI advice:", error);
    return "Great job! Your eco-friendly actions are making a difference.";
  }
}