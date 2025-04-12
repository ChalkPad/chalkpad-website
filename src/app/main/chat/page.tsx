"use client";

import React, { useState, useRef, useEffect } from "react";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Mic,
  FileImage,
  Paperclip,
  Eraser,
  PenTool,
  X,
} from "lucide-react";
import BoardContainer from "@/components/BoardContainer";

// Message type definition
interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! How can I help with your math problems today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isWhiteboardVisible, setIsWhiteboardVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const boardContainerRef =
    useRef<React.ElementRef<typeof BoardContainer>>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand your question. Let me help you solve this problem!",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  // Handle file upload click
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log("File selected:", files[0].name);

      // You would normally upload the file to your server here
      // and then add a message indicating the file was shared

      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `Uploaded: ${files[0].name}`,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fileMessage]);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle whiteboard visibility
  const toggleWhiteboard = () => {
    setIsWhiteboardVisible(!isWhiteboardVisible);
  };

  // Capture whiteboard content and send as a message
  const captureAndSendWhiteboard = () => {
    if (boardContainerRef.current) {
      const imageData = boardContainerRef.current.captureWhiteboard();
      if (imageData) {
        // Create a message with the whiteboard content
        const whiteboardMessage: Message = {
          id: Date.now().toString(),
          text: "Whiteboard diagram:",
          sender: "user",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, whiteboardMessage]);

        // Here you would typically send the imageData to your backend
        console.log(
          "Captured whiteboard data:",
          imageData.substring(0, 50) + "..."
        );

        // Hide the whiteboard after sending
        setIsWhiteboardVisible(false);
      }
    }
  };

  // Clear the whiteboard
  const clearWhiteboard = () => {
    if (boardContainerRef.current) {
      boardContainerRef.current.clearWhiteboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1E8] font-satoshi flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-5xl px-4 py-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#4954E0]">Math Assistant</h1>
          <p className="text-[#4954E0] opacity-70">
            Ask me anything about math or upload your work for help
          </p>
        </div>

        {/* Whiteboard (conditionally rendered) */}
        {isWhiteboardVisible && (
          <Card className="mb-6 bg-white shadow-sm rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="font-bold text-[#4954E0]">Whiteboard</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={clearWhiteboard}
                  variant="ghost"
                  className="h-9 w-9 p-0 rounded-full"
                >
                  <Eraser size={18} />
                </Button>
                <Button
                  onClick={captureAndSendWhiteboard}
                  className="bg-[#4954E0] text-white hover:bg-opacity-90"
                >
                  Send
                </Button>
                <Button
                  onClick={toggleWhiteboard}
                  variant="outline"
                  className="h-9 w-9 p-0 rounded-full border-gray-200"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
            <div className="h-[400px]">
              <BoardContainer ref={boardContainerRef} />
            </div>
          </Card>
        )}

        {/* Chat container */}
        <Card className="flex-1 bg-white shadow-sm rounded-2xl mb-4 flex flex-col overflow-hidden">
          {/* Messages area */}
          <ScrollArea className="flex-1 p-4 h-[calc(100vh-300px)]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-[#4954E0] text-white"
                        : "bg-gray-100 text-[#4954E0]"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="min-h-[50px] py-3 px-4 pr-12 rounded-xl border border-gray-200 focus:border-[#4954E0] focus:ring-[#4954E0]/30"
                />
                <div className="absolute right-3 bottom-3 flex space-x-2">
                  <button
                    onClick={handleFileUploadClick}
                    className="text-gray-400 hover:text-[#4954E0] transition-colors"
                  >
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                className="h-[50px] w-[50px] rounded-full bg-[#4954E0] text-white flex items-center justify-center p-0 hover:bg-opacity-90"
              >
                <Send size={20} />
              </Button>
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex space-x-6 bg-gray-100 rounded-full px-6 py-2">
                <button
                  className="text-[#4954E0] hover:text-opacity-80 transition-colors flex items-center space-x-1"
                  onClick={handleFileUploadClick}
                >
                  <FileImage size={20} />
                  <span className="text-sm font-medium">Image</span>
                </button>
                <button
                  className="text-[#4954E0] hover:text-opacity-80 transition-colors flex items-center space-x-1"
                  onClick={toggleWhiteboard}
                >
                  <PenTool size={20} />
                  <span className="text-sm font-medium">Whiteboard</span>
                </button>
                <button className="text-[#4954E0] hover:text-opacity-80 transition-colors flex items-center space-x-1">
                  <Mic size={20} />
                  <span className="text-sm font-medium">Voice</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
