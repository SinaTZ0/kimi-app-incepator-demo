import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Handshake, Target, Rocket, Check } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "۰۱",
    icon: Handshake,
    label: "طراحی مشترک",
    desc: "تعریف اهداف، محدوده و معیارهای موفقیت پروژه با تیم ما.",
    features: ["جلسات کارگاهی", "جمع‌آوری نیازمندی‌ها", "برنامه‌ریزی زمان‌بندی"],
  },
  {
    number: "۰۲",
    icon: Target,
    label: "آزمایش مشترک",
    desc: "اعتبارسنجی فرضیات از طریق نمونه‌سازی سریع و بازخورد کاربر.",
    features: ["توسعه MVP", "آزمایش کاربر", "بهبود تکراری"],
  },
  {
    number: "۰۳",
    icon: Rocket,
    label: "استقرار مشترک",
    desc: "راه‌اندازی راه‌حل‌ها با پشتیبانی مستمر و نظارت بر عملکرد.",
    features: ["راه‌اندازی تولید", "آموزش", "پشتیبانی نگهداری"],
  },
];

export default function CollaborationModelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stepsContainer = stepsRef.current;
    if (!section || !stepsContainer) return;

    const ctx = gsap.context(() => {
      const stepElements = stepsContainer.querySelectorAll(".step-item");

      gsap.fromTo(
        stepElements,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsContainer,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collaboration" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6 border-indigo-300 rounded-full">
            <Handshake className="w-4 h-4 text-indigo" />
            <span className="text-sm text-[#FFC107]">نحوه کار ما</span>
          </div>
          <h2 className="text-display-2 text-text-primary mb-4">مدل همکاری</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            ما دقت آکادمیک را با اولویت‌های شریک ترکیب می‌کنیم—نقاط عطف مشخص، داده‌های مشترک و نتایج باز.
          </p>
        </div>

        {/* Steps - Vertical Timeline */}
        <div ref={stepsRef} className="max-w-3xl mx-auto mb-16">
          {steps.map((step, i) => (
            <div key={i} className="step-item relative pl-16 md:pl-24 pb-12 last:pb-0 opacity-0">
              {/* Timeline line */}
              {i < steps.length - 1 && <div className="absolute left-6 md:left-8 top-14 w-px h-full bg-surface/10" />}

              {/* Number circle */}
              <div className="absolute left-0 top-0 w-12 md:w-16 h-12 md:h-16 rounded-full glass-card flex items-center justify-center">
                <span className="text-lg md:text-xl font-display font-bold text-indigo">{step.number}</span>
              </div>

              {/* Content */}
              <div className="glass-card p-6 md:p-8 hover:bg-surface/10 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <step.icon className="w-6 h-6 text-indigo" />
                  <h3 className="text-xl font-display font-semibold text-text-primary">{step.label}</h3>
                </div>
                <p className="text-text-secondary mb-4">{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.features.map((feature, j) => (
                    <span key={j} className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-indigo" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <MagneticButton className="primary-button px-8 py-4 text-white font-medium inline-flex items-center gap-2">
            درخواست خلاصه همکاری
            <ArrowRight className="w-5 h-5 rotate-180" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
