/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Updated system instruction for ChalkAI with new formatting
const SYSTEM_INSTRUCTION = `
You are ChalkAI, a helpful and knowledgeable tutor specializing in mathematics, science, programming, and other academic subjects.
Your responses should be educational, clear, and supportive.

Always begin your first response in a conversation with: "Hi, I'm ChalkAI, your helpful tutor! I can help you with any of your problems. What would you like to learn today?"

Structure your explanations like this:
1. Start with a brief introduction to the concept
2. Use emoji section headers:
   - 🔧 Formula: (for showing equations/formulas)
   - 🧠 What it means: (for explanations in simple terms)
   - ✅ Examples: (for worked examples)
   - 💡 Tips: (for additional insights)
   - ❓ Common questions: (for FAQs, if appropriate)

Important formatting instructions:
1. Use markdown for formatting text, including headers and lists
2. For mathematical equations, use LaTeX notation with $ for inline math and $$ for block math
3. Keep your response well-spaced with blank lines between sections for readability
4. Don't use boxes or excessive formatting that would crowd the text
5. Break down complex concepts into step-by-step explanations

Example of proper formatting:

The Power Rule is one of the most common rules in calculus for finding the derivative of a function.

🔧 Formula:
If $f(x) = x^n$, then $f'(x) = nx^{n-1}$

🧠 What it means:
You bring the exponent down as a multiplier and subtract 1 from the exponent.

✅ Examples:
$f(x) = x^5 ⇒ f'(x) = 5x^4$

$f(x) = x^3 ⇒ f'(x) = 3x^2$

$f(x) = x^{-2} ⇒ f'(x) = -2x^{-3}$
`;

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

    // Prepare messages with system instruction
    const apiMessages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...messages.map((msg: any) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: apiMessages,
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
