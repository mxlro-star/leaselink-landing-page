"use client";
import { useState, useEffect } from "react";

export default function Process() {
  const [activeStep, setActiveStep] = useState(null);
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

  const steps = [
    {
      number: "1",
      title: "Submit Your Property",
      description: "Fill out a quick form with your property details. Expect a follow-up within 24 hours.",
      icon: "📝",
      stat: "2 Min Form",
      highlight: "Quick & Easy"
    },
    {
      number: "2",
      title: "Get Matched",
      description: "We identify the best company lease tenant tailored to buy-to-let investors, portfolio, and accidental landlords.",
      icon: "🤝",
      stat: "24h Response",
      highlight: "Perfect Match"
    },
    {
      number: "3",
      title: "Sign Agreement",
      description: "Secure a legally binding contract with our pre-designed templates to protect your interests.",
      icon: "✍️",
      stat: "100% Secure",
      highlight: "Protected"
    },
    {
      number: "4",
      title: "Start Earning",
      description: "Receive guaranteed monthly payments with a hassle-free, streamlined process.",
      icon: "💰",
      stat: "£2500 Avg/mo",
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
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto">
            Your journey to hassle-free property management in{" "}
            <span className="text-white font-semibold">4 simple steps</span>
          </p>
        </div>

        <div className="relative">
          {/* Timeline line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`
                  relative transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className={`
                  relative rounded-2xl p-6 md:p-8 transition-all duration-300
                  ${activeStep === index ? 'transform scale-105' : 'hover:scale-102'}
                  overflow-hidden backdrop-blur-sm border border-white/10
                  bg-gradient-to-br from-white/[0.05] to-blue-500/[0.05]
                `}>
                  {/* Step number with animated ring */}
                  <div className="relative mb-6">
                    <div className={`
                      w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20
                      flex items-center justify-center text-2xl font-bold text-white
                      relative z-10 mx-auto transition-transform duration-300
                      ${activeStep === index ? 'scale-110' : ''}
                    `}>
                      {step.number}
                      <div className={`
                        absolute inset-0 rounded-xl border border-blue-400/30
                        transition-transform duration-500
                        ${activeStep === index ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}
                      `} />
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="text-3xl mb-4 text-center">
                    <span className={`inline-block transition-transform duration-300 ${activeStep === index ? 'scale-125' : ''}`}>
                      {step.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white text-center">
                    {step.title}
                  </h3>
                  <p className="text-blue-100/80 mb-4 text-center text-sm md:text-base">
                    {step.description}
                  </p>

                  {/* Stats and Highlight */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-400/20">
                    <div className="text-center flex-1">
                      <div className="text-lg font-semibold text-white">
                        {step.stat}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
                    <div className="text-center flex-1">
                      <div className="text-sm text-blue-200/90">
                        {step.highlight}
                      </div>
                    </div>
                  </div>

                  {/* Connector line with animated dot for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <div className={`
                        absolute top-1/2 right-0 w-2 h-2 rounded-full
                        transition-all duration-300
                        ${activeStep === index || activeStep === index + 1 ? 'bg-blue-400 scale-150' : 'bg-blue-400/40 scale-100'}
                      `} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 