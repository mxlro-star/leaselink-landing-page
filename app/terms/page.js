"use client";
import Link from 'next/link';

export default function Terms() {
  const sections = [
    "Agreement Overview",
    "Definitions",
    "Our Services",
    "Your Obligations",
    "Fees and Payments",
    "Property Management",
    "Liability and Insurance",
    "Term and Termination",
    "General Provisions",
    "Contact Information"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1930] to-[#1a365d] text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Back to Home Link */}
          <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white mb-6 group transition-colors">
            <svg className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Logo and Title */}
          <div className="flex items-center mb-6">
            <div className="relative mr-4">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent font-sans" style={{ letterSpacing: '-0.02em' }}>
                LET
              </span>
              <span className="text-2xl font-light tracking-widest bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent font-sans pl-[0.1em]" style={{ letterSpacing: '0.15em' }}>
                ORA
              </span>
              <div className="absolute -top-1 -right-3 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 animate-pulse" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-blue-100">Last Updated: January 1, 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Table of Contents</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {index + 1}. {section}
                </a>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 mb-8">
                Please read these terms and conditions carefully before using our services. By engaging with LETORA LIMITED, you agree to be bound by these terms and conditions.
              </p>

              <section id="section-1" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Agreement Overview</h2>
                <p className="text-gray-600">
                  These terms and conditions constitute a legally binding agreement between you ("the Client") and LETORA LIMITED ("we," "us," or "our"), a company registered in England and Wales. They govern your use of our property management and corporate lease services.
                </p>
              </section>

              <section id="section-2" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Definitions</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Property:</strong> Any residential real estate under our management</li>
                  <li><strong>Services:</strong> Our property management and corporate lease services</li>
                  <li><strong>Agreement:</strong> The contract between you and LETORA LIMITED</li>
                  <li><strong>Lease Term:</strong> The duration of the corporate lease agreement</li>
                  <li><strong>Rental Income:</strong> The guaranteed monthly payment for your property</li>
                </ul>
              </section>

              <section id="section-3" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Our Services</h2>
                <p className="text-gray-600 mb-4">We provide the following services:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Corporate lease agreements with guaranteed monthly income</li>
                  <li>Complete property management and maintenance</li>
                  <li>Tenant sourcing and management</li>
                  <li>Regular property inspections and reports</li>
                  <li>24/7 support for property-related issues</li>
                  <li>Legal and compliance management</li>
                </ul>
              </section>

              <section id="section-4" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Your Obligations</h2>
                <p className="text-gray-600 mb-4">As a client, you agree to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate information about your property</li>
                  <li>Maintain appropriate insurance coverage</li>
                  <li>Grant us necessary access to manage the property</li>
                  <li>Comply with all relevant laws and regulations</li>
                  <li>Maintain the property's structural integrity</li>
                  <li>Inform us of any changes affecting the property</li>
                </ul>
              </section>

              <section id="section-5" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Fees and Payments</h2>
                <p className="text-gray-600 mb-4">Our fee structure includes:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Management fees as agreed in your contract</li>
                  <li>Guaranteed monthly rental payments</li>
                  <li>Maintenance and repair cost arrangements</li>
                  <li>Additional services as requested</li>
                </ul>
                <p className="text-gray-600 mt-4">All fees will be clearly outlined in your service agreement.</p>
              </section>

              <section id="section-6" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Property Management</h2>
                <p className="text-gray-600">
                  We will manage your property with professional care, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                  <li>Regular property inspections</li>
                  <li>Maintenance and repairs coordination</li>
                  <li>Tenant relationship management</li>
                  <li>Emergency response services</li>
                  <li>Compliance with safety regulations</li>
                </ul>
              </section>

              <section id="section-7" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Liability and Insurance</h2>
                <p className="text-gray-600">
                  We maintain appropriate professional indemnity insurance. However, property owners must maintain their own buildings insurance and liability coverage. Our liability is limited as specified in your service agreement.
                </p>
              </section>

              <section id="section-8" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Term and Termination</h2>
                <p className="text-gray-600">
                  The agreement term and termination conditions will be specified in your service contract. Standard notice periods and termination procedures apply as detailed in your agreement.
                </p>
              </section>

              <section id="section-9" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. General Provisions</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>These terms are governed by English law</li>
                  <li>We may update these terms with notice</li>
                  <li>Invalid provisions will be replaced with valid ones</li>
                  <li>These terms represent the entire agreement</li>
                </ul>
              </section>

              <section id="section-10" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Information</h2>
                <p className="text-gray-600">
                  For any questions about these terms, please contact us at:
                </p>
                <div className="mt-4 text-gray-600">
                  <p className="font-semibold">LETORA LIMITED</p>
                  <p>71-75 Shelton Street</p>
                  <p>Covent Garden</p>
                  <p>London, WC2H 9JQ</p>
                  <p>Email: legal@letora.co.uk</p>
                  <p>Phone: +44 (0) 20 XXXX XXXX</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 