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
      question: "What is a Company Lease?",
      answer: "A Company Lease is a rental agreement where a company, rather than an individual, becomes your tenant. The company pays rent directly to you, guaranteeing consistent income regardless of occupancy, while managing all property-related responsibilities.",
      category: "Basics"
    },
    {
      question: "How is my rental income guaranteed?",
      answer: "Your rental income is secured through legally binding contracts with established companies. We ensure timely payments through robust financial agreements and maintain substantial deposits as additional security.",
      category: "Payments"
    },
    {
      question: "What happens if there are property issues?",
      answer: "The company tenant takes full responsibility for property maintenance, repairs, and tenant management. They handle all issues promptly and professionally, saving you time and money.",
      category: "Management"
    },
    {
      question: "How long are the lease terms?",
      answer: "We offer flexible lease terms ranging from 3 to 10 years, allowing you to choose the commitment length that best suits your needs. Longer terms often come with enhanced benefits and guaranteed rent increases.",
      category: "Contracts"
    },
    {
      question: "Can I sell my property during the lease?",
      answer: "Yes, you can sell your property while under a company lease. The lease can either be transferred to the new owner as an asset or terminated according to agreed-upon terms in the contract.",
      category: "Flexibility"
    },
    {
      question: "What types of properties do you accept?",
      answer: "We accept a wide range of residential properties, including apartments, houses, and HMOs. Properties should meet basic safety and habitability standards, and we'll guide you through any necessary improvements.",
      category: "Eligibility"
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto">
            Everything you need to know about our <span className="text-white font-semibold">Company Lease service</span>
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
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
              Contact Support
            </button>
            <button className="px-8 py-3 rounded-xl border border-blue-400/30 text-white font-semibold hover:bg-blue-400/10 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 