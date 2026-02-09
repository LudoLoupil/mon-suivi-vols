import OpenAI from "openai";

const DEFAULT_MODEL = process.env.DEFAULT_MODEL ?? "gpt-5-mini";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function hello() {
  const res = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [{ role: "user", content: "Bonjour" }],
  });
  console.log(res.choices[0].message.content);
}

hello().catch(console.error);
