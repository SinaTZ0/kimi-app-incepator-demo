import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={contentRef} className="relative z-10 w-full px-6 lg:px-12">
        {/* Central Hero Content */}
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-indigo" />
            <span className="text-sm text-text-secondary">مرکز نوآوری دانشگاه</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-display-1 text-text-primary mb-6">
            جایی که ایده‌ها
            <span className="block text-gradient">شکل می‌گیرند</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            مرکز نوآوری، سکوی پرتاب پژوهش‌های جسورانه، کسب‌وکارهای دانشجویی و همکاری‌های میان‌رشته‌ای دانشگاه است.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            {[
              { value: "۱۲", label: "آزمایشگاه" },
              { value: "+۱۸۰", label: "پروژه" },
              { value: "+۴۰", label: "همکار" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="label-mono">{stat.label}</div>
              </div>
            ))}
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
