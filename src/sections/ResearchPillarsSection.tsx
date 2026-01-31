import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Microscope, Leaf, Heart, Cpu, Beaker } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { 
    icon: Microscope, 
    label: 'AI & Machine Learning',
    description: 'Neural networks, deep learning, and intelligent systems',
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  { 
    icon: Leaf, 
    label: 'Climate & Sustainability',
    description: 'Green tech, carbon capture, and renewable energy',
    color: 'from-green-500/20 to-emerald-500/20'
  },
  { 
    icon: Heart, 
    label: 'Health & Biotech',
    description: 'Medical devices, genomics, and therapeutics',
    color: 'from-rose-500/20 to-pink-500/20'
  },
  { 
    icon: Cpu, 
    label: 'Systems & Engineering',
    description: 'Robotics, IoT, and autonomous systems',
    color: 'from-amber-500/20 to-orange-500/20'
  },
];

export default function ResearchPillarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.pillar-card');
      
      gsap.fromTo(cardElements, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="research"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6">
            <Beaker className="w-4 h-4 text-indigo" />
            <span className="label-mono text-indigo">Our Focus Areas</span>
          </div>
          <h2 className="text-display-2 text-text-primary mb-4">
            Research Pillars
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We turn complex challenges into testable prototypes—across disciplines, at speed.
          </p>
        </div>

        {/* Pillar Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pillars.map((pillar, i) => (
            <div 
              key={i} 
              className={`pillar-card glass-card p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 opacity-0`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo/20 flex items-center justify-center">
                    <pillar.icon className="w-7 h-7 text-indigo" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-secondary group-hover:text-indigo group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                  {pillar.label}
                </h3>
                <p className="text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <MagneticButton className="primary-button px-8 py-4 text-white font-medium inline-flex items-center gap-2">
            Explore All Research
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
