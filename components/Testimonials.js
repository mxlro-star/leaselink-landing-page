"use client";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const testimonials = [
    {
      quote: "The guaranteed rent has given me complete peace of mind. No more worrying about void periods or tenant issues.",
      author: "James Wilson",
      role: "Portfolio Landlord",
      location: "Manchester",
      rating: 5,
      avatar: "JW",
      highlight: "3 Years with Us"
    },
    {
      quote: "Professional service from start to finish. They've managed my properties better than I could have imagined.",
      author: "Sarah Ahmed",
      role: "Buy-to-Let Investor",
      location: "London",
      rating: 5,
      avatar: "SA",
      highlight: "£45k+ Earned"
    },
    {
      quote: "Switching to a company lease was the best decision. The steady income and hands-off management are exactly what I needed.",
      author: "David Thompson",
      role: "Property Owner",
      location: "Birmingham",
      rating: 5,
      avatar: "DT",
      highlight: "7 Properties"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#0A1930] via-[#1a365d] to-[#0A1930]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1930]/80 via-[#1E3A8A]/20 to-[#0A1930]/80" />
        {[...Array(15)].map((_, i) => (
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
            Success Stories from Satisfied Landlords
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto">
            Join <span className="text-white font-semibold">1000+ property owners</span> who've discovered the benefits of hassle-free property management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`
                relative transition-all duration-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className={`
                relative rounded-2xl p-6 md:p-8 transition-all duration-300
                ${activeIndex === index ? 'transform scale-105' : 'hover:scale-102'}
                overflow-hidden backdrop-blur-sm border border-white/10
                bg-gradient-to-br from-white/[0.05] to-blue-500/[0.05]
              `}>
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-blue-100/90 mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-blue-400/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-white">
                        {testimonial.author}
                      </h4>
                      <div className="text-blue-200/70 text-sm">
                        {testimonial.role}
                      </div>
                      <div className="text-blue-300/50 text-xs">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-200/90 font-medium">
                      {testimonial.highlight}
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-6xl text-blue-400/10 font-serif">
                  "
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 