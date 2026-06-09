import OpenAI from "openai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY no configurada en Vercel"
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Mensaje vacío"
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Eres MANGUITO IA™.

Normas:
- Responde siempre en español.
- Sé amable.
- Sé útil.
- Explica claramente.
- Ayuda con programación, música, estudios y preguntas generales.

Usuario:
${message}
`
    });

    const reply =
      response.output_text ||
      "No se recibió respuesta del modelo.";

    return res.status(200).json({
      reply
    });

  } catch (error) {

    console.error("ERROR MANGUITO IA:", error);

    return res.status(500).json({
      error: error.message || "Error desconocido"
    });

  }

}
