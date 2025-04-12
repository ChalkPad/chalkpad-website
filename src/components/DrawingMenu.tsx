import React, { Dispatch, SetStateAction, useState } from "react";
import { DrawingPen } from "./BoardContainer";

// Update the DrawingMenuProp interface wherever it's defined
interface DrawingMenuProp {
  drawingPen: DrawingPen;
  setDrawingPen: Dispatch<SetStateAction<DrawingPen>>;
  onClear?: () => void; // Add this property (making it optional with ?)
}

const DrawingMenu = (props: DrawingMenuProp) => {
  const { drawingPen, setDrawingPen, onClear } = props;
  const [isEraserActive, setIsEraserActive] = useState<boolean>(false);

  // Toggle between drawing in black and eraser (white)
  const toggleEraser = () => {
    if (isEraserActive) {
      setDrawingPen((prev) => ({ ...prev, color: "#000000" }));
      setIsEraserActive(false);
    } else {
      setDrawingPen((prev) => ({ ...prev, color: "#ffffff" }));
      setIsEraserActive(true);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setDrawingPen((prev) => ({ ...prev, size: newSize }));
  };

  return (
    <div className="flex justify-center items-center p-2 bg-gray-100 border-t space-x-6">
      {/* Toggle Color / Eraser Button as a rounded circle */}
      <button
        onClick={toggleEraser}
        className="w-10 h-10 rounded-full border border-gray-400 focus:outline-none transition-colors duration-200"
        style={{
          backgroundColor: drawingPen.color,
        }}
        title={drawingPen.color === "#000000" ? "Black" : "Eraser"}
      >
        {/* You can optionally add an icon inside if desired */}
      </button>

      {/* Pen Size Slider */}
      <div className="flex items-center">
        <span className="mr-2 font-medium">Size:</span>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={drawingPen.size}
          onChange={handleSizeChange}
          className="w-32 h-2 bg-gray-300 rounded-full appearance-none opacity-80 hover:opacity-100 transition-opacity duration-200
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
        />
        <span className="ml-2 font-medium">{drawingPen.size}</span>
      </div>

      {/* Add Clear Button */}
      <button
        onClick={onClear}
        className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
        title="Clear whiteboard"
      >
        <span className="font-bold text-xl">✕</span>
      </button>
    </div>
  );
};

export default DrawingMenu;
