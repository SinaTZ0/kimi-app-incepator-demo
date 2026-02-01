import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import LightRays from "@/bg-ui/light-rays";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to(content, {
        y: 100,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Paper-like 3D rise animation on mount
      const image = imageRef.current;
      if (image) {
        gsap.fromTo(
          image,
          { rotationX: 90, scale: 0.8, transformOrigin: "center bottom", dropShadow: "none" },
          {
            scale: 1.5,
            rotationX: 0,
            opacity: 0.3,
            duration: 1.4,
            ease: "power3.out",
            delay: 1.5,
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.5}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.02}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={3}
          saturation={1}
        />
      </div>
      <div ref={contentRef} className="relative z-10 w-full px-6 lg:px-12">
        {/* Central Hero Content */}
        <div className="m-auto text-center relative size-full">
          <img
            ref={imageRef}
            src="/hut-drawing-transparent2.png"
            alt="پژوهشگر"
            className="absolute inset-0 m-auto -z-10"
            style={{
              filter: " hue-rotate(600deg) drop-shadow(-50px 50px 10px black)",
            }}
            aria-hidden
          />

          {/* Main Headline */}
          <h1 className="text-display-1 text-text-primary mb-6">
            <span className="block text-4xl md:text-6xl leading-tight font-black">دانشکاه صنعتی همدان</span>
            <span className="block mt-3 text-xl md:text-2xl text-[#E5E7EB]">
              مرکز نوآوری — جایی که ایده‌ها <span className="text-gradient font-black">شکل می‌گیرند</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            مرکز نوآوری، سکوی پرتاب پژوهش‌های جسورانه، کسب‌وکارهای دانشجویی و همکاری‌های میان‌رشته‌ای دانشگاه است.
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mt-2 h-10 rounded-full border-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-300" />
              <span className="text-sm text-[#FFC107]">مرکز نوآوری دانشگاه</span>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap  gap-8 md:gap-16">
              {[
                { value: "۱۲", label: "آزمایشگاه" },
                { value: "+۱۸۰", label: "پروژه" },
                { value: "+۴۰", label: "همکار" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-1">{stat.value}</div>
                  <div className="label-mono text-indigo-300 text-base md:text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton className="primary-button px-8 py-4 text-white font-medium flex items-center gap-2">
              درخواست منتورشیپ
              <ArrowRight className="w-5 h-5 rotate-180" />
            </MagneticButton>
            <MagneticButton className="glass-button px-8 py-4 text-text-primary font-medium">
              مشاهده برنامه‌ها
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Floating Image Cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Left floating card */}
        <div className="absolute right-[5%] top-[20%] w-48 md:w-64 h-64 md:h-80 glass-card overflow-hidden opacity-60 animate-float hidden lg:block">
          <img src="/hero_portrait.jpg" alt="پژوهشگر" className="w-full h-full object-cover" />
        </div>

        {/* Right floating card */}
        <div
          className="absolute left-[5%] bottom-[20%] w-40 md:w-56 h-56 md:h-72 glass-card overflow-hidden opacity-50 animate-float hidden lg:block"
          style={{ animationDelay: "2s" }}
        >
          <img src="/research_lab_scene.jpg" alt="آزمایشگاه" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#research"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        data-cursor-hover
      >
        <span className="label-mono text-xs">برای کاوش اسکرول کنید</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
