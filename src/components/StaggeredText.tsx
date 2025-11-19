"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface StaggeredTextProps {
    text: string;
    className?: string;
    delay?: number;
}

const StaggeredText: React.FC<StaggeredTextProps> = ({ text, className = "", delay = 0 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const letters = Array.from(text);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            const spans = container.querySelectorAll("span");

            gsap.fromTo(spans,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.03,
                    delay: delay,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [text, delay]);

    return (
        <div
            ref={containerRef}
            className={`inline-flex flex-wrap justify-center overflow-hidden ${className}`}
        >
            {letters.map((letter, index) => (
                <span key={index} className="inline-block">
                    {letter === " " ? "\u00A0" : letter}
                </span>
            ))}
        </div>
    );
};

export default StaggeredText;
