import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, Lightbulb, TrendingUp, DollarSign, GraduationCap, Shield } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Users, label: 'Mentorship', desc: '1:1 guidance from industry experts' },
  { icon: Shield, label: 'Legal Clinics', desc: 'IP protection & incorporation' },
  { icon: DollarSign, label: 'Micro-grants', desc: 'Up to $25K in funding' },
  { icon: GraduationCap, label: 'Workshops', desc: 'Business & technical skills' },
];

const cohortStats = [
  { value: '45+', label: 'Teams Launched' },
  { value: '$2M+', label: 'Funding Raised' },
  { value: '12', label: 'Weeks Program' },
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
      gsap.fromTo(image, 
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Benefits stagger
      const benefitCards = benefitsContainer.querySelectorAll('.benefit-card');
      gsap.fromTo(benefitCards, 
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: benefitsContainer,
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
      id="ventures"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Stats Bar */}
        <div className="glass-card p-6 mb-16">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-indigo" />
              <span className="label-mono text-indigo">Venture Track Results</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {cohortStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-text-primary">
                    {stat.value}
                  </div>
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
              <span className="label-mono text-indigo">Student Ventures</span>
            </div>

            <h2 className="text-display-2 text-text-primary mb-6">
              Build a Team.
              <span className="block text-gradient">Ship a Prototype.</span>
            </h2>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              From first concept to first customer—mentorship, legal clinics, and micro-grants included. 
              Turn your idea into a venture-ready business in just 12 weeks.
            </p>

            {/* Benefits Grid */}
            <div ref={benefitsRef} className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, i) => (
                <div 
                  key={i} 
                  className="benefit-card glass-card p-4 hover:bg-white/10 transition-colors opacity-0"
                >
                  <benefit.icon className="w-6 h-6 text-indigo mb-3" />
                  <h4 className="font-display font-medium text-text-primary mb-1">
                    {benefit.label}
                  </h4>
                  <p className="text-sm text-text-secondary">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <MagneticButton className="primary-button px-6 py-4 text-white font-medium flex items-center gap-2">
              Apply to the Venture Track
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </div>

          {/* Right Image with overlay */}
          <div 
            ref={imageRef}
            className="relative opacity-0"
          >
            <div className="glass-card overflow-hidden aspect-square">
              <img 
                src="/venture_team_working.jpg" 
                alt="Student venture team"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 via-transparent to-transparent" />
              
              {/* Quote overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <blockquote className="text-text-primary italic mb-2">
                  "The mentorship and funding helped us turn our class project into a real startup."
                </blockquote>
                <cite className="text-sm text-text-secondary not-italic">
                  — Alex Chen, Founder of DataFlow
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
