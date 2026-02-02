import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, Plane, Users, MapPin } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { city: "تهران", role: "دفتر مرکزی", partners: 45 },
  { city: "دبی", role: "مرکز خاورمیانه", partners: 28 },
  { city: "استانبول", role: "اروپا", partners: 22 },
  { city: "کوالالامپور", role: "مرکز پژوهش", partners: 18 },
];

const networkFeatures = [
  { icon: Globe, label: "تیم‌های راه‌دور", desc: "همکاری جهانی" },
  { icon: Plane, label: "برنامه‌های تبادل", desc: "پژوهشگران مهمان" },
  { icon: Users, label: "منابع مشترک", desc: "استانداردهای مشترک" },
];

export default function GlobalNetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    const locationsContainer = locationsRef.current;
    if (!section || !map || !locationsContainer) return;

    const ctx = gsap.context(() => {
      // Map reveal
      gsap.fromTo(
        map,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 45%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Location pins
      const pins = locationsContainer.querySelectorAll(".location-pin");
      gsap.fromTo(
        pins,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: locationsContainer,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="global" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6 border-indigo-300 rounded-full">
              <Globe className="w-4 h-4 text-indigo" />
              <span className="text-sm text-[#FFC107]">دسترسی جهانی</span>
            </div>

            <h2 className="text-display-2 text-text-primary mb-6">
              همکاری
              <span className="block text-gradient">فرامرزی</span>
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              تیم‌های راه‌دور، پژوهشگران مهمان و زیرساخت مشترک—متصل با استانداردهای مشترک. به شبکه‌ای بپیوندید که
              قاره‌ها و رشته‌ها را در بر می‌گیرد.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {networkFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo/20 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-indigo" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-text-primary">{feature.label}</h4>
                    <p className="text-sm text-text-secondary">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <MagneticButton className="primary-button px-6 py-4 text-white font-medium flex items-center gap-2">
              پیوستن به عنوان پژوهشگر مهمان
              <ArrowRight className="w-5 h-5 rotate-180" />
            </MagneticButton>
          </div>

          {/* Right - Visual Map Representation */}
          <div ref={mapRef} className="relative opacity-0">
            <div className="glass-card overflow-hidden aspect-square relative">
              <img src="/global_network_map_room.jpg" alt="شبکه جهانی" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo/20 to-purple/20" />
            </div>

            {/* Location Pins */}
            <div ref={locationsRef} className="absolute inset-0">
              {locations.map((loc, i) => (
                <div
                  key={i}
                  className="location-pin absolute glass-card px-3 py-2 flex items-center gap-2 opacity-0"
                  style={{
                    top: `${20 + (i % 2) * 40}%`,
                    right: `${10 + (i % 2) * 50}%`,
                  }}
                >
                  <MapPin className="w-4 h-4 text-indigo" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{loc.city}</div>
                    <div className="text-xs text-text-secondary">{loc.partners} همکار</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
