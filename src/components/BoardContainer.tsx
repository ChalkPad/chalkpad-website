/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import WhiteBoard, { BoardHandle } from "./WhiteBoard";
import DrawingMenu from "./DrawingMenu";

export interface DrawingPen {
  color: string;
  size: number;
}

export interface BoardContainerHandle {
  captureWhiteboard: () => string | null;
  clearWhiteboard: () => void; // Add this new method
}

const BoardContainer = forwardRef<BoardContainerHandle, {}>((props, ref) => {
  const [drawingPen, setDrawingPen] = useState<DrawingPen>({
    color: "#000000",
    size: 5,
  });

  const whiteboardRef = useRef<BoardHandle>(null);

  // Update useImperativeHandle to expose the clear method
  useImperativeHandle(ref, () => ({
    captureWhiteboard: () => {
      if (whiteboardRef.current) {
        return whiteboardRef.current.captureWhiteboard(0.9);
      }
      return null;
    },
    clearWhiteboard: () => {
      if (whiteboardRef.current) {
        whiteboardRef.current.clearWhiteboard();
      }
    },
  }));

  // Create a handler function to clear the whiteboard
  const handleClearWhiteboard = () => {
    if (whiteboardRef.current) {
      whiteboardRef.current.clearWhiteboard();
    }
  };

  return (
    <section className="relative flex flex-col bg-white w-full h-screen">
      {/* WhiteBoard takes the remaining vertical space */}
      <div className="flex-grow">
        <WhiteBoard ref={whiteboardRef} drawingPen={drawingPen} />
      </div>
      {/* Pass the clear handler to DrawingMenu */}
      <DrawingMenu
        drawingPen={drawingPen}
        setDrawingPen={setDrawingPen}
        onClear={handleClearWhiteboard}
      />
    </section>
  );
});

export default BoardContainer;
