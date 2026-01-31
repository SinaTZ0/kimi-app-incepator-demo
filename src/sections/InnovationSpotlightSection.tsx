import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Zap, Globe, Clock, Users } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Clock, value: "۶", label: "ماه" },
  { icon: Users, value: "۱۲", label: "عضو تیم" },
  { icon: Zap, value: "۳", label: "شهر" },
];

export default function InnovationSpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        image,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Content reveal
      gsap.fromTo(
        content,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="innovation" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Large Image - Takes 7 columns */}
          <div ref={imageRef} className="lg:col-span-7 relative opacity-0">
            <div className="glass-card overflow-hidden aspect-[4/3]">
              <img
                src="/prototype_hand_detail.jpg"
                alt="توسعه نمونه اولیه"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-6 -right-6 glass-card p-4 hidden md:block">
              <div className="flex items-center gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center px-4">
                    <stat.icon className="w-5 h-5 text-indigo mx-auto mb-1" />
                    <div className="text-2xl font-display font-bold text-text-primary">{stat.value}</div>
                    <div className="text-xs text-text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content - Takes 5 columns */}
          <div ref={contentRef} className="lg:col-span-5 opacity-0">
            {/* Tags */}
            <div className="flex gap-3 mb-6">
              <span className="glass-button px-3 py-1.5 text-xs text-text-secondary flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-indigo" />
                نمونه‌سازی
              </span>
              <span className="glass-button px-3 py-1.5 text-xs text-text-secondary flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-indigo" />
                علم باز
              </span>
            </div>

            <h2 className="text-display-2 text-text-primary mb-6">از آزمایشگاه به دنیای واقعی</h2>

            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              یک اسپرینت ۶ ماهه که نمونه اولیه حسگر را به پایلوت با برنامه‌ریزان شهری تبدیل کرد. این روش ما برای پر کردن
              شکاف بین پژوهش و کاربرد عملی است.
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-8">
              {["روش‌شناسی نمونه‌سازی سریع", "همکاری تیم چندتخصصی", "آزمایش استقرار در دنیای واقعی"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-indigo" />
                  </div>
                  <span className="text-text-primary">{item}</span>
                </div>
              ))}
            </div>

            <MagneticButton className="primary-button px-6 py-4 text-white font-medium flex items-center gap-2">
              کاوش مطالعه موردی
              <ArrowRight className="w-5 h-5 rotate-180" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
