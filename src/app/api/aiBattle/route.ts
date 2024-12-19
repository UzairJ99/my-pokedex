// NEXT
import { NextResponse } from "next/server";
// LLM
import Together from "together-ai";

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `How does ${prompt} perform in a battle against Pikachu? Answer in one sentence and mention who has the advantage.`,
        },
      ],
      model: "meta-llama/Llama-Vision-Free",
    });

    // const data = await response.json();
    const data = response?.choices[0]?.message?.content;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching LLM response:", error);
    return NextResponse.json(
      { error: "Failed to fetch LLM API data" },
      { status: 500 }
    );
  }
}
