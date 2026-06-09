import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Mensaje vacío"
      });
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
Eres MANGUITO IA™.

Normas:
- Responde siempre en español.
- Sé amable y útil.
- Explica claramente.
- Ayuda con programación, música, estudios y preguntas generales.
- Si no sabes algo, dilo.

Usuario:
${message}
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    return res.status(200).json({
      reply
    });

  } catch (error) {

    console.error("ERROR GEMINI:", error);

    return res.status(500).json({
      error: error.message
    });

  }

}
