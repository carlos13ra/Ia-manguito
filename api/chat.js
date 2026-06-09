import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {

    const { message } = req.body;

    const response = await openai.responses.create({
      model: "gpt-5",
      input: `
Eres MANGUITO IA™.

Normas:
- Responde siempre en español.
- Sé útil y amigable.
- Explica claramente.
- Si no sabes algo, dilo.
- Ayuda con programación, música, estudios y preguntas generales.

Usuario:
${message}
`
    });

    res.status(200).json({
      reply: response.output_text
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

}
