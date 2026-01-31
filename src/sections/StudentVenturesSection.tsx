import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Users, Lightbulb, TrendingUp, DollarSign, GraduationCap, Shield } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Users, label: "منتورشیپ", desc: "راهنمایی ۱ به ۱ از متخصصان صنعت" },
  { icon: Shield, label: "کلینیک حقوقی", desc: "حفاظت از مالکیت فکری و ثبت شرکت" },
  { icon: DollarSign, label: "کمک‌هزینه", desc: "تا ۲۵ هزار دلار سرمایه" },
  { icon: GraduationCap, label: "کارگاه‌ها", desc: "مهارت‌های کسب‌وکار و فنی" },
];

const cohortStats = [
  { value: "+۴۵", label: "تیم راه‌اندازی شده" },
  { value: "+۲M$", label: "سرمایه جذب شده" },
  { value: "۱۲", label: "هفته برنامه" },
];

export default function StudentVenturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const benefitsContainer = benefitsRef.current;
    if (!section || !image || !benefitsContainer) return;

    const ctx = gsap.context(() => {
      // Image reveal with mask effect
      gsap.fromTo(
        image,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Benefits stagger
      const benefitCards = benefitsContainer.querySelectorAll(".benefit-card");
      gsap.fromTo(
        benefitCards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: benefitsContainer,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ventures" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Stats Bar */}
        <div className="glass-card p-6 mb-16">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-indigo" />
              <span className="label-mono text-indigo">نتایج مسیر کارآفرینی</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {cohortStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-text-primary">{stat.value}</div>
                  <div className="text-xs text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6">
              <Lightbulb className="w-4 h-4 text-indigo" />
              <span className="label-mono text-indigo">کسب‌وکارهای دانشجویی</span>
            </div>

            <h2 className="text-display-2 text-text-primary mb-6">
              تیم بساز.
              <span className="block text-gradient">نمونه اولیه عرضه کن.</span>
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              از اولین ایده تا اولین مشتری—منتورشیپ، کلینیک حقوقی و کمک‌هزینه شامل می‌شود. ایده‌ات را در فقط ۱۲ هفته به
              کسب‌وکار آماده سرمایه‌گذاری تبدیل کن.
            </p>

            {/* Benefits Grid */}
            <div ref={benefitsRef} className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="benefit-card glass-card p-4 hover:bg-white/10 transition-colors opacity-0">
                  <benefit.icon className="w-6 h-6 text-indigo mb-3" />
                  <h4 className="font-display font-medium text-text-primary mb-1">{benefit.label}</h4>
                  <p className="text-sm text-text-secondary">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <MagneticButton className="primary-button px-6 py-4 text-white font-medium flex items-center gap-2">
              ثبت‌نام در مسیر کارآفرینی
              <ArrowRight className="w-5 h-5 rotate-180" />
            </MagneticButton>
          </div>

          {/* Right Image with overlay */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="glass-card overflow-hidden aspect-square">
              <img
                src="/venture_team_working.jpg"
                alt="تیم کارآفرینی دانشجویی"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 via-transparent to-transparent" />

              {/* Quote overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <blockquote className="text-text-primary italic mb-2">
                  «منتورشیپ و سرمایه به ما کمک کرد پروژه کلاسی‌مان را به یک استارتاپ واقعی تبدیل کنیم.»
                </blockquote>
                <cite className="text-sm text-text-secondary not-italic">— علی محمدی، بنیان‌گذار دیتافلو</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
