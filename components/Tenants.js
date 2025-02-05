"use client";
import { useState, useEffect } from "react";

export default function Tenants() {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundElements, setBackgroundElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate background elements on client side only
    const elements = Array.from({ length: 15 }, () => ({
      width: Math.random() * 300 + 100,
      height: Math.random() * 300 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 4,
      animationDuration: Math.random() * 10 + 15,
      opacity: Math.random() * 0.3
    }));
    setBackgroundElements(elements);
  }, []);

  const tenantTypes = [
    {
      title: "Students & Trainees",
      description: "High-quality accommodation for medical students, PhD researchers, and professional trainees from prestigious institutions.",
      icon: "🎓",
      features: [
        "Medical & PhD Students",
        "Professional Development Programs",
        "Research Fellows",
        "Verified Academic Status"
      ],
      stats: {
        value: "3yr+",
        label: "Average Stay"
      }
    },
    {
      title: "Health & Social Care",
      description: "Dedicated housing solutions for healthcare professionals, including NHS staff, care workers, and medical practitioners.",
      icon: "⚕️",
      features: [
        "NHS Medical Staff",
        "Care Home Workers",
        "Mental Health Professionals",
        "Social Workers"
      ],
      stats: {
        value: "24/7",
        label: "Essential Workers"
      }
    },
    {
      title: "Corporate Professionals",
      description: "Premium accommodations for business executives, consultants, and employees from established companies.",
      icon: "💼",
      features: [
        "Business Executives",
        "Corporate Relocations",
        "International Professionals",
        "Long-term Contracts"
      ],
      stats: {
        value: "AAA",
        label: "Corporate Rating"
      }
    },
    {
      title: "Supported Accommodation",
      description: "Specialized housing solutions with integrated support services for individuals requiring additional assistance and care.",
      icon: "🏡",
      features: [
        "24/7 Support Staff",
        "Adapted Living Spaces",
        "Care Package Integration",
        "Professional Support Network"
      ],
      stats: {
        value: "100%",
        label: "Care Compliance"
      }
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#1a365d] via-[#0A1930] to-[#1a365d]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1930]/80 via-[#1E3A8A]/20 to-[#0A1930]/80" />
        {backgroundElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-white/[0.03] to-blue-300/[0.05] transition-opacity duration-1000"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
              animationDuration: `${element.animationDuration}s`,
              opacity: element.opacity
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Who Lives in These Properties?
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto mb-8">
            Our properties are home to <span className="text-white font-semibold">verified professionals and organizations</span> who value long-term, stable living arrangements
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Interactive Tenant Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {tenantTypes.map((type, index) => (
              <div
                key={index}
                className={`
                  relative transition-all duration-500 group
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Main Content Area */}
                <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10">
                  {/* Header Section */}
                  <div className="relative p-6 bg-gradient-to-r from-blue-600/20 to-violet-600/20">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-violet-500/20 flex items-center justify-center text-3xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {type.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{type.title}</h3>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-blue-200 text-sm">{type.stats.value} {type.stats.label}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description and Features */}
                  <div className="p-6 bg-gradient-to-br from-blue-900/10 to-violet-900/10">
                    <p className="text-blue-100/80 mb-6">
                      {type.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {type.features.map((feature, fIndex) => (
                        <div 
                          key={fIndex}
                          className="flex items-center gap-2 group/feature"
                        >
                          <div className="w-1 h-1 rounded-full bg-blue-400 group-hover/feature:w-2 transition-all duration-300"></div>
                          <span className="text-sm text-blue-200/90 group-hover/feature:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500/0 via-violet-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-violet-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-br from-violet-400/10 to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-xl blur-md opacity-50"></div>
              <div className="relative px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-gray-100/90 via-white/95 to-gray-200/90 border border-white/50 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                {/* Particle Effects Container */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-0 group-hover:animate-particle-emit"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 45}deg)`,
                        '--particle-angle': `${i * 45}deg`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Radial Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/0 via-white/30 to-gray-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-300 via-white to-gray-400 flex items-center justify-center shadow-inner relative">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-white/50 rounded-full filter blur-sm group-hover:animate-pulse-slow"></div>
                  </div>
                  <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">100% Verified Tenants</span>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-xl blur-md opacity-50"></div>
              <div className="relative px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-gray-100/90 via-white/95 to-gray-200/90 border border-white/50 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                {/* Particle Effects Container */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-0 group-hover:animate-particle-emit"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 45}deg)`,
                        '--particle-angle': `${i * 45}deg`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Radial Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/0 via-white/30 to-gray-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-300 via-white to-gray-400 flex items-center justify-center shadow-inner relative">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-white/50 rounded-full filter blur-sm group-hover:animate-pulse-slow"></div>
                  </div>
                  <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">Professional References</span>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-xl blur-md opacity-50"></div>
              <div className="relative px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-gray-100/90 via-white/95 to-gray-200/90 border border-white/50 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                {/* Particle Effects Container */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-0 group-hover:animate-particle-emit"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 45}deg)`,
                        '--particle-angle': `${i * 45}deg`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Radial Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/0 via-white/30 to-gray-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-300 via-white to-gray-400 flex items-center justify-center shadow-inner relative">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-white/50 rounded-full filter blur-sm group-hover:animate-pulse-slow"></div>
                  </div>
                  <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">Regular Property Inspections</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes particle-emit {
          0% {
            transform: rotate(var(--particle-angle)) translateX(0px);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--particle-angle)) translateX(50px);
            opacity: 0;
          }
        }
        .animate-particle-emit {
          animation: particle-emit 1s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
} 