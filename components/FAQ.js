"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How does guaranteed rent work?",
    answer: "We ensure you receive payment every month, covering any potential void periods."
  },
  {
    question: "What if my property needs maintenance?",
    answer: "Maintenance is handled by us, ensuring your property stays in top condition."
  },
  {
    question: "How long are the lease agreements?",
    answer: "Our contracts typically range from 3 to 10 years."
  },
  {
    question: "How quickly will I be contacted?",
    answer: "We follow up within 24 hours to provide tailored advice and answer all your questions in a no-obligation consultation."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 animate-fadeIn bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-neumorphic rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-trust/5 transition-colors duration-300"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <span className="text-trust transition-transform duration-300 transform text-2xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 border-t border-gray-100 bg-trust/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 