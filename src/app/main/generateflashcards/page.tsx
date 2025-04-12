'use client';

import { useState } from 'react';
import {
    Container,
    TextField,
    Slider,
    Button,
    Typography,
    Box,
    Card,
} from '@mui/material';

import OpenAI from 'openai';

interface Flashcard {
    question: string;
    answer: string;
}

export default function GenerateFlashcards() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cardCount, setCardCount] = useState<number>(5);
    const [prompt, setPrompt] = useState('');
    const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        try {
            setIsLoading(true);
            
            const openai = new OpenAI({
                apiKey: "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",
                dangerouslyAllowBrowser: true
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
                        content: "You are a helpful assistant that generates educational flashcards. Always respond with valid JSON arrays."
                    },
                    {
                        role: "user",
                        content: systemPrompt
                    }
                ],
                model: "gpt-3.5-turbo",
                temperature: 0.7,
                response_format: { type: "json_object" } // Ensure JSON response
            });
    
            const response = completion.choices[0].message.content;
            if (!response) throw new Error('No response from OpenAI');
    
            let cards: Flashcard[];
            try {
                // Clean the response string before parsing
                const cleanResponse = response.trim().replace(/```json\n|\n```/g, '');
                const parsedResponse = JSON.parse(cleanResponse);
                
                // Handle both direct array responses and nested arrays
                cards = Array.isArray(parsedResponse) ? parsedResponse : parsedResponse.flashcards;
                
                if (!Array.isArray(cards)) {
                    throw new Error('Invalid response format: expected array of flashcards');
                }
    
                // Validate each card has required fields
                cards = cards.filter(card => 
                    card && 
                    typeof card.question === 'string' && 
                    typeof card.answer === 'string'
                );
    
                if (cards.length === 0) {
                    throw new Error('No valid flashcards in response');
                }
    
                setGeneratedCards(cards);
            } catch (e) {
                console.error('Failed to parse OpenAI response:', e);
                throw new Error('Failed to parse AI response into valid flashcards');
            }
        } catch (error) {
            console.error('Error generating flashcards:', error);
            alert(error instanceof Error ? error.message : 'Failed to generate flashcards');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Generate Flashcards
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
                    sx={{ mb: 4 }}
                />

                <Typography gutterBottom>
                    Number of Flashcards: {cardCount}
                </Typography>
                <Slider
                    value={cardCount}
                    onChange={(_, newValue) => setCardCount(newValue as number)}
                    min={1}
                    max={20}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ mb: 4 }}
                />

                <TextField
                    fullWidth
                    label="What would you like to learn?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    placeholder="Enter your topic or specific instructions for generating flashcards..."
                />

                <Button
                    variant="contained"
                    onClick={handleGenerate}
                    disabled={!title || !prompt || isLoading}
                    sx={{ mb: 4 }}
                >
                    {isLoading ? 'Generating...' : 'Generate Flashcards'}
                </Button>
            </Box>

            {generatedCards.length > 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Generated Flashcards
                    </Typography>
                    {generatedCards.map((card, index) => (
                        <Card key={index} sx={{ mb: 2, p: 2 }}>
                            <Typography variant="subtitle1">
                                Question: {card.question}
                            </Typography>
                            <Typography variant="subtitle1">
                                Answer: {card.answer}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
}