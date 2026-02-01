import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "پژوهش", href: "#research" },
  { label: "برنامه‌ها", href: "#ventures" },
  { label: "افراد", href: "#faculty" },
  { label: "همکاران", href: "#industry" },
  { label: "رویدادها", href: "#events" },
  { label: "تماس", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="glass-card mx-4 mt-4 px-6 py-4 flex items-center gap-20">
          <a href="#" className="text-lg font-display font-semibold text-text-primary">
            مرکز نوآوری
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 glass-button flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Static Logo (visible when not scrolled) */}
      <div
        className={`fixed top-6 right-6 z-[200] transition-opacity duration-500 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="text-lg font-display font-semibold text-text-primary">مرکز نوآوری</span>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[190] transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-dark-base/90 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-display text-text-primary hover:text-indigo transition-colors"
              style={{
                transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : "0ms",
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            className="primary-button mt-8 px-8 py-4 text-white font-medium"
            style={{
              transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            درخواست منتورشیپ
          </button>
        </div>
      </div>
    </>
  );
}
