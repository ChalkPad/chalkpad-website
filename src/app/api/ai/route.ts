/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Log for debugging
  console.log("API Route called");

  try {
    const body = await req.json();
    const { messages } = body;

    // Log API key presence (don't log the actual key)
    console.log("API Key exists:", !!process.env.OPENAI_API_KEY);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is missing");
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages.map((msg: any) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.content,
      })),
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Return the response
    return NextResponse.json({
      content:
        completion.choices[0].message.content ||
        "I'm not sure how to respond to that.",
    });
  } catch (error: any) {
    // Enhanced error logging
    console.error("OpenAI API error:", error);
    console.error("Error message:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }

    return NextResponse.json(
      {
        error: "An error occurred while getting a response.",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
