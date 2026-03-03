"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);

    const [progress, setProgress] = useState(0);
    const progressValue = useRef({ value: 0 });
    const hasAnimated = useRef(false);

    const handleComplete = useCallback(() => {
        onLoadingComplete();
    }, [onLoadingComplete]);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.set(contentRef.current, { perspective: 1200 });
        gsap.set(numberRef.current, { transformPerspective: 1200, force3D: true });

        // Start counter animation immediately - no intro animation
        gsap.to(progressValue.current, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                setProgress(Math.round(progressValue.current.value));
            },
            onComplete: () => {
                // Exit animation
                const exitTl = gsap.timeline({
                    onComplete: handleComplete,
                });

                exitTl
                    .to(numberRef.current, {
                        z: 560,
                        scale: 3.7,
                        rotationX: 7,
                        filter: "blur(1.5px)",
                        opacity: 0.22,
                        duration: 0.58,
                        ease: "power4.in",
                    })
                    .to(contentRef.current, {
                        y: -8,
                        duration: 0.2,
                        ease: "power2.inOut",
                    })
                    .to(containerRef.current, {
                        opacity: 0,
                        duration: 0.32,
                        ease: "power2.out",
                    }, "+=0.03");
            },
        });

    }, [handleComplete]);

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ffffff",
            }}
        >
            {/* Content - visible from the start */}
            <div
                ref={contentRef}
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0",
                }}
            >
                {/* Progress number */}
                <div
                    ref={numberRef}
                    style={{
                        fontSize: "clamp(2.2rem, 8vw, 4rem)",
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: "-0.025em",
                        color: "#111111",
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                        willChange: "transform, opacity, filter",
                    }}
                >
                    <span>{progress}</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
