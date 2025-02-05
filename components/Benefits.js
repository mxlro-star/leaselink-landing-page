"use client";
import { useState, useEffect } from "react";

export default function Benefits() {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      icon: "💰",
      title: "Guaranteed Rent",
      description: "No void periods, consistent income.",
      stat: "100%",
      statLabel: "Payment Guarantee",
      highlight: "Monthly income secured"
    },
    {
      icon: "🏠",
      title: "Stress-Free Management",
      description: "Complete tenant handling and property maintenance.",
      stat: "95%",
      statLabel: "Time Saved",
      highlight: "Full service solution"
    },
    {
      icon: "📋",
      title: "Long-Term Security",
      description: "Extended contract periods for peace of mind.",
      stat: "10yr",
      statLabel: "Max Contract Length",
      highlight: "Flexible terms"
    },
    {
      icon: "🌟",
      title: "Professional Service",
      description: "Expert support and maintenance coverage.",
      stat: "98%",
      statLabel: "Client Satisfaction",
      highlight: "Trusted by landlords"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#0A1930] via-[#1a365d] to-[#0A1930]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1930]/80 via-[#1E3A8A]/20 to-[#0A1930]/80" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-white/[0.03] to-blue-300/[0.05] transition-opacity duration-1000"
            style={{
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's',
              animationDuration: Math.random() * 10 + 15 + 's',
              opacity: Math.random() * 0.3
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Why Choose a Company Lease?
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto">
            Join <span className="text-white font-semibold">1000+ satisfied landlords</span> who've discovered the benefits of hassle-free property management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={`
                relative rounded-2xl p-6 md:p-8 transition-all duration-300
                ${activeCard === index ? 'transform scale-105' : 'hover:scale-102'}
                overflow-hidden backdrop-blur-sm
                border border-white/10
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
                background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(37,99,235,0.05))'
              }}>
                {/* Animated background gradient */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent
                  transition-opacity duration-500
                  ${activeCard === index ? 'opacity-100' : 'opacity-0'}
                `} />

                {/* Icon with bounce effect */}
                <div className="relative mb-4">
                  <div className={`
                    w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400/10 to-blue-600/10
                    flex items-center justify-center text-3xl
                    transition-transform duration-300
                    ${activeCard === index ? 'scale-110' : ''}
                  `}>
                    <span className={`transition-transform duration-300 ${activeCard === index ? 'animate-bounce' : ''}`}>
                      {benefit.icon}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                  {benefit.title}
                </h3>
                <p className="text-blue-100/80 mb-4 text-sm md:text-base">
                  {benefit.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {benefit.stat}
                    </div>
                    <div className="text-xs md:text-sm text-blue-200/70">
                      {benefit.statLabel}
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
                  <div className="text-right">
                    <div className="text-sm text-blue-100/90 font-medium">
                      {benefit.highlight}
                    </div>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border border-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 