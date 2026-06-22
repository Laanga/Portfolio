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
    const pathRef = useRef<SVGPathElement>(null);

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

        // Start counter animation immediately
        gsap.to(progressValue.current, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                setProgress(Math.round(progressValue.current.value));
            },
            onComplete: () => {
                // Exit animation - the panel lifts up like a window, revealing the site
                const exitTl = gsap.timeline({
                    onComplete: handleComplete,
                });

                exitTl
                    .to(numberRef.current, {
                        y: -60,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power3.in",
                    })
                    .to(
                        containerRef.current,
                        {
                            yPercent: -100,
                            duration: 1.05,
                            ease: "expo.inOut",
                        },
                        "-=0.1"
                    );
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
                background: "transparent",
                pointerEvents: "none",
            }}
        >
            {/* SVG Liquid Curtain Background */}
            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    fill: "#ffffff",
                    zIndex: 1,
                    pointerEvents: "auto",
                }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    ref={pathRef}
                    d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
                />
            </svg>

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
                        fontSize: "clamp(2.2rem, 8vw, 4.25rem)",
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

