"use client"
import React, { useState } from "react";
import WhiteBoard from "./WhiteBoard";
import DrawingMenu from "./DrawingMenu";

export interface DrawingPen {
    color: string;
    size: number;
}

const BoardContainer = () => {
    const [drawingPen, setDrawingPen] = useState<DrawingPen>({
        color: "#000000",
        size: 5,
    });

    return (
        <section className="relative flex flex-col bg-white w-full h-screen">
            {/* WhiteBoard takes the remaining vertical space */}
            <div className="flex-grow">
                <WhiteBoard drawingPen={drawingPen} />
            </div>
            {/* The control tab appears at the bottom */}
            <DrawingMenu drawingPen={drawingPen} setDrawingPen={setDrawingPen} />
        </section>
    );
};

export default BoardContainer;

