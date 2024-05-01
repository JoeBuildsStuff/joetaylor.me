import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const { message, model, temperature } = await req.json();

    const answerResponse = await openai.chat.completions.create({
      model: model,
      messages: [message],
      logprobs: true,
      top_logprobs: 4,
      temperature: temperature,
    });

    return new Response(JSON.stringify(answerResponse), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
