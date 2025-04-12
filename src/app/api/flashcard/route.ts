/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client on the server side
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, cardCount } = body;

    if (!prompt || !cardCount) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const systemPrompt = `Generate ${cardCount} flashcards about "${prompt}".
            Each flashcard should be a JSON object with "question" and "answer" fields.
            The response should be a valid JSON array of these objects.
            Example format: [{"question":"Q1","answer":"A1"},{"question":"Q2","answer":"A2"}]
            Keep answers concise and clear.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates educational flashcards. Always respond with valid JSON arrays.",
        },
        {
          role: "user",
          content: systemPrompt,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" }, // Ensure JSON response
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      return NextResponse.json(
        { error: "No response from OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ content: response });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while generating flashcards",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
