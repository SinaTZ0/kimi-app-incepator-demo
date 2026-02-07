import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const progressBar = progressRef.current;
    if (!container || !logo || !progressBar) return;

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    // Logo animation
    gsap.fromTo(logo, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" });

    // Pulse animation
    gsap.to(logo, {
      scale: 1.05,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const container = containerRef.current;
      if (!container) return;

      // Exit animation
      gsap.to(container, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete();
        },
      });
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(135deg, var(--loading-bg-from) 0%, var(--loading-bg-to) 100%)`,
      }}
    >
      {/* Animated background mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, var(--loading-glow-1) 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, var(--loading-glow-2) 0%, transparent 70%)`,
            top: "40%",
            left: "45%",
            transform: "translate(-50%, -50%)",
            animation: "pulse 3s ease-in-out infinite 0.5s",
          }}
        />
      </div>

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 text-center">
        <div className="mb-8">
          <div
            className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center"
            style={{
              background: "var(--loading-logo-bg)",
              border: "1px solid var(--loading-logo-border)",
              boxShadow: "0 0 60px var(--loading-logo-shadow)",
            }}
          >
            <span className="text-4xl font-display font-bold text-white">I</span>
          </div>
        </div>
        <h1 className="text-3xl font-display font-semibold text-text-primary mb-2">مرکز نوآوری</h1>
        <p className="text-text-secondary text-sm mb-8">جایی که ایده‌ها شکل می‌گیرند</p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-64">
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--progress-bg)" }}>
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-indigo to-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: "0 0 20px var(--loading-bar-shadow)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-text-secondary font-mono">در حال بارگذاری</span>
          <span className="text-xs text-indigo font-mono">%{Math.min(Math.round(progress), 100)}</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
