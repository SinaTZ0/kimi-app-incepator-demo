import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, Shield, Calendar, Monitor, Cpu, FlaskConical } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    icon: Monitor,
    name: "آزمایشگاه محاسبات",
    desc: "ایستگاه‌های کاری پرقدرت",
    equipment: "GPU، کلاستر، ابر",
  },
  {
    icon: Cpu,
    name: "آزمایشگاه الکترونیک",
    desc: "توسعه نمونه اولیه",
    equipment: "اسیلوسکوپ، لحیم‌کاری، پرینتر سه‌بعدی",
  },
  {
    icon: FlaskConical,
    name: "آزمایشگاه تر",
    desc: "پژوهش زیستی",
    equipment: "میکروسکوپ، سانتریفیوژ، PCR",
  },
  {
    icon: Wrench,
    name: "فضای ساخت",
    desc: "نمونه‌سازی فیزیکی",
    equipment: "CNC، برش لیزری، کارگاه چوب",
  },
];

const quickStats = [
  { value: "+۵۰", label: "ایستگاه کاری" },
  { value: "۲۴/۷", label: "دسترسی" },
  { value: "۱۰۰٪", label: "سابقه ایمنی" },
];

export default function FacilitiesLabsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const grid = gridRef.current;
    if (!section || !image || !grid) return;

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        image,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Grid items
      const gridItems = grid.querySelectorAll(".facility-card");
      gsap.fromTo(
        gridItems,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {
            each: 0.1,
            from: "random",
          },
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="facilities" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Stats Banner */}
        <div className="glass-card p-6 mb-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {quickStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-display font-bold text-indigo">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Large Image */}
          <div ref={imageRef} className="opacity-0">
            <div className="glass-card overflow-hidden aspect-[4/3] relative group">
              <img
                src="/facilities_lab_wide.jpg"
                alt="آزمایشگاه نمونه‌سازی"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base/60 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 right-6 glass-card px-4 py-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-text-primary">گواهی ایمنی</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content + Grid */}
          <div>
            <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6">
              <Wrench className="w-4 h-4 text-indigo" />
              <span className="label-mono text-indigo">زیرساخت</span>
            </div>

            <h2 className="text-display-2 text-text-primary mb-4">
              ابزار آماده.
              <span className="block text-gradient">ایمنی اول.</span>
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              آزمایشگاه‌های نمونه‌سازی، ایستگاه‌های کاری تمیز و بستر آزمایش مشترک— باز برای همه پروژه‌های وابسته. همه
              چیزی که برای ساخت و آزمایش ایده‌هایتان نیاز دارید.
            </p>

            {/* Facilities Grid */}
            <div ref={gridRef} className="grid grid-cols-2 gap-4 mb-8">
              {facilities.map((facility, i) => (
                <div
                  key={i}
                  className="facility-card glass-card p-4 hover:bg-white/10 transition-colors group cursor-pointer opacity-0"
                >
                  <facility.icon className="w-6 h-6 text-indigo mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-display font-medium text-text-primary mb-1">{facility.name}</h4>
                  <p className="text-xs text-text-secondary mb-2">{facility.desc}</p>
                  <p className="text-xs text-indigo/70">{facility.equipment}</p>
                </div>
              ))}
            </div>

            <MagneticButton className="primary-button px-6 py-4 text-white font-medium flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              رزرو تجهیزات
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
