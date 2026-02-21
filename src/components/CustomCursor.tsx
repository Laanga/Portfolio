"use client";

import React, { useEffect, useRef, useState } from "react";

const DESKTOP_BREAKPOINT = 1024;
const POINTER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia(
      `(min-width: ${DESKTOP_BREAKPOINT}px)`
    );
    const reducedMotionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateCursorAvailability = () => {
      setIsEnabled(
        desktopMediaQuery.matches && !reducedMotionMediaQuery.matches
      );
    };

    updateCursorAvailability();
    desktopMediaQuery.addEventListener("change", updateCursorAvailability);
    reducedMotionMediaQuery.addEventListener("change", updateCursorAvailability);

    return () => {
      desktopMediaQuery.removeEventListener("change", updateCursorAvailability);
      reducedMotionMediaQuery.removeEventListener(
        "change",
        updateCursorAvailability
      );
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isEnabled) {
      root.classList.add("custom-cursor-active");
      body.classList.add("custom-cursor-active");
    } else {
      root.classList.remove("custom-cursor-active");
      body.classList.remove("custom-cursor-active");
    }

    return () => {
      root.classList.remove("custom-cursor-active");
      body.classList.remove("custom-cursor-active");
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      setIsHidden(true);
      setIsHoveringInteractive(false);
      return;
    }
    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let isHovering = false;
    let isVisible = false;
    let animationId = 0;

    const isInteractiveTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest(POINTER_SELECTOR));
    };

    const updateHovering = (nextValue: boolean) => {
      if (isHovering === nextValue) return;
      isHovering = nextValue;
      setIsHoveringInteractive(nextValue);
    };

    const updateVisibility = (nextValue: boolean) => {
      if (isVisible === nextValue) return;
      isVisible = nextValue;
      setIsHidden(!nextValue);
    };

    const onMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      updateVisibility(true);
      updateHovering(isInteractiveTarget(event.target));
    };

    const onMouseLeave = () => {
      updateVisibility(false);
      updateHovering(false);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0) scale(${isHovering ? 1.2 : 1})`;
      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-5 h-5 rounded-full border border-white/30 bg-white/10 pointer-events-none z-[9998] transition-opacity duration-200 will-change-transform ${
        isHidden ? "opacity-0" : "opacity-100"
      } ${
        isHoveringInteractive
          ? "shadow-[0_0_0_10px_rgba(255,255,255,0.08)]"
          : "shadow-none"
      }`}
    />
  );
};

export default CustomCursor;
