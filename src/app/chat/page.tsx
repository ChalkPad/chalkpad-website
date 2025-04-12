"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const thinkingQuotes = [
    "Let me think about that...",
    "Analyzing your question...",
    "Gathering information...",
    "Drawing on the chalkboard of knowledge...",
    "Connecting the dots...",
    "Solving this problem step by step...",
    "Computing the best answer...",
    "Calculating possibilities...",
    "Finding the perfect explanation...",
  ];

  // Rotate through quotes while thinking
  useEffect(() => {
    let quoteInterval: NodeJS.Timeout;

    if (isThinking) {
      // Set initial quote
      setCurrentQuote(
        thinkingQuotes[Math.floor(Math.random() * thinkingQuotes.length)]
      );

      // Change quote every 3 seconds
      quoteInterval = setInterval(() => {
        setCurrentQuote(
          thinkingQuotes[Math.floor(Math.random() * thinkingQuotes.length)]
        );
      }, 3000);
    }

    return () => {
      if (quoteInterval) clearInterval(quoteInterval);
    };
  }, [isThinking]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message to chat
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsThinking(true);

    try {
      const chatHistory = [...messages, newMessage].map((msg) => ({
        content: msg.content,
        isBot: msg.isBot,
      }));

      // Call your API route
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();

      // Check if there's an error in the response
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      // Add bot response to chat
      const botResponse: Message = {
        id: Date.now().toString(),
        content: data.content,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error calling AI:", error);

      // Add error message with more details
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Sorry, I encountered an error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {/* Chat Section - Left Half */}
      <div className="w-1/2 border-r">
        <Card className="h-full flex flex-col overflow-hidden border-none rounded-none shadow-none">
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="bg-primary/10 rounded-full p-6 mb-4">
                    <Send size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-primary">
                    Start a conversation
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">
                    Type a message below to begin chatting with ChalkAI
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isBot ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div className="flex gap-2 max-w-[80%]">
                        {message.isBot && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/clear-logo.png"
                              alt="ChalkAI Assistant"
                            />
                            <AvatarFallback className="bg-primary/10">
                              <span className="text-xs text-primary font-semibold">
                                Chalk
                              </span>
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.isBot
                                ? "bg-muted text-foreground"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 px-2">
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Thinking indicator */}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[80%]">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/clear-logo.png"
                            alt="ChalkAI Assistant"
                          />
                          <AvatarFallback className="bg-primary/10">
                            <span className="text-xs text-primary font-semibold">
                              Chalk
                            </span>
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="px-4 py-2 rounded-lg bg-muted text-foreground">
                            <div className="flex items-center">
                              <p className="text-sm mr-2">{currentQuote}</p>
                              <span className="flex space-x-1">
                                <span
                                  className="h-2 w-2 bg-primary rounded-full animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></span>
                                <span
                                  className="h-2 w-2 bg-primary rounded-full animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></span>
                                <span
                                  className="h-2 w-2 bg-primary rounded-full animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></span>
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 px-2">
                            {formatTime(new Date())}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={scrollRef} />
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isThinking}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isThinking || !inputValue.trim()}
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Whiteboard Section - Right Half */}
      <div className="w-1/2 p-4 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Whiteboard</h2>
          <p className="text-muted-foreground">
            This area will contain the whiteboard component
          </p>
        </div>
      </div>
    </div>
  );
}
