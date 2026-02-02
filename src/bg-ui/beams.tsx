import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface BackgroundBeamsProps {
  className?: string;
  /** Maximum number of beams visible at once (default: 3) */
  maxActive?: number;
}

const pathData = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-358 -213C-358 -213 -290 192 174 319C638 446 706 851 706 851",
  "M-336 -237C-336 -237 -268 168 196 295C660 422 728 827 728 827",
  "M-314 -261C-314 -261 -246 144 218 271C682 398 750 803 750 803",
  "M-292 -285C-292 -285 -224 120 240 247C704 374 772 779 772 779",
  "M-270 -309C-270 -309 -202 96 262 223C726 350 794 755 794 755",
  "M-248 -333C-248 -333 -180 72 284 199C748 326 816 731 816 731",
  "M-226 -357C-226 -357 -158 48 306 175C770 302 838 707 838 707",
  "M-204 -381C-204 -381 -136 24 328 151C792 278 860 683 860 683",
  "M-182 -405C-182 -405 -114 0 350 127C814 254 882 659 882 659",
  "M-160 -429C-160 -429 -92 -24 372 103C836 230 904 635 904 635",
  "M-138 -453C-138 -453 -70 -48 394 79C858 206 926 611 926 611",
  "M-116 -477C-116 -477 -48 -72 416 55C880 182 948 587 948 587",
  "M-94 -501C-94 -501 -26 -96 438 31C902 158 970 563 970 563",
  "M-72 -525C-72 -525 -4 -120 460 7C924 134 992 539 992 539",
  "M-50 -549C-50 -549 18 -144 482 -17C946 110 1014 515 1014 515",
  "M-28 -573C-28 -573 40 -168 504 -41C968 86 1036 491 1036 491",
  "M-6 -597C-6 -597 62 -192 526 -65C990 62 1058 467 1058 467",
  "M16 -621C16 -621 84 -216 548 -89C1012 38 1080 443 1080 443",
  "M38 -645C38 -645 106 -240 570 -113C1034 14 1102 419 1102 419",
];

// We'll compute random timings on mount to create a "metro shower" effect.
// Timings (durations/delays) are randomized per-mount for more organic animation.

export const BackgroundBeams = React.memo(({ className, maxActive = 3 }: BackgroundBeamsProps) => {
  const pathsRef = useRef<Array<SVGPathElement | null>>([]);

  useEffect(() => {
    const timelines: gsap.core.Timeline[] = [];

    // Parameters for the "metro shower" scheduling and longer animations
    const maxDelay = 8; // seconds window for initial bursts
    const clusterCount = Math.max(2, Math.floor(pathData.length / 6));
    const clusterCenters = Array.from({ length: clusterCount }, () => Math.random() * maxDelay);

    // Scheduling using channels so at most `maxActive` beams are active simultaneously
    const numBeams = pathData.length;
    const indices = Array.from({ length: numBeams }, (_, i) => i).sort(() => Math.random() - 0.5);
    const channels = new Array(Math.max(1, Math.floor(maxActive))).fill(0); // next available time for each channel
    const schedules: { delay: number; dur: number; repeatDelay: number; initialProgress: number }[] = new Array(
      numBeams,
    );

    for (const i of indices) {
      const dur = 20.4 + Math.random() * 2.6; // ~2.4s - 5.0s (longer)
      const repeatDelay = 4 + Math.random() * 4; // 4s - 8s between repeats
      const clusterCenter = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
      const desired = Math.max(0, clusterCenter + (Math.random() - 0.5) * 1.0); // wider jitter

      // pick the earliest available channel
      let best = 0;
      for (let c = 1; c < channels.length; c++) {
        if (channels[c] < channels[best]) best = c;
      }
      const start = Math.max(desired, channels[best]);
      channels[best] = start + dur + repeatDelay;

      schedules[i] = { delay: start, dur, repeatDelay, initialProgress: Math.random() * 80 };
    }

    pathsRef.current.forEach((path, i) => {
      if (!path) return;
      const length = path.getTotalLength();
      const sched = schedules[i] || {
        delay: Math.random() * maxDelay,
        dur: 2.8,
        repeatDelay: 5,
        initialProgress: Math.random() * 80,
      };
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length * (1 - sched.initialProgress / 100),
        opacity: 0,
      });

      const t = gsap.timeline({
        repeat: -1,
        repeatDelay: sched.repeatDelay,
        defaults: { ease: "power1.inOut" },
        delay: sched.delay,
      });

      t.to(path, { strokeDashoffset: 0, opacity: 0.7, duration: sched.dur * 0.35 })
        .to(path, { opacity: 0.7, duration: sched.dur * 0.45 })
        .to(path, { strokeDashoffset: length, opacity: 0, duration: sched.dur * 0.2 });

      timelines.push(t);
    });

    return () => timelines.forEach((t) => t.kill());
  }, [maxActive]);

  return (
    <div className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <svg
        className="absolute h-full w-full"
        fill="none"
        viewBox="0 0 696 316"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Static faint paths for depth */}
        <g opacity="0.03">
          {pathData.map((d, i) => (
            <path key={`static-${i}`} d={d} stroke="white" strokeWidth="0.5" />
          ))}
        </g>

        {/* Animated gradient beams (GSAP) */}
        {pathData.map((d, i) => (
          <path
            key={`beam-${i}`}
            ref={(el) => {
              pathsRef.current[i] = el;
            }}
            d={d}
            stroke={`url(#gradient-${i})`}
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        ))}

        <defs>
          {pathData.map((_, i) => (
            <linearGradient key={`gradient-${i}`} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="20%" stopColor="#18CCFC" stopOpacity="1" />
              <stop offset="50%" stopColor="#6344F5" stopOpacity="1" />
              <stop offset="80%" stopColor="#AE48FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";

export default function BackgroundBeamsDemo() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-neutral-950">
      <BackgroundBeams />
    </div>
  );
}
