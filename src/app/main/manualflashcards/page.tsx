'use client';

import { useState } from 'react';
import { Card, Button, TextField, Container, Box, Typography } from '@mui/material';

interface Flashcard {
    question: string;
    answer: string;
}

export default function CreateFlashcards() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');

    const handleAddCard = () => {
        if (currentQuestion.trim() && currentAnswer.trim()) {
            setCards([...cards, {
                question: currentQuestion,
                answer: currentAnswer
            }]);
            setCurrentQuestion('');
            setCurrentAnswer('');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Create New Flashcard Set
            </Typography>

            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label="Set Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={3}
                />
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Add New Card
                </Typography>
                <TextField
                    fullWidth
                    label="Question"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Answer"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button 
                    variant="contained" 
                    onClick={handleAddCard}
                    disabled={!currentQuestion.trim() || !currentAnswer.trim()}
                >
                    Add Card
                </Button>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Cards ({cards.length})
                </Typography>
                {cards.map((card, index) => (
                    <Card key={index} sx={{ mb: 2, p: 2 }}>
                        <Typography variant="subtitle1">Question: {card.question}</Typography>
                        <Typography variant="subtitle1">Answer: {card.answer}</Typography>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}