import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Clock, Send, Twitter, Linkedin, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactApplySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("از پیام شما متشکریم! ظرف دو روز کاری پاسخ خواهیم داد.");
    setFormData({ name: "", email: "", organization: "", message: "" });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const contactCard = contactCardRef.current;
    const formCard = formCardRef.current;

    if (!section || !heading || !contactCard || !formCard) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Contact card animation
      gsap.fromTo(
        contactCard,
        { x: "-6vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactCard,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Form card animation
      gsap.fromTo(
        formCard,
        { x: "6vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formCard,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-flowing z-[120] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <h2 className="text-display-2 text-text-primary mb-4">بیایید آینده را بسازیم.</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            بگویید روی چه چیزی کار می‌کنید. ظرف دو روز کاری پاسخ می‌دهیم.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div ref={contactCardRef} className="glass-card p-10 opacity-0">
            <h3 className="text-2xl font-display font-semibold text-text-primary mb-8">در تماس باشید</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-indigo" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">ایمیل</p>
                  <p className="text-text-primary">hello@inceptor.center</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-indigo" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">مکان</p>
                  <p className="text-text-primary">
                    ساختمان نوآوری، اتاق ۴۰۱
                    <br />
                    پردیس دانشگاه
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-indigo" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">ساعات کاری</p>
                  <p className="text-text-primary">شنبه - پنج‌شنبه: ۹:۰۰ - ۱۸:۰۰</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-text-secondary text-sm mb-4">ما را دنبال کنید</p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl glass-button flex items-center justify-center hover:bg-white/15"
                >
                  <Twitter className="w-5 h-5 text-text-primary" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl glass-button flex items-center justify-center hover:bg-white/15"
                >
                  <Linkedin className="w-5 h-5 text-text-primary" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl glass-button flex items-center justify-center hover:bg-white/15"
                >
                  <Github className="w-5 h-5 text-text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div ref={formCardRef} className="glass-card p-10 opacity-0">
            <h3 className="text-2xl font-display font-semibold text-text-primary mb-8">ارسال پیام</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-text-secondary text-sm mb-2">نام</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-indigo/50 transition-colors"
                    placeholder="نام شما"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">ایمیل</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-indigo/50 transition-colors"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">سازمان</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-indigo/50 transition-colors"
                  placeholder="دانشگاه یا شرکت"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">پیام</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-indigo/50 transition-colors resize-none"
                  placeholder="درباره پروژه‌تان بگویید..."
                  required
                />
              </div>

              <button
                type="submit"
                className="primary-button w-full px-6 py-4 text-white font-medium flex items-center justify-center gap-2"
              >
                ارسال پیام
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-semibold text-text-primary">مرکز نوآوری</span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#research" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                پژوهش
              </a>
              <a href="#ventures" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                برنامه‌ها
              </a>
              <a href="#faculty" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                افراد
              </a>
              <a href="#industry" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                همکاران
              </a>
              <a href="#events" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                رویدادها
              </a>
              <a href="#contact" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                تماس
              </a>
            </nav>
            <p className="text-text-secondary text-sm">© مرکز نوآوری. تمامی حقوق محفوظ است.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
