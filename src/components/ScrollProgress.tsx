import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const indicator = indicatorRef.current;
    if (!progress || !indicator) return;

    // Update progress bar width based on scroll
    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Show/hide indicator based on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -100',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(indicator, {
          opacity: self.progress > 0.01 ? 1 : 0,
          duration: 0.3,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="fixed top-0 left-0 right-0 z-[210] opacity-0"
    >
      <div className="h-1 bg-white/5">
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, #4F6DF5 0%, #8B5CF6 100%)',
            boxShadow: '0 0 20px rgba(79, 109, 245, 0.5)',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </div>
  );
}
