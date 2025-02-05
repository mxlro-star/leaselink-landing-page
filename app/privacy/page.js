"use client";
import Link from 'next/link';

export default function Privacy() {
  const sections = [
    "Who We Are",
    "Information We Collect",
    "How We Use Your Data",
    "How We Share Your Data",
    "How We Protect Your Data",
    "Data Retention",
    "Your Rights",
    "Cookies",
    "Changes to This Privacy Notice",
    "Contact Us"
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

          <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Notice</h1>
          <p className="text-blue-100">Effective Date: January 1, 2024</p>
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
                At LETORA LIMITED, we are committed to protecting and respecting your privacy. This Privacy Notice explains how we collect, use, store, and share your personal data when you interact with us, whether as a tenant, landlord, or any other stakeholder involved in our letting services.
              </p>

              <section id="section-1" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Who We Are</h2>
                <p className="text-gray-600">
                  LETORA LIMITED is a registered letting agency based in London, offering property management and rental services. We are committed to ensuring the confidentiality and protection of your personal information.
                </p>
              </section>

              <section id="section-2" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
                <p className="text-gray-600 mb-4">We collect and process the following personal data:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Personal Identification Information:</strong> Name, address, email address, phone number</li>
                  <li><strong>Financial Information:</strong> Payment details, bank account details, credit history (for tenants)</li>
                  <li><strong>Property Information:</strong> Address, type of property, lease details, and other property-specific information</li>
                  <li><strong>Identification Documents:</strong> Copies of IDs, utility bills, etc., for tenant verification and compliance checks</li>
                  <li><strong>Correspondence:</strong> Any communication between you and us, including emails and phone calls</li>
                </ul>
              </section>

              <section id="section-3" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Data</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>To process rental applications and verify tenant identity</li>
                  <li>To manage and administer tenancy agreements and contracts</li>
                  <li>To provide property-related services (e.g., repairs, maintenance)</li>
                  <li>To comply with legal and regulatory obligations, such as Right to Rent checks and anti-money laundering procedures</li>
                  <li>To communicate with you regarding property-related matters, payments, and services</li>
                  <li>To send you relevant marketing communications (only if you have opted in)</li>
                </ul>
              </section>

              <section id="section-4" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. How We Share Your Data</h2>
                <p className="text-gray-600 mb-4">We may share your personal data with third parties for the following purposes:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Service Providers:</strong> Contractors or companies we engage for property maintenance, repairs, and related services</li>
                  <li><strong>Government Agencies:</strong> For compliance with legal obligations (e.g., HMRC, Local Authorities)</li>
                  <li><strong>Credit Reference Agencies:</strong> For tenant background and credit checks</li>
                  <li><strong>Legal Professionals:</strong> In case of disputes or legal proceedings</li>
                </ul>
                <p className="text-gray-600 mt-4">We will not sell or rent your personal data to third parties for marketing purposes.</p>
              </section>

              <section id="section-5" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. How We Protect Your Data</h2>
                <p className="text-gray-600">
                  We use a variety of security measures to protect your personal data, including encryption, secure servers, and access controls. We will ensure that any third parties who process your data on our behalf also comply with appropriate security measures.
                </p>
              </section>

              <section id="section-6" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Data Retention</h2>
                <p className="text-gray-600">
                  We will retain your personal data only for as long as necessary to fulfil the purposes outlined in this notice, and to comply with legal obligations. After this period, your data will be securely deleted.
                </p>
              </section>

              <section id="section-7" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Access:</strong> You can request a copy of the personal data we hold about you.</li>
                  <li><strong>Rectification:</strong> You can request that we correct any inaccuracies in your personal data.</li>
                  <li><strong>Erasure:</strong> You can request that we delete your personal data, subject to certain conditions.</li>
                  <li><strong>Objection:</strong> You can object to the processing of your personal data in certain situations.</li>
                  <li><strong>Portability:</strong> You can request that we transfer your personal data to another service provider.</li>
                </ul>
                <p className="text-gray-600 mt-4">To exercise any of these rights, please contact us using the details below.</p>
              </section>

              <section id="section-8" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Cookies</h2>
                <p className="text-gray-600">
                  Our website uses cookies to enhance your browsing experience. You can control the use of cookies through your browser settings.
                </p>
              </section>

              <section id="section-9" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Changes to This Privacy Notice</h2>
                <p className="text-gray-600">
                  We may update this Privacy Notice from time to time. Any changes will be posted on our website, and the updated version will indicate the date of revision.
                </p>
              </section>

              <section id="section-10" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions or concerns about this Privacy Notice or how we handle your personal data, please contact us at:
                </p>
                <div className="mt-4 text-gray-600">
                  <p className="font-semibold">LETORA LIMITED</p>
                  <p>71-75 Shelton Street</p>
                  <p>Covent Garden</p>
                  <p>London, WC2H 9JQ</p>
                  <p>Email: privacy@letora.co.uk</p>
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