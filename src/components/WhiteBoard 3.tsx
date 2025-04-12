"use client"
import React, { useEffect, useRef, useState } from "react";
import { DrawingPen } from "./BoardContainer";

interface BoardProps {
    drawingPen: DrawingPen;
}

function WhiteBoard(props: BoardProps) {
    const { drawingPen } = props;
    const boardAreaRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // Use a ref to always hold the latest drawingPen settings
    const drawingPenRef = useRef(drawingPen);
    useEffect(() => {
        drawingPenRef.current = drawingPen;
    }, [drawingPen]);

    // Update local cursor position based on mouse movement over the board.
    useEffect(() => {
        const boardArea = boardAreaRef.current;
        if (!boardArea) return;

        const container = boardArea.querySelector("#container");
        if (!container) return;

        const onMouseMove = (e: MouseEvent) => {
            const containerRect = container.getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            const y = e.clientY - containerRect.top;
            setCursorPos({ x, y });
        };
        boardArea.addEventListener("mousemove", onMouseMove);
        return () => boardArea.removeEventListener("mousemove", onMouseMove);
    }, []);

    // Set up the canvas only once when the component mounts.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const sketch = document.querySelector("#sketch");
        if (!sketch) return;

        const sketchStyle = getComputedStyle(sketch);
        // Setting the canvas dimensions here clears it only once.
        canvas.width = parseInt(sketchStyle.getPropertyValue("width"));
        canvas.height = parseInt(sketchStyle.getPropertyValue("height"));

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const mouse = { x: 0, y: 0 };
        const lastMouse = { x: 0, y: 0 };

        const getCanvasOffset = () => {
            const rect = canvas.getBoundingClientRect();
            return { left: rect.left, top: rect.top };
        };

        // The onPaint callback now uses the latest drawingPen settings via drawingPenRef.
        const onPaint = () => {
            // Update the stroke settings from the latest drawing pen config
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = drawingPenRef.current.size;
            ctx.strokeStyle = drawingPenRef.current.color;

            ctx.beginPath();
            ctx.moveTo(lastMouse.x, lastMouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
        };

        const onCanvasMouseMove = (e: MouseEvent) => {
            const canvasOffset = getCanvasOffset();
            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;
            mouse.x = e.clientX - canvasOffset.left;
            mouse.y = e.clientY - canvasOffset.top;
        };

        canvas.addEventListener("mousemove", onCanvasMouseMove);
        canvas.addEventListener("mousedown", () => {
            canvas.addEventListener("mousemove", onPaint);
        });
        canvas.addEventListener("mouseup", () => {
            canvas.removeEventListener("mousemove", onPaint);
        });

        return () => {
            canvas.removeEventListener("mousemove", onPaint);
            canvas.removeEventListener("mousemove", onCanvasMouseMove);
        };
    }, []); // Empty dependency array to ensure this runs only once

    return (
        <div className="my-auto w-full h-full border p-2">
            <div className="w-full h-full relative" id="sketch" ref={boardAreaRef}>
                <div id="container" className="w-full h-full">
                    <canvas className="w-full h-full" id="board" ref={canvasRef}></canvas>
                </div>
                {/* Local cursor element that tracks the mouse */}
                <div
                    id="local-cursor"
                    className="absolute z-50 pointer-events-none"
                    style={{
                        left: `${cursorPos.x}px`,
                        top: `${cursorPos.y}px`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-cursor-fill"
                        viewBox="0 0 16 16"
                        style={{ color: drawingPenRef.current.color }}
                    >
                        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default WhiteBoard;

