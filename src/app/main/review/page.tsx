'use client';

import { useState } from 'react';
import { Button, Card, Typography, Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface Flashcard {
  question: string;
  answer: string;
}

// Sample data - replace with your actual data fetching logic
const sampleFlashcards: Flashcard[] = [
  { question: "What is React?", answer: "A JavaScript library for building user interfaces" },
  { question: "What is JSX?", answer: "A syntax extension for JavaScript that allows you to write HTML-like code" },
  // Add more sample cards as needed
];

export default function ReviewFlashcards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards] = useState<Flashcard[]>(sampleFlashcards);

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-[#F1F1E8] py-10 px-6 md:px-10 font-satoshi">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4954E0] mb-4">
            Review Flashcards
          </h1>
          <p className="text-lg text-[#4954E0] opacity-70">
            Card {currentCardIndex + 1} of {cards.length}
          </p>
        </div>

        {/* Flashcard */}
        <div className="mb-8 flex justify-center">
          <Card
            onClick={handleFlip}
            sx={{
              width: '100%',
              maxWidth: 600,
              height: 300,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.6s',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
              backgroundColor: '#ffffff',
              '&:hover': {
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
          >
            <div
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                transition: 'transform 0.6s',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" component="div">
                {isFlipped ? cards[currentCardIndex].answer : cards[currentCardIndex].question}
              </Typography>
            </div>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <IconButton 
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
            sx={{ bgcolor: '#4954E0', color: 'white', '&:hover': { bgcolor: '#3A43B0' } }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={currentCardIndex === cards.length - 1}
            sx={{ bgcolor: '#4954E0', color: 'white', '&:hover': { bgcolor: '#3A43B0' } }}
          >
            <ChevronRight />
          </IconButton>
        </div>

        {/* Flashcard List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#4954E0] mb-4">
            All Flashcards
          </h2>
          <div className="space-y-4">
            {cards.map((card, index) => (
              <Card 
                key={index}
                sx={{ 
                  p: 2,
                  cursor: 'pointer',
                  bgcolor: currentCardIndex === index ? '#f0f2ff' : 'white',
                }}
                onClick={() => {
                  setCurrentCardIndex(index);
                  setIsFlipped(false);
                }}
              >
                <Typography variant="subtitle1" color="textPrimary">
                  {index + 1}. {card.question}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}