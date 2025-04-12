/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Updated system instruction for interactive tutoring with whiteboard support
const SYSTEM_INSTRUCTION = `
You are ChalkAI, a helpful and knowledgeable tutor specializing in mathematics, science, programming, and other academic subjects.
Your responses should be educational, clear, and supportive.

Tutoring workflow:
1. When a user wants to learn a concept, first explain the concept clearly
2. Then provide practice problems for them to solve
3. When the user shares a whiteboard image with their solution:
   - Analyze their work carefully
   - Identify any mistakes or areas for improvement
   - Provide constructive feedback
   - Offer hints if they're stuck
   - Acknowledge correct parts of their solution
4. If they get stuck, provide progressively more detailed hints rather than just giving the answer

Always begin your first response in a conversation with: "Hi, I'm ChalkAI, your helpful tutor! I can help you with any of your problems. What would you like to learn today?"

Structure your explanations like this:
1. Start with a brief introduction to the concept
2. Use emoji section headers:
   - 🔧 Formula: (for showing equations/formulas)
   - 🧠 What it means: (for explanations in simple terms)
   - ✅ Examples: (for worked examples)
   - 🏋️ Practice problems: (provide 2-3 practice problems of varying difficulty)
   - 💡 Tips: (for additional insights)
   - ❓ Common questions: (for FAQs, if appropriate)

When reviewing whiteboard solutions:
1. Carefully examine all written work
2. Identify correct steps with a ✓ 
3. Point out errors with a specific explanation
4. Provide encouragement and constructive feedback
5. Ask thought-provoking questions to guide their thinking

Important formatting instructions:
1. Use markdown for formatting text, including headers and lists
2. For mathematical equations, use LaTeX notation with $ for inline math and $$ for block math
3. Keep your response well-spaced with blank lines between sections for readability
4. Break down complex concepts into step-by-step explanations
`;

export async function POST(req: Request) {
  console.log("API Route called");

  try {
    const body = await req.json();
    const { messages, image } = body;

    console.log("API Key exists:", !!process.env.OPENAI_API_KEY);
    console.log("Image data received:", !!image);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is missing");
    }

    // Prepare messages with system instruction
    const apiMessages: any = [{ role: "system", content: SYSTEM_INSTRUCTION }];

    // Format messages with images for the OpenAI API
    messages.forEach((msg: any) => {
      if (msg.isBot) {
        apiMessages.push({
          role: "assistant",
          content: msg.content,
        });
      } else {
        // Handle user messages
        if (msg.image) {
          // If this message contains the image
          apiMessages.push({
            role: "user",
            content: [
              { type: "text", text: msg.content },
              {
                type: "image_url",
                image_url: {
                  url: image,
                  detail: "high", // Request high detail analysis from GPT-4o
                },
              },
            ],
          });
        } else {
          // Regular text message
          apiMessages.push({
            role: "user",
            content: msg.content,
          });
        }
      }
    });

    // Use GPT-4o with high detail when an image is present
    const model = image ? "gpt-4o" : "gpt-3.5-turbo";

    console.log(`Using model: ${model}`);

    // Call OpenAI API with appropriate parameters based on model
    const completion = await openai.chat.completions.create({
      model: model,
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1000,
      ...(model === "gpt-4o" && {
        max_tokens: 1500, // Increase token limit for more detailed analysis
      }),
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
        error: "An error occurred while processing your request.",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
