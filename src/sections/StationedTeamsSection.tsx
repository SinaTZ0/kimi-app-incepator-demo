import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building2, Users, Calendar, ExternalLink, Rocket, Target, Briefcase } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const stationedTeams = [
  {
    name: "NeuralFlow AI",
    logo: "/team_neuralflow.jpg",
    industry: "Artificial Intelligence",
    description: "Building next-gen neural network optimization tools for enterprise ML pipelines.",
    members: 8,
    founded: "2024",
    stage: "Series A",
    color: "from-violet-500/20 to-indigo-500/20",
  },
  {
    name: "GreenGrid Energy",
    logo: "/team_greengrid.jpg",
    industry: "Clean Tech",
    description: "Smart grid solutions for renewable energy management and distribution.",
    members: 6,
    founded: "2023",
    stage: "Seed",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "MedSync Health",
    logo: "/team_medsync.jpg",
    industry: "Health Tech",
    description: "AI-powered patient monitoring and predictive healthcare analytics platform.",
    members: 10,
    founded: "2024",
    stage: "Pre-Seed",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    name: "QuantumLeap Labs",
    logo: "/team_quantumleap.jpg",
    industry: "Quantum Computing",
    description: "Developing quantum algorithms for financial modeling and optimization.",
    members: 5,
    founded: "2025",
    stage: "Pre-Seed",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "EduVerse XR",
    logo: "/team_eduverse.jpg",
    industry: "EdTech",
    description: "Immersive VR/AR educational experiences for K-12 STEM learning.",
    members: 7,
    founded: "2024",
    stage: "Seed",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    name: "AgriBot Systems",
    logo: "/team_agribot.jpg",
    industry: "AgTech",
    description: "Autonomous farming robots and precision agriculture solutions.",
    members: 9,
    founded: "2023",
    stage: "Series A",
    color: "from-lime-500/20 to-green-500/20",
  },
];

const stats = [
  { value: "24", label: "Active Teams", icon: Building2 },
  { value: "180+", label: "Team Members", icon: Users },
  { value: "$15M", label: "Total Raised", icon: Target },
  { value: "6", label: "Exits", icon: Rocket },
];

export default function StationedTeamsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const industries = ["All", ...new Set(stationedTeams.map((t) => t.industry))];

  const filteredTeams =
    activeFilter === "All" ? stationedTeams : stationedTeams.filter((t) => t.industry === activeFilter);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      // Stats animation
      const statElements = section.querySelectorAll(".stat-item");
      gsap.fromTo(
        statElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statElements,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards animation
      const cardElements = cards.querySelectorAll(".team-card");
      gsap.fromTo(
        cardElements,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [filteredTeams]);

  return (
    <section ref={sectionRef} id="stationed-teams" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6">
            <Building2 className="w-4 h-4 text-indigo" />
            <span className="label-mono text-indigo">Stationed Teams</span>
          </div>
          <h2 className="text-display-2 text-text-primary mb-4">
            Startups <span className="text-gradient">In Residence</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Meet the innovative teams building the future from our incubator space. These startups have full access to
            our labs, mentors, and resources.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item glass-card p-6 text-center opacity-0">
              <div className="w-12 h-12 rounded-xl bg-indigo/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-indigo" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Industry Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === industry
                  ? "bg-indigo text-white"
                  : "glass-button text-text-secondary hover:text-text-primary"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Teams Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTeams.map((team) => (
            <div
              key={team.name}
              className="team-card glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300 opacity-0"
            >
              {/* Colored header */}
              <div className={`h-2 bg-gradient-to-r ${team.color}`} />

              <div className="p-6">
                {/* Team header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-1">{team.name}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-white/5 text-indigo">
                      {team.industry}
                    </span>
                  </div>
                  <button className="p-2 glass-button opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-6 line-clamp-2">{team.description}</p>

                {/* Team details */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Users className="w-4 h-4" />
                    <span>{team.members} members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span>Est. {team.founded}</span>
                  </div>
                </div>

                {/* Stage badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo" />
                    <span className="text-sm font-medium text-text-primary">{team.stage}</span>
                  </div>
                  <button className="text-indigo text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass-card p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-4">
            Ready to Join Our Incubator?
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            Apply for a stationed residency and get access to dedicated workspace, mentorship, funding opportunities,
            and our global network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton className="primary-button px-8 py-4 text-white font-medium inline-flex items-center gap-2">
              Apply for Residency
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton className="glass-button px-8 py-4 text-text-primary font-medium inline-flex items-center gap-2 hover:bg-white/10 transition-colors">
              Schedule a Tour
              <ExternalLink className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
