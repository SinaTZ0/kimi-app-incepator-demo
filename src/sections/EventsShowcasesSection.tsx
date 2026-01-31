import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: 'Spring Demo Day',
    date: 'Mar 14',
    time: '2:00 PM',
    location: 'Main Auditorium',
    description: 'Watch our top teams pitch their prototypes to investors and industry partners.',
  },
  {
    title: 'Research Ethics Workshop',
    date: 'Apr 08',
    time: '10:00 AM',
    location: 'Conference Room B',
    description: 'Learn best practices for ethical research and responsible innovation.',
  },
  {
    title: 'Partner Sprint Week',
    date: 'May 12',
    time: '9:00 AM',
    location: 'Innovation Hub',
    description: 'Intensive week of collaboration between students and industry partners.',
  },
];

export default function EventsShowcasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !cards || !cta) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation with stagger
      const cardElements = cards.querySelectorAll('.event-card');
      gsap.fromTo(cardElements, 
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // CTA animation
      gsap.fromTo(cta, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
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
      id="events"
      className="section-flowing z-[100] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <h2 className="text-display-2 text-text-primary mb-4">
            Events & Showcases
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Demos, hackathons, and public talks—open to the community. 
            Join us and be part of the innovation journey.
          </p>
        </div>

        {/* Event Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {events.map((event, i) => (
            <div 
              key={i} 
              className="event-card glass-card p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 opacity-0"
            >
              <div>
                <div className="flex items-center gap-2 text-indigo mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono text-sm font-medium">{event.date}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                  {event.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {event.description}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <button className="glass-button w-full mt-4 px-4 py-3 text-text-primary text-sm font-medium flex items-center justify-center gap-2">
                  Save a spot
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center opacity-0">
          <button className="primary-button px-8 py-4 text-white font-medium inline-flex items-center gap-2">
            Submit an event proposal
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
