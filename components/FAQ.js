"use client";
import { useState, useEffect } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const faqs = [
    {
      question: "What is a Guaranteed Rent Scheme in Birmingham?",
      answer: "Our Birmingham guaranteed rent scheme ensures landlords receive guaranteed monthly payments through a company let arrangement. As one of Birmingham's leading letting agents, we handle all property management responsibilities while providing consistent income regardless of occupancy.",
      category: "Guaranteed Rent"
    },
    {
      question: "How does property management work in the West Midlands?",
      answer: "Our West Midlands property management service covers everything from maintenance to tenant relations. As experienced letting agents in Birmingham and the West Midlands, we provide comprehensive property management solutions, ensuring your property is well-maintained and professionally managed.",
      category: "Property Management"
    },
    {
      question: "What makes LETORA different from other Birmingham letting agents?",
      answer: "Unlike traditional Birmingham letting agents, we offer a unique guaranteed rent scheme with corporate-backed contracts. We're one of the few property management companies in Birmingham providing guaranteed monthly payments, professional property management, and long-term lease security.",
      category: "Services"
    },
    {
      question: "What areas do you cover in the West Midlands?",
      answer: "Our property management services cover Birmingham and the wider West Midlands area. As established West Midlands letting agents, we manage properties across Birmingham, Solihull, Wolverhampton, and surrounding areas, offering the same guaranteed rent scheme throughout the region.",
      category: "Coverage"
    },
    {
      question: "How long are your guaranteed rent contracts in Birmingham?",
      answer: "Our Birmingham guaranteed rent scheme offers flexible contracts from 3 to 10 years. As experienced property management specialists in the West Midlands, we provide long-term security with guaranteed rent increases built into the agreement.",
      category: "Contracts"
    },
    {
      question: "What types of properties do you manage in Birmingham and West Midlands?",
      answer: "We manage a diverse portfolio of properties across Birmingham and the West Midlands, including residential apartments, houses, and HMOs. Our guaranteed rent scheme is available to property owners throughout the West Midlands, subject to our quality standards.",
      category: "Properties"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#1a365d] via-[#0A1930] to-[#1a365d]">
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
            Frequently Asked Questions About Guaranteed Rent in Birmingham
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto">
            Everything you need to know about our <span className="text-white font-semibold">Birmingham Property Management</span> and <span className="text-white font-semibold">West Midlands Guaranteed Rent Scheme</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 md:gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`
                  relative transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`
                  relative rounded-2xl transition-all duration-300
                  overflow-hidden backdrop-blur-sm border border-white/10
                  bg-gradient-to-br from-white/[0.05] to-blue-500/[0.05]
                `}>
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full text-left p-6 md:p-8 flex items-center justify-between"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center mb-2">
                        <span className="text-xs text-blue-300/70 px-3 py-1 rounded-full border border-blue-400/20">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`
                      flex-shrink-0 w-6 h-6 rounded-full border border-blue-400/30
                      flex items-center justify-center transition-transform duration-300
                      ${activeIndex === index ? 'rotate-180 bg-blue-400/20' : ''}
                    `}>
                      <svg
                        className="w-4 h-4 text-blue-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${activeIndex === index ? 'max-h-96' : 'max-h-0'}
                  `}>
                    <div className="p-6 md:p-8 pt-0 text-blue-100/80">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 