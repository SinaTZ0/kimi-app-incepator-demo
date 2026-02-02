import React, { useState, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  text: React.ReactNode;
  disabled?: boolean;
  speed?: number; // seconds
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number; // seconds
};

const ShinyText: React.FC<Props> = ({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    // Clean up any existing timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    const startPos = direction === "left" ? "150% center" : "-50% center";
    const endPos = direction === "left" ? "-50% center" : "150% center";

    // Ensure initial position
    gsap.set(el, { backgroundPosition: startPos });

    if (disabled) return;

    const tl = gsap.timeline({ repeat: -1 });

    if (yoyo) {
      // forward
      tl.to(el, { backgroundPosition: endPos, duration: speed, ease: "none" });
      // hold at end
      if (delay > 0) tl.to(el, { backgroundPosition: endPos, duration: delay, ease: "none" });
      // back
      tl.to(el, { backgroundPosition: startPos, duration: speed, ease: "none" });
      // hold at start
      if (delay > 0) tl.to(el, { backgroundPosition: startPos, duration: delay, ease: "none" });
    } else {
      // single shine then hold at end, repeat (jumps back to start)
      tl.to(el, { backgroundPosition: endPos, duration: speed, ease: "none" });
      if (delay > 0) tl.to(el, { backgroundPosition: endPos, duration: delay, ease: "none" });
    }

    tlRef.current = tl;

    if (isPaused) tl.pause();

    return () => {
      tl.kill();
      tlRef.current = null;
    };
    // dependencies intentionally include only props that should rebuild timeline
  }, [direction, speed, yoyo, delay, disabled, isPaused]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && tlRef.current) {
      tlRef.current.pause();
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && tlRef.current) {
      tlRef.current.resume();
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    // default initial position
    backgroundPosition: direction === "left" ? "150% center" : "-50% center",
  };

  return (
    <span
      ref={spanRef}
      className={`inline-block overflow-visible leading-[4.125rem] ${className}`}
      style={gradientStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </span>
  );
};

export default ShinyText;
