"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const curtainLeftRef = useRef<HTMLDivElement>(null);
    const curtainRightRef = useRef<HTMLDivElement>(null);

    const [progress, setProgress] = useState(0);
    const progressValue = useRef({ value: 0 });
    const hasAnimated = useRef(false);

    const handleComplete = useCallback(() => {
        onLoadingComplete();
    }, [onLoadingComplete]);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

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
                    .to(contentRef.current, {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.in",
                    })
                    .to(curtainLeftRef.current, {
                        xPercent: -100,
                        duration: 0.8,
                        ease: "power3.inOut",
                    }, "-=0.2")
                    .to(curtainRightRef.current, {
                        xPercent: 100,
                        duration: 0.8,
                        ease: "power3.inOut",
                    }, "<")
                    .to(containerRef.current, {
                        opacity: 0,
                        duration: 0.3,
                    }, "-=0.3");
            },
        });

        // Progress bar fill synced with counter
        gsap.to(progressBarRef.current, {
            scaleX: 1,
            duration: 2.5,
            ease: "power2.inOut",
        });

    }, [handleComplete]);

    // Format number with leading zero
    const formattedProgress = progress.toString().padStart(3, "0");

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
                background: "#050505",
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
                    gap: "2rem",
                }}
            >
                {/* Loading text */}
                <div
                    style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.6875rem",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255, 255, 255, 0.5)",
                    }}
                >
                    Loading
                </div>

                {/* Big number */}
                <div
                    style={{
                        fontSize: "clamp(6rem, 25vw, 14rem)",
                        fontWeight: 600,
                        lineHeight: 0.9,
                        letterSpacing: "-0.04em",
                        color: "#fafafa",
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                        display: "flex",
                        alignItems: "baseline",
                    }}
                >
                    <span>{formattedProgress}</span>
                    <span
                        style={{
                            fontSize: "clamp(1.5rem, 6vw, 3.5rem)",
                            fontWeight: 400,
                            marginLeft: "0.2em",
                            opacity: 0.5,
                        }}
                    >
                        %
                    </span>
                </div>

                {/* Progress bar */}
                <div
                    style={{
                        width: "clamp(200px, 40vw, 400px)",
                        height: "1px",
                        background: "rgba(255, 255, 255, 0.1)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        ref={progressBarRef}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(255, 255, 255, 0.8)",
                            transformOrigin: "left",
                            transform: "scaleX(0)",
                        }}
                    />
                </div>

                {/* Decorative line */}
                <div
                    style={{
                        width: "40px",
                        height: "1px",
                        background: "rgba(255, 255, 255, 0.2)",
                        marginTop: "1rem",
                    }}
                />
            </div>

            {/* Curtains for reveal effect */}
            <div
                ref={curtainLeftRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "50%",
                    height: "100%",
                    background: "#050505",
                    zIndex: 5,
                }}
            />
            <div
                ref={curtainRightRef}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "50%",
                    height: "100%",
                    background: "#050505",
                    zIndex: 5,
                }}
            />

            {/* Corner frames */}
            <div
                style={{
                    position: "absolute",
                    top: "2rem",
                    left: "2rem",
                    width: "3rem",
                    height: "3rem",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    zIndex: 11,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "2rem",
                    right: "2rem",
                    width: "3rem",
                    height: "3rem",
                    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    zIndex: 11,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "2rem",
                    width: "3rem",
                    height: "3rem",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    zIndex: 11,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    right: "2rem",
                    width: "3rem",
                    height: "3rem",
                    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    zIndex: 11,
                }}
            />
        </div>
    );
};

export default LoadingScreen;
