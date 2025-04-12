"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Slider,
  Button,
  Typography,
  Box,
  Card,
} from "@mui/material";

import OpenAI from "openai";

interface Flashcard {
  question: string;
  answer: string;
}

export default function GenerateFlashcards() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cardCount, setCardCount] = useState<number>(5);
  const [prompt, setPrompt] = useState("");
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);

      const openai = new OpenAI({
        apiKey:
            process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

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
      if (!response) throw new Error("No response from OpenAI");

      let cards: Flashcard[];
      try {
        // Clean the response string before parsing
        const cleanResponse = response.trim().replace(/```json\n|\n```/g, "");
        const parsedResponse = JSON.parse(cleanResponse);

        // Handle both direct array responses and nested arrays
        cards = Array.isArray(parsedResponse)
          ? parsedResponse
          : parsedResponse.flashcards;

        if (!Array.isArray(cards)) {
          throw new Error(
            "Invalid response format: expected array of flashcards"
          );
        }

        // Validate each card has required fields
        cards = cards.filter(
          (card) =>
            card &&
            typeof card.question === "string" &&
            typeof card.answer === "string"
        );

        if (cards.length === 0) {
          throw new Error("No valid flashcards in response");
        }

        setGeneratedCards(cards);
      } catch (e) {
        console.error("Failed to parse OpenAI response:", e);
        throw new Error("Failed to parse AI response into valid flashcards");
      }
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert(
        error instanceof Error ? error.message : "Failed to generate flashcards"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1E8] py-10 px-6 md:px-10 font-satoshi">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4954E0] mb-4 font-satoshi">
            Generate Flashcards
          </h1>
          <p className="text-lg text-[#4954E0] opacity-70 max-w-2xl font-satoshi">
            Let AI create personalized flashcards based on any topic you want to
            learn
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-[#4954E0] font-medium mb-2 font-satoshi"
              >
                Set Title
              </label>
              <TextField
                id="title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  mb: 0,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.5rem",
                    fontFamily: "var(--font-satoshi)",
                    "& fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.5)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "var(--font-satoshi)",
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "var(--font-satoshi)",
                  },
                }}
                placeholder="e.g., Biology Fundamentals"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-[#4954E0] font-medium mb-2 font-satoshi"
              >
                Description
              </label>
              <TextField
                id="description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  mb: 0,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.5rem",
                    fontFamily: "var(--font-satoshi)",
                    "& fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.5)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "var(--font-satoshi)",
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "var(--font-satoshi)",
                  },
                }}
                placeholder="A brief description of your flashcard set"
                multiline
                rows={3}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div>
              <label
                htmlFor="cardCount"
                className="block text-[#4954E0] font-medium mb-2 font-satoshi"
              >
                Number of Flashcards: {cardCount}
              </label>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={cardCount}
                  onChange={(_, newValue) => setCardCount(newValue as number)}
                  min={1}
                  max={20}
                  marks
                  valueLabelDisplay="auto"
                  sx={{
                    color: "#4954E0",
                    "& .MuiSlider-thumb": {
                      width: 16,
                      height: 16,
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "rgba(73, 84, 224, 0.2)",
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#4954E0",
                    },
                  }}
                />
              </Box>
            </div>

            <div>
              <label
                htmlFor="prompt"
                className="block text-[#4954E0] font-medium mb-2 font-satoshi"
              >
                What would you like to learn?
              </label>
              <TextField
                id="prompt"
                fullWidth
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{
                  mb: 0,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.5rem",
                    fontFamily: "var(--font-satoshi)",
                    "& fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(73, 84, 224, 0.5)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "var(--font-satoshi)",
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "var(--font-satoshi)",
                  },
                }}
                placeholder="Enter your topic or specific instructions for generating flashcards..."
                multiline
                rows={4}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-2">
              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={!title || !prompt || isLoading}
                sx={{
                  backgroundColor: "#4954E0",
                  borderRadius: "0.5rem",
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "1rem",
                  fontWeight: "500",
                  padding: "0.75rem 1.5rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(73, 84, 224, 0.9)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(73, 84, 224, 0.4)",
                    color: "white",
                  },
                }}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Flashcards"
                )}
              </Button>
            </div>
          </div>
        </div>

        {generatedCards.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: "700",
                color: "#4954E0",
                mb: 3,
              }}
            >
              Generated Flashcards
            </Typography>
            <div className="space-y-4">
              {generatedCards.map((card, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(73, 84, 224, 0.2)",
                    boxShadow: "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(73, 84, 224, 0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: "var(--font-satoshi)",
                        fontWeight: "500",
                        color: "#4954E0",
                      }}
                    >
                      Card {index + 1}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "rgba(73, 84, 224, 0.1)",
                        borderRadius: "9999px",
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "var(--font-satoshi)",
                          color: "#4954E0",
                        }}
                      >
                        Flashcard
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "rgba(73, 84, 224, 0.05)",
                        borderRadius: "0.5rem",
                        p: 1.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: "var(--font-satoshi)",
                          fontWeight: "500",
                          color: "#4954E0",
                          mb: 0.5,
                        }}
                      >
                        Question:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "var(--font-satoshi)",
                          color: "rgba(73, 84, 224, 0.8)",
                        }}
                      >
                        {card.question}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "rgba(73, 84, 224, 0.05)",
                        borderRadius: "0.5rem",
                        p: 1.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: "var(--font-satoshi)",
                          fontWeight: "500",
                          color: "#4954E0",
                          mb: 0.5,
                        }}
                      >
                        Answer:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "var(--font-satoshi)",
                          color: "rgba(73, 84, 224, 0.8)",
                        }}
                      >
                        {card.answer}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </div>

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4954E0",
                  borderRadius: "0.5rem",
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: "500",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(73, 84, 224, 0.9)",
                  },
                }}
              >
                Save Flashcard Set
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#4954E0",
                  borderColor: "#4954E0",
                  borderRadius: "0.5rem",
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: "500",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(73, 84, 224, 0.1)",
                    borderColor: "#4954E0",
                  },
                }}
              >
                Edit Cards
              </Button>
            </Box>
          </div>
        )}

        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            href="/flashcards/create"
            startIcon={
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            sx={{
              color: "#4954E0",
              borderColor: "rgba(73, 84, 224, 0.3)",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              fontFamily: "var(--font-satoshi)",
              fontWeight: "500",
              textTransform: "none",
              px: 2,
              py: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#4954E0",
              },
            }}
          >
            Back to Create Options
          </Button>
        </Box>
      </div>
    </div>
  );
}
