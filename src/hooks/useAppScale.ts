import { useEffect } from "react";

export function useAppScale(options?: {
  baseWidth?: number;
  baseFontSize?: number;
  minScale?: number;
  maxScale?: number;
  minActivationWidth?: number;
}) {
  const baseWidth = options?.baseWidth ?? 1920; // 1080p baseline corresponds to 1920x1080
  const baseFontSize = options?.baseFontSize ?? 16;
  const minScale = options?.minScale ?? 0.75;
  const maxScale = options?.maxScale ?? 1.5; // allow modest upscaling by default
  const minActivationWidth = options?.minActivationWidth ?? 1024; // don't activate on phones

  useEffect(() => {
    let rafId = 0;

    const applyScale = () => {
      const width = window.innerWidth;
      // Only apply scaling for larger viewports (avoid phones / small devices)
      if (width < minActivationWidth) {
        // ensure default font-size is restored
        document.documentElement.style.fontSize = "";
        return;
      }

      const raw = width / baseWidth;
      const scale = Math.max(minScale, Math.min(maxScale, raw)); // clamp between minScale and maxScale
      document.documentElement.style.fontSize = `${baseFontSize * scale}px`;
    };

    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(applyScale);
    };

    applyScale();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      // restore default font-size when unmounting
      document.documentElement.style.fontSize = "";
    };
  }, [baseWidth, baseFontSize, minScale, minActivationWidth]);
}
