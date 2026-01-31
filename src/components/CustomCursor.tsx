import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouch) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      // Fast, responsive cursor following
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: 'none',
      });
    };

    // Track hoverable elements
    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkTouch);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, [isTouch]);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    if (isTouch) return;

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const observer = new MutationObserver(() => {
      const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer glow ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovering
              ? 'w-12 h-12 bg-indigo/20 border border-indigo/40'
              : 'w-8 h-8 bg-indigo/10 border border-indigo/30'
          }`}
          style={{
            boxShadow: isHovering
              ? '0 0 30px rgba(79, 109, 245, 0.5), 0 0 60px rgba(79, 109, 245, 0.3)'
              : '0 0 20px rgba(79, 109, 245, 0.3), 0 0 40px rgba(79, 109, 245, 0.15)',
          }}
        />
      </div>
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-indigo transition-transform duration-150 ${
            isHovering ? 'scale-0' : 'scale-100'
          }`}
        />
      </div>
    </>
  );
}
