"use client";
import { useState, useEffect } from "react";

export default function Benefits() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeComparison, setActiveComparison] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundElements, setBackgroundElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate background elements on client side only
    const elements = Array.from({ length: 20 }, () => ({
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

  const benefits = [
    {
      icon: "💰",
      title: "Guaranteed Monthly Income",
      highlight: "Get paid on time, every time - even if your property is empty",
      stat: "100%",
      statLabel: "Payment Guarantee",
      gradient: "from-emerald-400 via-teal-300 to-cyan-400",
      glowColor: "emerald-400/40",
      iconGradient: "from-emerald-300 via-teal-200 to-cyan-300",
      testimonial: {
        quote: "Haven't missed a payment in 2 years. It's completely hands-off.",
        author: "Sarah M.",
        role: "London Landlord"
      }
    },
    {
      icon: "🏠",
      title: "Zero Management Hassle",
      highlight: "We handle everything: maintenance, tenants, paperwork - you just collect rent",
      stat: "95%",
      statLabel: "Time Saved",
      gradient: "from-blue-400 via-indigo-300 to-violet-400",
      glowColor: "blue-400/40",
      iconGradient: "from-blue-300 via-indigo-200 to-violet-300",
      testimonial: {
        quote: "No more 3am maintenance calls. Letora handles everything.",
        author: "James W.",
        role: "Portfolio Owner"
      }
    },
    {
      icon: "📋",
      title: "3-10 Year Guaranteed Contracts",
      highlight: "Lock in long-term income with corporate-backed lease agreements",
      stat: "10yr",
      statLabel: "Max Contract Length",
      gradient: "from-violet-400 via-purple-300 to-fuchsia-400",
      glowColor: "violet-400/40",
      iconGradient: "from-violet-300 via-purple-200 to-fuchsia-300",
      testimonial: {
        quote: "The 5-year contract gives me peace of mind I never had before.",
        author: "David T.",
        role: "Buy-to-Let Investor"
      }
    },
    {
      icon: "💎",
      title: "Premium Property Care",
      highlight: "Professional maintenance & regular inspections protect your investment",
      stat: "98%",
      statLabel: "Client Satisfaction",
      gradient: "from-rose-400 via-pink-300 to-red-400",
      glowColor: "rose-400/40",
      iconGradient: "from-rose-300 via-pink-200 to-red-300",
      testimonial: {
        quote: "My property is in better condition now than when I started.",
        author: "Emma P.",
        role: "Property Owner"
      }
    }
  ];

  const comparisons = [
    {
      aspect: "Income Stability",
      company: "Stable, Long-Term Income",
      companyDetails: "Guaranteed monthly payments with long-term contracts up to 10 years",
      standard: "Shorter tenancy, more frequent turnover",
      standardDetails: "Typical 6-12 month ASTs with uncertain renewals",
      icon: "📈"
    },
    {
      aspect: "Payment Security",
      company: "Reliable, Secure Payments",
      companyDetails: "Corporate-backed guarantees ensure timely payments every month",
      standard: "Higher risk of missed or late payments",
      standardDetails: "Dependent on individual tenant circumstances",
      icon: "🔒"
    },
    {
      aspect: "Occupancy",
      company: "Fewer Void Periods",
      companyDetails: "Continuous income regardless of occupancy status",
      standard: "Longer vacancies between tenants",
      standardDetails: "Income stops during tenant changes and marketing periods",
      icon: "📅"
    },
    {
      aspect: "Contracts",
      company: "Clear, Professional Contracts",
      companyDetails: "Legally-vetted agreements with clear terms and conditions",
      standard: "Risk of misunderstandings and disputes",
      standardDetails: "Variable contract quality and interpretation issues",
      icon: "📝"
    },
    {
      aspect: "Property Care",
      company: "Better Property Care",
      companyDetails: "Professional management and maintenance standards",
      standard: "Increased wear and tear",
      standardDetails: "Variable tenant care and maintenance reporting",
      icon: "🏡"
    },
    {
      aspect: "Flexibility",
      company: "Flexible Lease Terms",
      companyDetails: "Customizable agreements to suit your needs",
      standard: "Limited negotiation options",
      standardDetails: "Standard terms with little room for customization",
      icon: "🤝"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#0A1930] via-[#1a365d] to-[#0A1930]">
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
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/10 backdrop-blur-sm">
            <span className="text-sm sm:text-base text-blue-200 font-medium">Trusted by Property Investors Across the UK</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Transform Your Property Investment Into A
            <span className="block mt-2 bg-gradient-to-r from-emerald-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Guaranteed Monthly Income Stream
            </span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 mb-8">
            Join forward-thinking landlords who've discovered the <span className="text-white font-semibold">smarter way</span> to manage their properties
          </p>
          
          {/* Quick Stats Bar - Revised to use non-numerical achievements */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                <span className="bg-gradient-to-r from-emerald-300 to-emerald-200 bg-clip-text text-transparent">
                  Guaranteed
                </span>
              </div>
              <div className="text-sm text-blue-200/80">Monthly Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                <span className="bg-gradient-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent">
                  Professional
                </span>
              </div>
              <div className="text-sm text-blue-200/80">Property Management</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                <span className="bg-gradient-to-r from-purple-300 to-purple-200 bg-clip-text text-transparent">
                  Long-Term
                </span>
              </div>
              <div className="text-sm text-blue-200/80">Company Let</div>
            </div>
          </div>
        </div>

        {/* Benefits Display */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Enhanced Central Line with Glowing Effect */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent blur-sm"></div>
            </div>

            {/* Benefits Layout */}
            <div className="space-y-24">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`
                    relative group
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Enhanced Title centered above the card */}
                  <div className="text-center mb-8">
                    <div className="inline-flex flex-col items-center">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-3 group-hover:scale-105 transition-transform duration-300">
                        {benefit.title}
                      </h3>
                      <div className="flex items-center justify-center gap-2 md:gap-3">
                        <div className={`h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-gradient-to-br ${benefit.gradient} animate-pulse`}></div>
                        <span className="font-bold text-white">{benefit.stat}</span>
                        <span className="text-blue-200/70">{benefit.statLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Connector Line with Animation */}
                  <div className={`
                    absolute top-1/2 left-[calc(50%-1px)] w-[calc(50%-3rem)] h-px
                    overflow-hidden
                    ${index % 2 === 0 ? '-translate-x-full' : 'translate-x-full left-[calc(50%+1px)]'}
                  `}>
                    <div className={`
                      absolute inset-0 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-transparent via-blue-400/30 to-transparent
                      animate-shimmer
                    `}></div>
                  </div>

                  {/* Main Content */}
                  <div className={`
                    flex items-center gap-6 sm:gap-10
                    ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
                  `}>
                    {/* Enhanced Icon Container with Dynamic Effects */}
                    <div className="relative flex-shrink-0">
                      {/* Enhanced glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-slow`}></div>
                      <div className={`
                        relative w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full 
                        bg-gradient-to-br ${benefit.iconGradient}
                        border border-white/30 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl
                        transform group-hover:scale-110 transition-all duration-300
                        shadow-lg shadow-${benefit.glowColor} group-hover:shadow-2xl group-hover:shadow-${benefit.glowColor}
                        overflow-hidden backdrop-blur-sm
                      `}>
                        <div className="relative z-10">{benefit.icon}</div>
                        {/* Enhanced shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        {/* Radial gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Enhanced Content Container */}
                    <div className="flex-1 min-w-0">
                      <div className={`
                        relative group/highlight overflow-hidden rounded-xl
                        bg-gradient-to-br ${benefit.gradient}/[0.15]
                        border border-white/20 backdrop-blur-sm
                        transform transition-all duration-300
                        hover:shadow-lg hover:shadow-${benefit.glowColor}
                        ${activeCard === index ? 'scale-[1.02]' : ''}
                      `}>
                        {/* Enhanced animated gradient overlay */}
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/highlight:translate-x-[100%] transition-transform duration-1000"></div>
                          <div className="absolute inset-0 bg-gradient-to-br ${benefit.gradient}/5 opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        
                        <div className="relative p-5 sm:p-6 md:p-8">
                          {/* Main Benefit Content with enhanced text effects */}
                          <p className="text-base sm:text-lg md:text-xl text-white font-medium mb-6 leading-relaxed">
                            {benefit.highlight}
                          </p>
                          
                          {/* Enhanced Testimonial Section */}
                          <div className="mt-6 border-t border-white/20 pt-6">
                            <div className="flex items-start gap-4">
                              <div className={`
                                flex-shrink-0 w-10 h-10 rounded-full 
                                bg-gradient-to-br ${benefit.iconGradient}
                                flex items-center justify-center text-white/90 text-sm font-medium 
                                border border-white/20 shadow-inner
                                group-hover/highlight:shadow-${benefit.glowColor}
                              `}>
                                {benefit.testimonial.author.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm sm:text-base text-blue-100/90 italic mb-2 leading-relaxed">"{benefit.testimonial.quote}"</p>
                                <div className="flex items-center gap-2 text-sm text-blue-200/70">
                                  <span className="font-semibold">{benefit.testimonial.author}</span>
                                  <span className="text-blue-300/50">•</span>
                                  <span>{benefit.testimonial.role}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block">
            <div className="relative group">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
              {/* Pulse animation ring */}
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-400/50 to-blue-400/50 animate-pulse-slow opacity-0 group-hover:opacity-30"></div>
              <a
                href="#contact"
                className="relative px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-gradient-to-r from-white to-blue-50 rounded-lg leading-none flex items-center divide-x divide-gray-600 hover:bg-transparent hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-base sm:text-lg md:text-xl"
              >
                <span className="flex items-center gap-3 pr-6">
                  {/* Instant icon */}
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 group-hover:text-emerald-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-gray-900 group-hover:text-white font-semibold transition-colors duration-300">Get Your Property Value Now</span>
                </span>
                <span className="pl-6 text-blue-600 group-hover:text-blue-100 transition-colors duration-300 flex items-center gap-2">
                  Free
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          {/* Enhanced trust indicators below CTA */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-xs sm:text-sm font-medium text-emerald-400">30-Second Valuation • Zero Obligation</p>
            <div className="flex items-center gap-4 text-xs text-blue-200/60">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure & Confidential
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Instant Results
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-12">
            {/* Temporarily disabled FCA badge - To be activated in future
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-xl blur-md opacity-50"></div>
              <div className="relative px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-gray-100/90 via-white/95 to-gray-200/90 border border-white/50 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-300 via-white to-gray-400 flex items-center justify-center shadow-inner">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">FCA Regulated</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-2"></div>
            */}

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-xl blur-md opacity-50"></div>
              <div className="relative px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-gray-100/90 via-white/95 to-gray-200/90 border border-white/50 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                {/* Particle Effects Container */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-0 group-hover:animate-particle-emit"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 45}deg)`,
                        '--particle-angle': `${i * 45}deg`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Radial Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/0 via-white/30 to-gray-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-300 via-white to-gray-400 flex items-center justify-center shadow-inner relative">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-white/50 rounded-full filter blur-sm group-hover:animate-pulse-slow"></div>
                  </div>
                  <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">Legal Protection</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-2"></div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-xl blur-md opacity-50"></div>
              <div className="relative px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-amber-100/90 via-yellow-50/95 to-amber-200/90 border border-amber-100/50 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                {/* Particle Effects Container */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 opacity-0 group-hover:animate-particle-emit"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 45}deg)`,
                        '--particle-angle': `${i * 45}deg`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Radial Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-yellow-100/30 to-amber-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-300 via-yellow-100 to-amber-400 flex items-center justify-center shadow-inner relative">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-amber-100/50 rounded-full filter blur-sm group-hover:animate-pulse-slow"></div>
                  </div>
                  <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-amber-800 via-amber-900 to-amber-800 bg-clip-text text-transparent">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Company Lets</span>
            <span className="mx-4 text-gray-400">vs</span>
            <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">Residential Lets</span>
          </h3>
          
          <div className="grid gap-4">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className={`
                  relative transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveComparison(index)}
                onMouseLeave={() => setActiveComparison(null)}
              >
                <div className={`
                  relative rounded-xl transition-all duration-300
                  overflow-hidden backdrop-blur-sm border border-white/10
                  ${activeComparison === index ? 'transform scale-[1.02]' : ''}
                  bg-gradient-to-br from-white/[0.05] to-blue-500/[0.05]
                `}>
                  <div className="grid md:grid-cols-2 gap-4 p-6">
                    {/* Company Let Side */}
                    <div className="relative">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-sm text-blue-200 font-medium">
                          {item.aspect}
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-transparent p-4 pt-14 sm:pt-12 lg:pt-4 rounded-lg border border-blue-400/20 hover:border-blue-400/40 transition-colors relative">
                        {/* Adjusted LETORA badge positioning */}
                        <div className="absolute top-2 left-2 sm:left-2 lg:left-auto lg:right-2 w-auto">
                          <div className="flex items-center bg-gradient-to-r from-blue-400/20 to-blue-600/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-blue-300/20">
                            <span className="text-xs sm:text-sm font-extrabold tracking-tight bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent" style={{ letterSpacing: '-0.02em' }}>
                              LET
                            </span>
                            <span className="text-xs sm:text-sm font-light tracking-widest bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent pl-[0.1em]" style={{ letterSpacing: '0.15em' }}>
                              ORA
                            </span>
                            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 ml-1 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 animate-pulse" />
                          </div>
                        </div>
                        <div className="mt-2">
                          <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="line-clamp-2">{item.company}</span>
                          </h4>
                          <p className="text-blue-100/70 text-xs sm:text-sm">{item.companyDetails}</p>
                        </div>
                      </div>
                    </div>

                    {/* Standard Let Side */}
                    <div className="relative">
                      <div className="bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent p-4 pt-10 sm:pt-12 lg:pt-4 rounded-lg border border-red-400/20 hover:border-red-400/30 transition-colors relative">
                        {/* Adjusted STANDARD badge positioning */}
                        <div className="absolute top-2 left-2 sm:left-2 lg:left-auto lg:right-2">
                          <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm text-red-200 text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-red-300/20 whitespace-nowrap">
                            STANDARD
                          </div>
                        </div>
                        <div className="mt-2">
                          <h4 className="text-white/80 font-medium mb-2 flex items-center text-sm sm:text-base">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="line-clamp-2">{item.standard}</span>
                          </h4>
                          <p className="text-red-100/60 text-xs sm:text-sm">{item.standardDetails}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animated highlight border */}
                  <div className={`
                    absolute inset-0 border-2 border-blue-400/30 rounded-xl opacity-0
                    transition-all duration-300
                    ${activeComparison === index ? 'opacity-100 scale-100' : 'scale-95'}
                  `} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes particle-emit {
          0% {
            transform: rotate(var(--particle-angle)) translateX(0px);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--particle-angle)) translateX(50px);
            opacity: 0;
          }
        }
        .animate-particle-emit {
          animation: particle-emit 1s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
} 