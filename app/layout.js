import '../styles/globals.css';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const ScrollProgress = dynamic(() => import('../components/ScrollProgress'), { ssr: false });
const BackToTop = dynamic(() => import('../components/BackToTop'), { ssr: false });

// Structured Data as a constant to ensure consistency between server and client
const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "LETORA Property Management Birmingham",
  "description": "Birmingham's leading guaranteed rent scheme and professional property management services across West Midlands",
  "url": "https://letora.co.uk",
  "areaServed": [
    {
      "@type": "City",
      "name": "Birmingham",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "West Midlands"
      }
    },
    {
      "@type": "AdministrativeArea",
      "name": "West Midlands"
    }
  ],
  "serviceType": [
    "Guaranteed Rent Scheme",
    "Property Management",
    "Letting Agency Services"
  ],
  "knowsAbout": [
    "Guaranteed Rent Birmingham",
    "Property Management West Midlands",
    "Birmingham Letting Agents",
    "West Midlands Property Management"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Guaranteed Rent Scheme Birmingham",
        "description": "Professional property management with guaranteed monthly payments for landlords in Birmingham"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Property Management West Midlands",
        "description": "Expert property management services across the West Midlands region"
      }
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Property Management Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Guaranteed Rent Birmingham",
          "description": "Secure monthly rental income guaranteed for Birmingham landlords"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Property Management West Midlands",
          "description": "Complete property management solutions across West Midlands"
        }
      }
    ]
  }
};

export const metadata = {
  title: "Birmingham's Leading Guaranteed Rent Scheme | Property Management West Midlands",
  description:
    "Expert letting agents in Birmingham & West Midlands offering guaranteed rent scheme with up to 61% higher returns. Professional property management services across West Midlands.",
  keywords: [
    "guaranteed rent birmingham",
    "guaranteed rent scheme birmingham",
    "birmingham guaranteed rent",
    "birmingham guaranteed rent scheme",
    "letting agents birmingham",
    "birmingham letting agents",
    "lettings agents west midlands",
    "property management birmingham",
    "property management companies Birmingham",
    "property management west midlands",
    "property management companies west midlands"
  ],
  authors: [{ name: 'Letora' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://letora.co.uk',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Birmingham's Leading Guaranteed Rent Scheme | LETORA Property Management",
    description:
      "Professional property management and guaranteed rent scheme in Birmingham and West Midlands. Join landlords earning up to 61% more with zero hassle.",
    url: "https://letora.co.uk",
    siteName: "LETORA Property Management Birmingham",
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'LETORA Property Management Birmingham - Guaranteed Rent Scheme',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birmingham's Leading Guaranteed Rent Scheme | Property Management",
    description:
      "Expert letting agents offering guaranteed rent scheme in Birmingham & West Midlands. Professional property management with up to 61% higher returns.",
    site: "@LetoraOfficial",
    creator: "@LetoraOfficial",
  },
  category: 'Property Management',
  other: {
    'geo.region': 'GB-WMD',
    'geo.placename': 'Birmingham, West Midlands',
    'business:contact_data:locality': 'Birmingham',
    'business:contact_data:region': 'West Midlands',
    'business:contact_data:country': 'United Kingdom'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ScrollProgress />
        {children}
        <BackToTop />
        <Script id="intersection-observer" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', () => {
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  entry.target.setAttribute('data-reveal', entry.isIntersecting)
                })
              }, { threshold: 0.1 })
              
              document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
            })
          `}
        </Script>
      </body>
    </html>
  );
} 