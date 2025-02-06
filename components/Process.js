"use client";
import { useState, useEffect } from "react";

export default function Process() {
  const [activeStep, setActiveStep] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundElements, setBackgroundElements] = useState([]);
  const [propertiesValued, setPropertiesValued] = useState("1,257");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const isTouchDevice = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
      setIsMobile(isTouchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    setIsVisible(true);
    
    // Calculate properties valued based on time
    const baseProperties = 1257;
    const propertiesPerDay = 35;
    const startDate = new Date('2025-01-01').getTime();
    const currentDate = new Date().getTime();
    const daysSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const totalProperties = baseProperties + (daysSinceStart * propertiesPerDay);
    setPropertiesValued(totalProperties.toLocaleString());

    // Generate background elements
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

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const steps = [
    {
      number: "1",
      title: "Get Your Birmingham Property Valuation",
      description: "Join leading West Midlands landlords who've discovered their true rental potential. Takes only 30 seconds.",
      icon: "⚡",
      stat: "30 Sec",
      highlight: "Free Analysis",
      metrics: {
        accuracy: "97%"
      }
    },
    {
      number: "2",
      title: "Expert Local Matching",
      description: "Our Birmingham property management team identifies the ideal corporate tenant for buy-to-let investors and portfolio landlords.",
      icon: "🤝",
      stat: "24h Response",
      highlight: "Perfect Match"
    },
    {
      number: "3",
      title: "Secure Agreement",
      description: "Get a legally-binding guaranteed rent contract, tailored for Birmingham and West Midlands properties.",
      icon: "✍️",
      stat: "100% Secure",
      highlight: "Protected"
    },
    {
      number: "4",
      title: "Start Earning",
      description: "Join Birmingham's leading guaranteed rent scheme with hassle-free, guaranteed monthly payments.",
      icon: "💰",
      stat: "Day 1",
      highlight: "Guaranteed"
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
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Birmingham's Leading Guaranteed Rent Scheme
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto">
            Your journey to hassle-free property management in the{" "}
            <span className="text-white font-semibold">West Midlands</span> in{" "}
            <span className="text-white font-semibold">4 simple steps</span>
          </p>
        </div>

        <div className="relative">
          {/* Timeline line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative min-h-[24rem] sm:min-h-[26rem]"
              >
                <div className={`
                  relative rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300
                  ${activeStep === index ? 'transform scale-[1.02]' : 'hover:scale-[1.01]'}
                  overflow-hidden backdrop-blur-sm border border-white/10
                  bg-gradient-to-br ${index === 0 ? 'from-emerald-500/80 to-green-600/80 hover:from-emerald-500/90 hover:to-green-600/90' : 'from-indigo-600/90 to-violet-700/90 hover:from-indigo-600 hover:to-violet-700'}
                  flex flex-col h-full justify-between
                  ${index === 0 ? 'cursor-pointer group/card shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30' : 'shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30'}
                `}>
                  {/* Step number with animated ring */}
                  <div className="relative mb-6">
                    <div className={`
                      w-14 h-14 rounded-xl 
                      ${index === 0 ? 'bg-gradient-to-br from-green-300/90 via-emerald-400/90 to-green-500/90 group-hover/card:from-green-300 group-hover/card:via-emerald-400 group-hover/card:to-green-500' : 'bg-gradient-to-br from-violet-300/30 to-indigo-600/30'}
                      flex items-center justify-center text-2xl font-bold text-white
                      relative z-10 mx-auto transition-transform duration-300
                      ${activeStep === index ? 'scale-110' : ''}
                    `}>
                      {index === 0 ? (
                        <div className="relative">
                          {/* Main flash icon */}
                          <svg className="w-8 h-8 transform transition-all duration-300 group-hover/card:scale-110" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              d="M13 3L4 14H12L11 21L20 10H12L13 3Z" 
                              className="animate-flash-glow"
                              stroke="url(#goldGradient)"
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFD700" />
                                <stop offset="50%" stopColor="#FFC107" />
                                <stop offset="100%" stopColor="#FF8F00" />
                              </linearGradient>
                            </defs>
                          </svg>
                          
                          {/* Speed lines */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 absolute">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute inset-0 animate-speed-line"
                                  style={{
                                    border: '2px solid rgba(255, 215, 0, 0.4)',
                                    borderRadius: '50%',
                                    animationDelay: `${i * 0.2}s`
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Particle effects */}
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 rounded-full animate-particle"
                              style={{
                                background: 'linear-gradient(to right, #FFD700, #FFC107)',
                                left: '50%',
                                top: '50%',
                                transform: `rotate(${i * 60}deg) translateX(8px)`,
                                animationDelay: `${i * 0.1}s`,
                                boxShadow: '0 0 4px rgba(255, 215, 0, 0.6)',
                                pointerEvents: 'none',
                                zIndex: 0
                              }}
                            />
                          ))}

                          {/* Add radial glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 blur-xl rounded-full animate-pulse-slow" style={{ pointerEvents: 'none', zIndex: 0 }}></div>
                        </div>
                      ) : (
                        step.number
                      )}
                      <div className={`
                        absolute inset-0 rounded-xl border border-white/30
                        transition-transform duration-500
                        ${activeStep === index ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}
                      `} />
                    </div>
                  </div>

                  {/* Remove the duplicate icon section for first card */}
                  {index !== 0 && (
                    <div className="text-3xl mb-4 text-center">
                      <span className={`inline-block transition-transform duration-300 
                        ${activeStep === index ? 'scale-125' : ''}
                      `}>
                        {step.icon}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className={`text-xl md:text-2xl font-semibold mb-3 text-white text-center
                      ${index === 0 ? 'group-hover/card:text-emerald-200' : 'group-hover:text-violet-100'}
                    `}>
                      {step.title}
                    </h3>
                    <p className={`mb-4 text-center text-sm md:text-base
                      ${index === 0 ? 'text-blue-100/80' : 'text-violet-100/90'}
                    `}>
                      {step.description}
                    </p>
                    
                    {/* Update metrics panel for first card */}
                    {index === 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-4 p-3 rounded-lg bg-emerald-900/20 border border-emerald-400/20">
                        <div className="text-center">
                          <div className="text-xl font-bold text-white group-hover/card:text-emerald-200">
                            {propertiesValued}
                          </div>
                          <div className="text-xs text-emerald-200/90">
                            Properties Valued
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-white group-hover/card:text-emerald-200">
                            110%
                          </div>
                          <div className="text-xs text-emerald-200/90">
                            vs National Average
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Update CTA button for first card */}
                    {index === 0 && (
                      <div className="mt-4 text-center">
                        <div className={`
                          inline-flex items-center justify-center px-6 py-3 
                          bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400
                          rounded-lg transform transition-all duration-300 
                          shadow-[0_0_15px_rgba(251,191,36,0.3)]
                          relative overflow-hidden isolate
                          border border-amber-300/30
                          ${isMobile ? 'animate-mobile-button' : 'group/button hover:from-amber-300 hover:via-yellow-300 hover:to-amber-300'}
                          ${isMobile ? 'active:scale-95' : 'group-hover/card:scale-105'}
                        `}>
                          {/* Animated gradient overlay */}
                          <div className={`
                            absolute inset-0 -z-10
                            ${isMobile 
                              ? 'bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.6)_40%,transparent_60%)] animate-mobile-shine'
                              : 'bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.6)_40%,transparent_60%)] animate-[shine_1.5s_ease-in-out_infinite]'
                            }
                          `}></div>

                          {/* Button content */}
                          <span className="text-amber-900 font-bold text-lg relative z-10">
                            Calculate Now
                          </span>
                          
                          {/* Arrow */}
                          <div className={`
                            relative ml-2 z-10
                            ${isMobile ? 'animate-mobile-arrow' : 'group-hover/button:translate-x-1 transition-transform duration-300'}
                          `}>
                            <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stats and Highlight */}
                  <div className={`
                    flex items-center justify-between mt-4 pt-4 border-t
                    ${index === 0 ? 'border-emerald-400/20' : 'border-violet-400/20'}
                  `}>
                    <div className="text-center flex-1">
                      <div className={`text-lg font-semibold text-white
                        ${index === 0 ? 'group-hover/card:text-emerald-200' : 'group-hover:text-violet-100'}
                      `}>
                        {step.stat}
                      </div>
                    </div>
                    <div className={`h-8 w-px bg-gradient-to-b from-transparent ${index === 0 ? 'via-emerald-400/20' : 'via-violet-400/30'} to-transparent`} />
                    <div className="text-center flex-1">
                      <div className={`text-sm
                        ${index === 0 ? 'text-emerald-200/90 group-hover/card:text-white' : 'text-violet-200/90 group-hover:text-white'}
                      `}>
                        {step.highlight}
                      </div>
                    </div>
                  </div>

                  {/* Add pulsing arrow for first card */}
                  {index === 0 && (
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="animate-pulse">
                        <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flash-glow {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.8));
          }
        }

        @keyframes speed-line {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
            border-color: rgba(255, 215, 0, 0.4);
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
            border-color: rgba(255, 215, 0, 0.1);
          }
        }

        @keyframes particle {
          0% {
            transform: rotate(var(--rotation)) translateX(10px) scale(1);
            opacity: 1;
            background: linear-gradient(to right, #FFD700, #FFC107);
          }
          100% {
            transform: rotate(var(--rotation)) translateX(20px) scale(0);
            opacity: 0;
            background: linear-gradient(to right, #FFC107, #FF8F00);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes particle-burst {
          0% {
            transform: rotate(var(--rotation)) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation)) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skew(-15deg);
          }
          100% {
            transform: translateX(200%) skew(-15deg);
          }
        }

        @keyframes mobile-shine {
          0% {
            transform: translateX(-200%) skew(-15deg);
          }
          100% {
            transform: translateX(200%) skew(-15deg);
          }
        }

        @keyframes mobile-arrow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }

        @keyframes mobile-button {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(251,191,36,0.3);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 25px rgba(251,191,36,0.5);
          }
        }

        .animate-flash-glow {
          animation: flash-glow 1.5s ease-in-out infinite;
        }

        .animate-speed-line {
          animation: speed-line 1.5s ease-out infinite;
        }

        .animate-particle {
          animation: particle 1s ease-out infinite;
          --rotation: 0deg;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-pulse-fast {
          animation: pulse 1s ease-in-out infinite;
        }

        .animate-mobile-shine {
          animation: mobile-shine 3s ease-in-out infinite;
        }

        .animate-mobile-button {
          animation: mobile-button 2s ease-in-out infinite;
        }

        .animate-mobile-arrow {
          animation: mobile-arrow 2s ease-in-out infinite;
        }

        .animate-mobile-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
} 