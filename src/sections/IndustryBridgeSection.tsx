import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Briefcase, FileText, Zap, Building2, Landmark, Factory } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { icon: Building2, name: "غول‌های فناوری", count: "+۱۵" },
  { icon: Landmark, name: "دولت", count: "۸" },
  { icon: Factory, name: "تولید", count: "۱۲" },
];

const engagementTypes = [
  {
    icon: Zap,
    label: "اسپرینت‌ها",
    desc: "پروژه‌های فشرده ۲ تا ۴ هفته‌ای",
    color: "bg-amber-500/20",
  },
  {
    icon: FileText,
    label: "مجوزدهی",
    desc: "انتقال مالکیت فکری و تجاری‌سازی",
    color: "bg-blue-500/20",
  },
  {
    icon: Briefcase,
    label: "پایلوت‌ها",
    desc: "آزمایش استقرار در دنیای واقعی",
    color: "bg-green-500/20",
  },
];

export default function IndustryBridgeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const marquee = marqueeRef.current;
    if (!section || !content || !marquee) return;

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        content,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Engagement cards
      const cards = content.querySelectorAll(".engagement-card");
      gsap.fromTo(
        cards,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="industry" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src="/industry_presentation.jpg" alt="ارائه صنعتی" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-base/50 via-dark-base/0 to-dark-base/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Partner Types */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {partners.map((partner, i) => (
            <div key={i} className="glass-card px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo/20 flex items-center justify-center">
                <partner.icon className="w-6 h-6 text-indigo" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-text-primary">{partner.count}</div>
                <div className="text-sm text-text-secondary">{partner.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div ref={contentRef} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6 text-indigo-300 border-indigo-300 rounded-full">
            <Briefcase className="w-4 h-4 text-indigo" />
            <span className="text-sm text-[#FFC107]">همکاری صنعتی</span>
          </div>

          <h2 className="text-display-2 text-text-primary mb-6">
            ترجمه پژوهش
            <h1 className="block text-gradient mt-2">به تأثیر</h1>
          </h2>

          <p className="text-lg text-text-secondary leading-relaxed mb-10">
            اسپرینت‌ها، مجوزدهی و پایلوت‌های مشترک—طراحی شده برای حرکت سریع بدون از دست دادن دقت. پژوهش خود را با شرکای
            صنعتی آماده استقرار متصل کنید.
          </p>

          {/* Engagement Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {engagementTypes.map((type, i) => (
              <div
                key={i}
                className="engagement-card glass-card p-6 hover:bg-surface/10 transition-colors text-left opacity-0"
              >
                <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-4`}>
                  <type.icon className="w-6 h-6 text-indigo" />
                </div>
                <h4 className="font-display font-semibold text-text-primary mb-1">{type.label}</h4>
                <p className="text-sm text-text-secondary">{type.desc}</p>
              </div>
            ))}
          </div>

          <MagneticButton className="primary-button px-8 py-4 text-white font-medium inline-flex items-center gap-2">
            صحبت با تیم ما
            <ArrowRight className="w-5 h-5 rotate-180" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
