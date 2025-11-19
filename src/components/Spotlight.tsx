"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Spotlight: React.FC = () => {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const spotlight = spotlightRef.current;
        if (!spotlight) return;

        // Use quickTo for high-performance mouse tracking
        const xTo = gsap.quickTo(spotlight, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(spotlight, "y", { duration: 0.6, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div
                ref={spotlightRef}
                className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[100px]"
                style={{ transform: "translate(-50%, -50%)", left: 0, top: 0 }}
            />
        </div>
    );
};

export default Spotlight;
