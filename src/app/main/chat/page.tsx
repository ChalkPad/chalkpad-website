/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Camera,
  ArrowLeft,
  ImageIcon,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import "katex/dist/katex.min.css";
import BoardContainer, {
  BoardContainerHandle,
} from "@/components/BoardContainer";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  image?: string; // Add image field to support whiteboard snapshots
}

const ChatBotPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [isWhiteboardCollapsed, setIsWhiteboardCollapsed] = useState(false);
  const [isWhiteboardFullScreen, setIsWhiteboardFullScreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const boardContainerRef = useRef<BoardContainerHandle>(null);

  const [showCamera, setShowCamera] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    // Check if camera is available
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setIsCameraAvailable(true))
      .catch(() => setIsCameraAvailable(false));
  }, []);

  // Add initial greeting when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: Message = {
        id: "greeting",
        content:
          "Hi, I'm ChalkAI, your helpful tutor! I can help you with any of your problems, especially math, science, and programming questions. What would you like to learn today?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([initialGreeting]);
    }
  }, []);

  // Rotate through quotes while thinking
  useEffect(() => {
    let quoteInterval: NodeJS.Timeout;

    if (isThinking) {
      setCurrentQuote(
        thinkingQuotes[Math.floor(Math.random() * thinkingQuotes.length)]
      );

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

  // Add these functions after your other handler functions

  const startCamera = async () => {
    setShowCamera(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera by default
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Failed to access camera. Please check camera permissions.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to data URL (JPEG format with 0.8 quality)
      const photoData = canvas.toDataURL("image/jpeg", 0.8);

      // Create new message with the captured photo
      const newMessage: Message = {
        id: Date.now().toString(),
        content:
          "I've taken a photo to share with you. Can you analyze this image?",
        isBot: false,
        timestamp: new Date(),
        image: photoData,
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsThinking(true);

      // Send photo to AI
      handleSendWithImage(newMessage, photoData);

      // Stop the camera
      stopCamera();
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

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
        image: msg.image,
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

  // Handle capturing and sending whiteboard
  // Update the handleCaptureWhiteboard function:

  const handleCaptureWhiteboard = () => {
    if (boardContainerRef.current) {
      try {
        const imageData = boardContainerRef.current.captureWhiteboard();

        if (imageData) {
          // Create new message with whiteboard image and better instructions
          const newMessage: Message = {
            id: Date.now().toString(),
            content:
              "Here's my solution from the whiteboard. Please analyze it carefully and tell me if I'm on the right track:",
            isBot: false,
            timestamp: new Date(),
            image: imageData,
          };

          setMessages((prev) => [...prev, newMessage]);
          setIsThinking(true);

          // Call AI with the image data
          handleSendWithImage(newMessage, imageData);
        }
      } catch (error) {
        console.error("Error capturing whiteboard:", error);
        alert("Failed to capture whiteboard. Please try again.");
      }
    }
  };
  // Modified to handle sending messages with images
  // Modified to handle sending messages with images
  const handleSendWithImage = async (message: Message, imageData: string) => {
    try {
      const chatHistory = [...messages, message].map((msg) => ({
        content: msg.content,
        isBot: msg.isBot,
        image: msg.image ? true : undefined, // Just send a flag that image exists, not the full data
      }));

      // Log image size for debugging
      console.log("Image size (KB):", Math.round(imageData.length / 1024));

      // Call your API route with image data
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: chatHistory,
          image: imageData, // The full image data
          format: "jpeg", // Specify the image format
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      // Process response and add bot message
      const data = await response.json();

      const botResponse: Message = {
        id: Date.now().toString(),
        content: data.content,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error calling AI with image:", error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Sorry, I encountered an error processing your whiteboard: ${
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
      <Link href="/main/home" className="absolute top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-background/80 backdrop-blur"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
      </Link>
      {/* Chat Section - hide when whiteboard is fullscreen */}
      {!isWhiteboardFullScreen && (
        <div
          className={`${
            isChatCollapsed
              ? "w-[50px]"
              : isWhiteboardCollapsed
              ? "w-[calc(100%-50px)]"
              : "w-1/2"
          } 
                border-r transition-all duration-300 relative flex flex-col`}
        >
          {/* Collapse Button for Chat */}
          <button
            onClick={() => setIsChatCollapsed(!isChatCollapsed)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-primary text-primary-foreground 
                        rounded-full p-1 shadow-md hover:bg-primary/90 transition-colors"
            aria-label={isChatCollapsed ? "Expand chat" : "Collapse chat"}
          >
            {isChatCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>

          {isChatCollapsed ? (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-primary font-semibold transform -rotate-90">
                Chat
              </span>
            </div>
          ) : (
            <Card className="h-full flex flex-col overflow-hidden border-none rounded-none shadow-none">
              <CardContent className="flex-1 p-0 flex flex-col h-full">
                <ScrollArea
                  className="flex-1 h-[calc(100%-70px)] overflow-y-auto"
                  type="always"
                >
                  <div className="p-4">
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
                                  className={`px-4 py-3 rounded-lg ${
                                    message.isBot
                                      ? "bg-muted text-foreground"
                                      : "bg-primary text-white"
                                  }`}
                                >
                                  {message.isBot ? (
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                      <ReactMarkdown
                                        remarkPlugins={[remarkGfm, remarkMath]}
                                        rehypePlugins={[rehypeKatex, rehypeRaw]}
                                      >
                                        {message.content}
                                      </ReactMarkdown>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-sm">
                                        {message.content}
                                      </p>
                                      {message.image && (
                                        <div className="mt-2">
                                          <img
                                            src={message.image}
                                            alt="Whiteboard capture"
                                            className="max-w-full rounded border border-white/20"
                                          />
                                        </div>
                                      )}
                                    </>
                                  )}
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
                                    <p className="text-sm mr-2">
                                      {currentQuote}
                                    </p>
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
                  </div>
                </ScrollArea>

                <div className="p-4 border-t mt-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex gap-2"
                  >
                    {isCameraAvailable && (
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={startCamera}
                        className="hover:bg-muted"
                        disabled={isThinking}
                        title="Take photo"
                      >
                        <ImageIcon size={18} />
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={handleCaptureWhiteboard}
                      className="hover:bg-muted"
                      disabled={isThinking || isWhiteboardCollapsed}
                      title="Capture whiteboard"
                    >
                      <Camera size={18} />
                    </Button>
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
          )}
        </div>
      )}

      {/* Whiteboard Section */}
      <div
        className={`${
          isWhiteboardFullScreen
            ? "w-full h-full"
            : isWhiteboardCollapsed
            ? "w-[50px]"
            : isChatCollapsed
            ? "w-[calc(100%-50px)]"
            : "w-1/2"
        } 
                transition-all duration-300 relative bg-muted/20`}
      >
        {/* Collapse Button for Whiteboard - hide when fullscreen */}
        {!isWhiteboardFullScreen && (
          <button
            onClick={() => setIsWhiteboardCollapsed(!isWhiteboardCollapsed)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-primary text-primary-foreground 
                        rounded-full p-1 shadow-md hover:bg-primary/90 transition-colors"
            aria-label={
              isWhiteboardCollapsed
                ? "Expand whiteboard"
                : "Collapse whiteboard"
            }
          >
            {isWhiteboardCollapsed ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        )}

        {/* Fullscreen Toggle Button */}
        <button
          onClick={() => setIsWhiteboardFullScreen(!isWhiteboardFullScreen)}
          className="absolute right-4 top-4 z-10 bg-primary text-primary-foreground 
                  rounded-full p-2 shadow-md hover:bg-primary/90 transition-colors"
          aria-label={
            isWhiteboardFullScreen ? "Exit fullscreen" : "Enter fullscreen"
          }
        >
          {isWhiteboardFullScreen ? (
            <Minimize2 size={16} />
          ) : (
            <Maximize2 size={16} />
          )}
        </button>

        {isWhiteboardCollapsed && !isWhiteboardFullScreen ? (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-primary font-semibold transform -rotate-90">
              Whiteboard
            </span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <BoardContainer ref={boardContainerRef} />
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Take a Photo</h3>
              <Button variant="ghost" size="sm" onClick={stopCamera}>
                &times;
              </Button>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex justify-center">
              <Button onClick={capturePhoto}>Take Photo</Button>
            </div>

            {/* Hidden canvas for capturing */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotPage;
