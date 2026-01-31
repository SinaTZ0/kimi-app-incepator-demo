import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, BookOpen, Network, Star, Mail } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const mentors = [
  {
    name: 'Dr. Sarah Chen',
    role: 'AI Research Lead',
    expertise: 'Machine Learning',
    image: '/mentor_portrait.jpg',
    rating: 4.9,
    reviews: 28,
  },
  {
    name: 'Prof. Michael Torres',
    role: 'Venture Advisor',
    expertise: 'Entrepreneurship',
    image: '/hero_portrait.jpg',
    rating: 4.8,
    reviews: 34,
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Biotech Specialist',
    expertise: 'Health Tech',
    image: '/research_lab_scene.jpg',
    rating: 5.0,
    reviews: 21,
  },
];

const mentorTypes = [
  { icon: Award, label: 'Builders', desc: 'Hands-on creators who help you ship' },
  { icon: BookOpen, label: 'Reviewers', desc: 'Critical feedback on your work' },
  { icon: Network, label: 'Connectors', desc: 'Network access and introductions' },
];

export default function FacultyMentorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.mentor-card');
      
      gsap.fromTo(cardElements, 
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="faculty"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-indigo" />
            <span className="label-mono text-indigo">Our Team</span>
          </div>
          <h2 className="text-display-2 text-text-primary mb-4">
            Guides, Not Gatekeepers
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Our mentors are builders, reviewers, and connectors—here to accelerate your work.
          </p>
        </div>

        {/* Mentor Types */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {mentorTypes.map((type, i) => (
            <div 
              key={i} 
              className="glass-card px-6 py-4 flex items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo/20 flex items-center justify-center">
                <type.icon className="w-5 h-5 text-indigo" />
              </div>
              <div>
                <h4 className="font-display font-medium text-text-primary">{type.label}</h4>
                <p className="text-sm text-text-secondary">{type.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mentor Cards - Horizontal Scroll on Mobile */}
        <div 
          ref={cardsRef}
          className="flex flex-col md:flex-row gap-6 mb-12 overflow-x-auto pb-4"
        >
          {mentors.map((mentor, i) => (
            <div 
              key={i} 
              className="mentor-card glass-card overflow-hidden flex-shrink-0 md:w-80 opacity-0 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base to-transparent" />
                
                {/* Rating badge */}
                <div className="absolute top-4 right-4 glass-button px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium">{mentor.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-display font-semibold text-text-primary mb-1">
                  {mentor.name}
                </h3>
                <p className="text-indigo text-sm mb-1">{mentor.role}</p>
                <p className="text-text-secondary text-sm mb-4">{mentor.expertise}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{mentor.reviews} reviews</span>
                  <button className="glass-button p-2 hover:bg-indigo/20 transition-colors">
                    <Mail className="w-4 h-4 text-indigo" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <MagneticButton className="primary-button px-8 py-4 text-white font-medium inline-flex items-center gap-2">
            Browse All Mentors
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
