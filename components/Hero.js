"use client";
import { useState, useEffect } from "react";

const useOptimizedVideo = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Only load video if not on mobile and after initial page load
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      // Delay video load until after critical content
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return shouldLoadVideo;
};

export default function Hero() {
  const shouldLoadVideo = useOptimizedVideo();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [backgroundElements, setBackgroundElements] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Conversion-focused testimonials
  const testimonials = [
    {
      quote: "£2,450 guaranteed monthly income, no hassle, no void periods.",
      author: "James Wilson",
      role: "London Landlord",
      property: "2-Bed Apartment",
      increase: "+35%"
    },
    {
      quote: "From £1,800 to £2,900 per month with zero management stress.",
      author: "Sarah Ahmed",
      role: "Property Investor",
      property: "3-Bed House",
      increase: "+61%"
    },
    {
      quote: "My portfolio income increased by £37,000 annually.",
      author: "David Thompson",
      role: "Portfolio Owner",
      property: "Multiple Properties",
      increase: "+43%"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Generate background elements
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
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A1930] via-[#1a365d] to-[#0A1930]">
      {/* Enhanced Background with Depth */}
      <div className="absolute inset-0 overflow-hidden">
        {shouldLoadVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            loading="lazy"
            className="absolute w-full h-full object-cover scale-105 transform opacity-20"
            poster="/video-poster.jpg"
            aria-hidden="true"
          >
            <source 
              src="/background-video.webm" 
              type="video/webm"
              media="(min-width: 768px)"
            />
            <source 
              src="/background-video.mp4" 
              type="video/mp4"
              media="(min-width: 768px)"
            />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1930]/90 via-[#0A1930]/70 to-[#0A1930]/90"></div>
        
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
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

      {/* Trust Bar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-2 sm:px-4 py-2">
          <div className="flex flex-wrap justify-center items-center gap-2 xs:gap-4 sm:gap-8 text-[10px] sm:text-sm text-blue-100/90">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span>Legal Protection</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Guaranteed Rent</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16 pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Main Message */}
            <div className="text-center lg:text-left">
              {/* Enhanced Logo */}
              <div className="inline-flex items-center mb-8 group">
                <div className="relative">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent" style={{ letterSpacing: '-0.02em' }}>
                    LET
                  </span>
                  <span className="text-3xl sm:text-4xl font-light tracking-widest bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent pl-[0.1em]" style={{ letterSpacing: '0.15em' }}>
                    ORA
                  </span>
                  <div className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 group-hover:scale-150 transition-transform duration-300 animate-pulse" />
                </div>
              </div>

              {/* Main Value Proposition */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-white">Transform Your Property</span>
                <span className="block mt-2 bg-gradient-to-r from-emerald-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
                  Into Guaranteed Income
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-blue-100/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                Join landlords earning up to <span className="text-white font-semibold">61% more</span> with a company let. Zero hassle, zero void periods.
              </p>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <div className="relative group">
                  {/* Enhanced glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
                  {/* Pulse animation ring */}
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-400/50 to-blue-400/50 animate-pulse-slow opacity-0 group-hover:opacity-30"></div>
                  
                  <a
                    href="#contact"
                    className="relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-gradient-to-r from-white to-blue-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:text-blue-600 group shadow-xl hover:shadow-2xl"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Get Instant Rent Valuation
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </a>
                </div>

                {/* <a
                  href="#book-call"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg text-blue-100 hover:text-white border border-blue-200/30 rounded-lg transform transition-all duration-300 hover:scale-105 hover:border-blue-200/50 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Consultation
                </a> */}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-blue-200/70">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>30-Second Valuation</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>No Obligation</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Instant Results</span>
                </div>
              </div>
            </div>

            {/* Right Column - Social Proof */}
            <div className="relative hidden md:block"> {/* Hide on mobile, show on md+ */}
              {/* Testimonial Cards */}
              <div className="relative h-[400px]"> {/* Fixed height container */}
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`
                      absolute inset-0 transition-all duration-500 transform
                      ${index === currentTestimonialIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
                    `}
                  >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                      {/* Income Increase Badge */}
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-400/20 mb-4">
                        <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="text-emerald-300 font-semibold">{testimonial.increase} Income Increase</span>
                      </div>

                      <p className="text-xl sm:text-2xl text-white mb-6 font-medium">"{testimonial.quote}"</p>

                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center text-white font-semibold text-lg">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{testimonial.author}</div>
                          <div className="text-sm text-blue-200/70">{testimonial.role}</div>
                          <div className="text-xs text-blue-300/50">{testimonial.property}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation Dots - Adjusted position */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonialIndex
                          ? 'bg-blue-400 w-6'
                          : 'bg-blue-400/30 hover:bg-blue-400/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Testimonials - Single testimonial for smaller screens */}
            <div className="md:hidden">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                {/* Show only the first testimonial on mobile */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-400/20 mb-4">
                  <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-emerald-300 font-semibold">{testimonials[0].increase} Income Increase</span>
                </div>

                <p className="text-xl text-white mb-6 font-medium">"{testimonials[0].quote}"</p>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center text-white font-semibold text-lg">
                    {testimonials[0].author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonials[0].author}</div>
                    <div className="text-sm text-blue-200/70">{testimonials[0].role}</div>
                    <div className="text-xs text-blue-300/50">{testimonials[0].property}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Adjusted positioning */}
      {/* <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center animate-bounce">
        <span className="text-blue-200/70 text-sm mb-2">Scroll to explore</span>
        <svg className="w-6 h-6 text-blue-200/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div> */}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
} 