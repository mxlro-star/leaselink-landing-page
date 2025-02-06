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

        {/* Additional Support Section */}
        <div className="mt-12 md:mt-20 text-center">
          <p className="text-blue-100/90 mb-6">
            Have more questions about property management in Birmingham and the West Midlands? Our local team is here to help!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/447947764486"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-white/25 to-emerald-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              
              {/* WhatsApp Icon with enhanced animation */}
              <div className="relative flex items-center justify-center w-6 h-6 transition-transform duration-300 group-hover:scale-110">
                <svg 
                  className="w-full h-full text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-0 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500" />
              </div>

              {/* Text content with responsive design */}
              <div className="relative flex items-center gap-2">
                <span className="md:hidden">WhatsApp Us</span>
                <span className="hidden md:inline">WhatsApp Us on</span>
                <span className="hidden md:inline font-mono bg-emerald-600/50 px-2 py-0.5 rounded select-all">
                  +44 7947 764486
                </span>
              </div>

              {/* Arrow with enhanced animation */}
              <svg 
                className="relative w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 