"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Container,
} from "@mui/material";
import Link from "next/link";

interface Flashcard {
  question: string;
  answer: string;
}

export default function CreateFlashcards() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");

  const handleAddCard = () => {
    if (currentQuestion.trim() && currentAnswer.trim()) {
      setCards([
        ...cards,
        {
          question: currentQuestion,
          answer: currentAnswer,
        },
      ]);
      setCurrentQuestion("");
      setCurrentAnswer("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1E8] py-10 px-6 md:px-10 font-satoshi">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4954E0] mb-4 font-satoshi">
            Create Flashcards
          </h1>
          <p className="text-lg text-[#4954E0] opacity-70 max-w-2xl font-satoshi">
            Create and customize your own flashcard set for effective studying
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
                placeholder="e.g., Chemistry Fundamentals"
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
          </div>
        </div>

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
            Add New Card
          </Typography>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="question"
                className="block text-[#4954E0] font-medium mb-2 font-satoshi"
              >
                Question
              </label>
              <TextField
                id="question"
                fullWidth
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
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
                placeholder="Enter the question for this flashcard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="block text-[#4954E0] font-medium mb-2 font-satoshi"
              >
                Answer
              </label>
              <TextField
                id="answer"
                fullWidth
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
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
                placeholder="Enter the answer for this flashcard"
                multiline
                rows={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-2">
              <Button
                variant="contained"
                onClick={handleAddCard}
                disabled={!currentQuestion.trim() || !currentAnswer.trim()}
                sx={{
                  backgroundColor: "#4954E0",
                  borderRadius: "0.5rem",
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: "500",
                  textTransform: "none",
                  padding: "0.5rem 1.5rem",
                  "&:hover": {
                    backgroundColor: "rgba(73, 84, 224, 0.9)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(73, 84, 224, 0.4)",
                    color: "white",
                  },
                }}
              >
                Add Card
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: "700",
                color: "#4954E0",
              }}
            >
              Cards ({cards.length})
            </Typography>

            {cards.length > 0 && (
              <Box
                sx={{
                  backgroundColor: "rgba(73, 84, 224, 0.1)",
                  borderRadius: "9999px",
                  px: 2,
                  py: 0.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "var(--font-satoshi)",
                    color: "#4954E0",
                    fontWeight: "500",
                  }}
                >
                  {cards.length} {cards.length === 1 ? "card" : "cards"} created
                </Typography>
              </Box>
            )}
          </div>

          {cards.length === 0 ? (
            <div className="border-2 border-dashed border-[#4954E0]/30 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-[#4954E0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#4954E0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="text-[#4954E0]/70 font-satoshi">
                No cards yet. Start by adding your first flashcard.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cards.map((card, index) => (
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
                    <Button
                      size="small"
                      sx={{
                        minWidth: "auto",
                        padding: "0.25rem",
                        color: "rgba(73, 84, 224, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(73, 84, 224, 0.1)",
                          color: "#4954E0",
                        },
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </Button>
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
          )}

          {cards.length > 0 && (
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
                Preview Cards
              </Button>
            </Box>
          )}
        </div>

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
