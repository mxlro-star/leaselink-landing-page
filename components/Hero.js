"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({
    landlords: 0,
    properties: 0,
    satisfaction: 0
  });
  const [backgroundElements, setBackgroundElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animate counters
    const targetValues = {
      landlords: 1000,
      properties: 2500,
      satisfaction: 98
    };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const animations = {};

    Object.keys(targetValues).forEach(key => {
      let current = 0;
      const target = targetValues[key];
      const increment = target / steps;

      animations[key] = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(animations[key]);
        }
        setCounters(prev => ({ ...prev, [key]: Math.round(current) }));
      }, interval);
    });

    // Generate background elements on client side only
    const elements = Array.from({ length: 30 }, () => ({
      width: Math.random() * 400 + 100,
      height: Math.random() * 400 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 4,
      animationDuration: Math.random() * 10 + 15,
      opacity: Math.random() * 0.3
    }));
    setBackgroundElements(elements);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      Object.values(animations).forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-[#0A1930] via-[#1a365d] to-[#0A1930]">
      {/* Optional Video Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full scale-105 transform"
          poster="/video-poster.jpg"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        {/* Subtle video overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1930]/80 via-transparent to-[#0A1930]/80"></div>
      </div>

      {/* Refined background patterns - moved below video */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-[#0A1930]/80 via-[#1E3A8A]/20 to-[#0A1930]/80">
          {backgroundElements.map((element, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-white/[0.03] to-blue-300/[0.05]"
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
      </div>

      {/* Enhanced Trust Signals Bar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-[#0A1930]/90 backdrop-blur-md"></div>
        
        {/* Content */}
        <div className="relative container mx-auto px-3 py-2">
          <div className="flex justify-center items-center gap-4 md:gap-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs md:text-sm text-blue-50 font-medium">
                FCA Regulated
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <span className="text-xs md:text-sm text-blue-50 font-medium">
                Legal Protection
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content overlay - Mobile-first adjustments */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Content container with adjusted spacing */}
        <div className="relative w-full max-w-7xl mx-auto text-center transform-gpu transition-transform duration-100 -mt-16 md:mt-0"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`
          }}
        >
          {/* Floating trust indicators - Mobile optimized */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8 -mt-2 md:mt-0">
            {[
              { icon: "🔒", text: "Guaranteed Rent" },
              { icon: "💰", text: "Instant Valuation" },
              { icon: "🕒", text: "24/7 Support" }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white/10 to-blue-400/20 backdrop-blur-md rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-3 text-white flex items-center gap-2 transform hover:scale-105 transition-all duration-300 animate-float shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2)] border border-white/10"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="text-base md:text-xl">{item.icon}</span>
                <span className="font-semibold text-white drop-shadow-md text-xs md:text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Main heading - Mobile optimized */}
          <div className="relative mb-4 md:mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold animate-slide-in relative z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] px-2">
              <span className="inline-block transform hover:scale-105 transition-transform">
                <span className="bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent">Guaranteed</span>
              </span>
              {" "}
              <span className="inline-block relative">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Monthly</span>
              </span>
              {" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-br from-white via-blue-100 to-white bg-clip-text text-transparent">Income</span>
              </span>
              {" "}
              <span className="inline-block transform hover:scale-105 transition-transform">
                <span className="bg-gradient-to-l from-blue-100 via-white to-blue-100 bg-clip-text text-transparent">Without</span>
              </span>
              {" "}
              <span className="inline-block transform hover:scale-105 transition-transform">
                <span className="bg-gradient-to-l from-white via-blue-100 to-white bg-clip-text text-transparent">Hassle</span>
              </span>
            </h1>
          </div>

          {/* Enhanced subheading - Mobile optimized */}
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 relative px-2">
            <div className="text-lg md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-4 animate-slide-up drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <span className="relative inline-block px-2 py-1">
                <span className="relative z-10 text-blue-50">
                  3-10 Year Corporate Leases with
                </span>
              </span>
              {" "}
              <span className="relative inline-block px-2 py-1">
                <span className="relative z-10 text-blue-50">
                  Zero Tenant Headaches
                </span>
              </span>
            </div>
            
            {/* Animated features list - Mobile optimized */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-lg">
              {["👥 Buy-to-let Investors", "🏢 Portfolio Landlords", "📍 Article 4 Areas"].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 md:space-x-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md rounded-full px-3 py-1.5 md:px-4 md:py-2 animate-fade-in-up shadow-lg border border-white/10"
                  style={{ animationDelay: `${0.2 * (index + 1)}s` }}
                >
                  <span className="text-blue-50 font-medium drop-shadow-md text-xs md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Section - Mobile optimized */}
          <div className="mt-6 md:mt-8 space-y-3 md:space-y-4 px-2">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              {/* Primary CTA */}
              <div className="relative group animate-fade-in-up w-full md:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-white to-blue-500 rounded-full opacity-70 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-gradient"></div>
                <a
                  href="#contact"
                  className="relative w-full md:w-auto inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-blue-600 bg-white rounded-full transform transition-all duration-300 hover:scale-105 hover:text-blue-700 group shadow-xl"
                >
                  <span className="relative z-10">Instant Valuation</span>
                  <svg
                    className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              {/* Secondary CTA */}
              <div className="relative group animate-fade-in-up w-full md:w-auto" style={{ animationDelay: '0.2s' }}>
                <a
                  href="#book-call"
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 text-blue-50 hover:text-white border border-blue-200/30 rounded-full transform transition-all duration-300 hover:scale-105 group hover:border-blue-200/50 backdrop-blur-sm text-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Free Consultation
                </a>
              </div>
            </div>

            {/* Trust Badge - Mobile optimized */}
            <div className="inline-block animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-r from-blue-400/20 to-blue-500/20 backdrop-blur-sm text-blue-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm flex items-center gap-2 border border-white/10 shadow-lg">
                <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>24-Hour Response Guaranteed</span>
                <span className="text-xs text-blue-200">•</span>
                <span>No Obligation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Mobile optimized */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50">
        <span className="block text-xs md:text-sm mb-2 md:mb-3 text-blue-100 font-medium tracking-wide drop-shadow-lg">
          Scroll to Explore
        </span>
        <div className="relative w-6 h-10 md:w-7 md:h-12 mx-auto filter drop-shadow-lg">
          {/* Hand SVG with animated finger */}
          <svg 
            viewBox="0 0 24 36" 
            fill="none" 
            className="w-full h-full transform -rotate-12"
          >
            {/* Palm with glow effect */}
            <path 
              d="M12 2C7.58172 2 4 5.58172 4 10V26C4 30.4183 7.58172 34 12 34C16.4183 34 20 30.4183 20 26V10C20 5.58172 16.4183 2 12 2Z" 
              className="stroke-blue-100"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
            {/* Scrolling Finger Animation */}
            <path 
              d="M12 8V14" 
              className="stroke-white" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              style={{
                animation: 'scrollFinger 2s ease-in-out infinite'
              }}
            />
            {/* Glow filter */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Animated Dots with enhanced visibility */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-100/80 animate-fadeInOut delay-100 drop-shadow-lg"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-100/80 animate-fadeInOut delay-200 drop-shadow-lg"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-100/80 animate-fadeInOut delay-300 drop-shadow-lg"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollFinger {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.9;
          }
          50% {
            transform: translateY(6px);
            opacity: 1;
          }
        }
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-scroll-finger {
          animation: scrollFinger 2s ease-in-out infinite;
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
} 