"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    variant?: "fade" | "slide" | "scale";
    className?: string;
    threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    width = "100%",
    delay = 0,
    duration = 0.8,
    variant = "fade",
    className = "",
    threshold = 0.1,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            let fromVars: gsap.TweenVars = { opacity: 0 };
            let toVars: gsap.TweenVars = {
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: `top ${100 - (threshold * 100)}%`,
                    toggleActions: "play none none reverse",
                }
            };

            switch (variant) {
                case "slide":
                    fromVars.x = -50;
                    toVars.x = 0;
                    break;
                case "scale":
                    fromVars.scale = 0.8;
                    toVars.scale = 1;
                    break;
                case "fade":
                default:
                    fromVars.y = 50;
                    toVars.y = 0;
                    break;
            }

            gsap.fromTo(element, fromVars, toVars);
        }, ref);

        return () => ctx.revert();
    }, [delay, duration, variant, threshold]);

    return (
        <div ref={ref} style={{ width }} className={className}>
            {children}
        </div>
    );
};

export default ScrollReveal;
