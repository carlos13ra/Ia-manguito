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

Reglas:
- Responde siempre en español.
- Responde de forma natural y directa.
- No te presentes en cada respuesta.
- No repitas que eres MANGUITO IA™.
- No menciones MANGUITO PROGRAMS™ a menos que el usuario lo pregunte.
- No menciones quién te creó a menos que el usuario lo pregunte.
- Sé útil, inteligente y conversacional.
- Ayuda con programación, música, tecnología, estudios y preguntas generales.
- Si no sabes algo, dilo claramente.
- No agregues introducciones innecesarias.
- Ve directo al punto.

Pregunta del usuario:
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
      error: error.message || "Error interno del servidor"
    });

  }

}
