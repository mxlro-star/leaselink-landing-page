"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center h-screen overflow-hidden"
      style={{ backgroundImage: "url('/hero-bg.webp')" }}
    >
      {/* Dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-trust/80 via-trust/60 to-trust/40"></div>

      {/* Animated content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 mx-auto max-w-7xl">
        <div 
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Trust indicators */}
          <div className="flex justify-center space-x-4 mb-8 animate-fade-in-up">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-trust text-sm font-semibold shadow-glow">
              ✓ Trusted by 1000+ Landlords
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-trust text-sm font-semibold shadow-glow">
              ✓ 24/7 Support
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-trust text-sm font-semibold shadow-glow">
              ✓ Guaranteed Rent
            </div>
          </div>

          {/* Main content with glass effect */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-glow-lg border border-white/20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-slide-in">
              Get Your Long-Term Lease Today
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto animate-slide-up delay-300">
              Enjoy guaranteed rent, stress-free management, and secure contracts designed for buy-to-let investors, portfolio landlords, accidental landlords, and those in Article 4 Areas.
            </p>
            <p className="text-md md:text-lg mb-8 text-white/80 animate-slide-up delay-500">
              Free, no-obligation consultation with response within 24 hours.
            </p>
            
            {/* CTA Button with dynamic effects */}
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-trust-light via-trust to-trust-dark rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <a
                href="#contact"
                className="relative bg-white text-trust hover:bg-trust hover:text-white font-semibold py-4 px-8 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center space-x-2 animate-pulse-slow"
              >
                <span>Get a Long-Term Lease Today</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white text-sm mb-2">Scroll to explore</span>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dynamic background elements */}
      <div className="absolute inset-0 bg-trust mix-blend-multiply opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-trust/20 via-transparent to-transparent"></div>
    </section>
  );
} 