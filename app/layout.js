import '../styles/globals.css';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// Dynamically import components with priority loading
const ScrollProgress = dynamic(() => import('../components/ScrollProgress'), { 
  ssr: false,
  loading: () => null,
  priority: false 
});

const BackToTop = dynamic(() => import('../components/BackToTop'), { 
  ssr: false,
  loading: () => null,
  priority: false
});

// Move structured data outside component to prevent re-creation
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

// Precompute metadata to avoid runtime computation
const computedMetadata = {
  title: "Birmingham's Leading Guaranteed Rent Scheme | Property Management West Midlands",
  description: "Expert letting agents in Birmingham & West Midlands offering guaranteed rent scheme with up to 61% higher returns. Professional property management services across West Midlands.",
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
    'business:contact_data:country': 'United Kingdom',
    'business:contact_data:email': 'hello@letora.co.uk'
  }
};

export const metadata = computedMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            color-scheme: dark;
          }
          
          html {
            scroll-behavior: auto !important;
            height: 100%;
            overflow-y: auto;
            background: #0A1930;
          }
          
          body {
            min-height: 100%;
            background: linear-gradient(to bottom right, #0A1930, #1a365d, #0A1930);
            opacity: 0;
            animation: fadeIn 1.2s ease-out forwards;
          }

          html:not([data-hydrated]) {
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow: hidden !important;
          }
          
          html:not([data-hydrated])::-webkit-scrollbar {
            display: none;
          }
          
          html:not([data-hydrated]) body {
            opacity: 0;
          }

          .loading-container {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: black;
            z-index: 9999;
            opacity: 1;
            transition: opacity 1.5s ease-out;
            overflow: hidden;
          }

          .cosmic-background {
            position: absolute;
            inset: -50%;
            background: radial-gradient(circle at center, 
              rgba(16, 24, 48, 1) 0%,
              rgba(2, 6, 23, 1) 50%,
              rgba(0, 0, 0, 1) 100%
            );
            opacity: 0;
            transform: scale(1.5);
            animation: cosmicReveal 1.8s ease-out forwards;
          }

          .nebula {
            position: absolute;
            inset: 0;
            background: 
              radial-gradient(circle at 30% 50%, rgba(147, 197, 253, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(167, 139, 250, 0.15) 0%, transparent 50%);
            filter: blur(30px);
            opacity: 0;
            animation: nebulaFade 2.4s ease-out forwards 0.6s;
          }

          .star-field {
            position: absolute;
            inset: -100%;
            perspective: 1000px;
            transform-style: preserve-3d;
          }

          .star-layer {
            position: absolute;
            inset: 0;
            transform-style: preserve-3d;
          }

          .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            transform: translateZ(0);
            animation: starFloat 20s linear infinite;
          }

          .shooting-star {
            position: absolute;
            width: 3px;
            height: 3px;
            background: linear-gradient(to right, transparent, white 50%, transparent);
            opacity: 0;
            transform: rotate(45deg);
            filter: blur(1px);
            animation: shootingStarEffect 3s ease-in infinite;
          }

          .loading-text-container {
            position: relative;
            perspective: 1000px;
            height: 200px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transform-style: preserve-3d;
          }

          .letter-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.4em;
            transform-style: preserve-3d;
          }

          .letter {
            position: relative;
            font-family: system-ui, sans-serif;
            font-size: 7rem;
            font-weight: 900;
            opacity: 0;
            transform-style: preserve-3d;
            color: transparent;
            background: linear-gradient(to bottom right, 
              rgba(255, 255, 255, 0.9), 
              rgba(255, 255, 255, 0.5) 50%,
              rgba(255, 255, 255, 0.2)
            );
            -webkit-background-clip: text;
            background-clip: text;
            filter: drop-shadow(0 0 15px rgba(255,255,255,0.3));
            animation: letterReveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }

          .letter.light {
            font-weight: 300;
            letter-spacing: 0.15em;
          }

          .letter.bold {
            font-weight: 900;
            letter-spacing: -0.02em;
          }

          .dot {
            position: absolute;
            right: -15px;
            top: -5px;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            opacity: 0;
            transform: scale(0);
            box-shadow: 0 0 20px rgba(255,255,255,0.5);
            animation: dotReveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 1.8s;
          }

          .letter::before {
            content: attr(data-letter);
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, #60a5fa, #818cf8);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            transform: translateZ(-1px);
            opacity: 0;
            filter: blur(8px);
            animation: letterGlow 2s ease-out forwards;
          }

          .moon {
            position: absolute;
            right: -25px;
            top: -15px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0.2) 100%
            );
            opacity: 0;
            transform: scale(0) translateZ(100px);
            box-shadow: 
              0 0 30px rgba(255,255,255,0.8),
              0 0 60px rgba(96,165,250,0.4),
              0 0 100px rgba(96,165,250,0.2);
            animation: epicMoonReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 1.6s;
          }

          .final-flash {
            position: fixed;
            inset: 0;
            background: radial-gradient(circle at center, 
              rgba(96,165,250,1) 0%,
              rgba(96,165,250,0.8) 30%,
              rgba(96,165,250,0) 100%
            );
            opacity: 0;
            pointer-events: none;
            z-index: 10000;
            transform-origin: 85% 8%;
          }

          html[data-hydrated] .final-flash {
            animation: epicFlash 1s ease-out forwards 2.2s;
          }

          html[data-hydrated] .loading-container {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.8s ease-out;
            transition-delay: 2.6s;
          }

          @keyframes cosmicReveal {
            0% {
              opacity: 0;
              transform: scale(2);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes nebulaFade {
            0% {
              opacity: 0;
              transform: scale(1.2);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes starFloat {
            0% {
              transform: translateZ(0) rotate(0deg);
            }
            100% {
              transform: translateZ(-1000px) rotate(360deg);
            }
          }

          @keyframes shootingStarEffect {
            0% {
              transform: translate(120%, -120%) rotate(45deg) scale(1);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            20% {
              transform: translate(-120%, 120%) rotate(45deg) scale(0.5);
              opacity: 0;
            }
            100% {
              transform: translate(-120%, 120%) rotate(45deg) scale(0);
              opacity: 0;
            }
          }

          @keyframes letterReveal {
            0% {
              opacity: 0;
              transform: 
                translateY(-200px)
                translateZ(-500px)
                rotateX(60deg)
                rotateY(var(--random-y))
                rotateZ(var(--random-z));
              filter: blur(20px);
            }
            60% {
              opacity: 0.8;
              filter: blur(10px);
            }
            100% {
              opacity: 1;
              transform: 
                translateY(0)
                translateZ(0)
                rotateX(0)
                rotateY(0)
                rotateZ(0);
              filter: blur(0);
            }
          }

          @keyframes letterGlow {
            0% {
              opacity: 0;
              transform: translateZ(-1px);
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateZ(50px);
            }
          }

          @keyframes dotReveal {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 1;
              transform: scale(1.5);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes epicMoonReveal {
            0% {
              opacity: 0;
              transform: scale(0) translateZ(100px);
              background: white;
              box-shadow: 0 0 30px rgba(255,255,255,0.8);
            }
            40% {
              opacity: 1;
              transform: scale(1.5) translateZ(100px);
              background: white;
              box-shadow: 0 0 50px rgba(255,255,255,0.8);
            }
            70% {
              transform: scale(0.8) translateZ(100px);
              background: white;
              box-shadow: 
                0 0 30px rgba(255,255,255,0.8),
                0 0 60px rgba(96,165,250,0.4);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateZ(100px);
              background: #60a5fa;
              box-shadow: 
                0 0 30px rgba(255,255,255,0.8),
                0 0 60px rgba(96,165,250,0.4),
                0 0 100px rgba(96,165,250,0.2);
            }
          }

          @keyframes epicFlash {
            0% {
              opacity: 0;
              transform: scale(0.1);
              filter: brightness(1);
            }
            50% {
              opacity: 1;
              transform: scale(50);
              filter: brightness(2);
            }
            100% {
              opacity: 0;
              transform: scale(100);
              filter: brightness(1);
            }
          }

          html[data-hydrated] body {
            opacity: 1;
            transition: opacity 0.8s ease-out;
          }
        `}} />
        <Script
          id="schema-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />
        <Script id="hydration-control" strategy="beforeInteractive">
          {`
            (function() {
              // Force clean URL and scroll position on every page load/refresh
              if (window.location.hash || window.location.search) {
                history.replaceState(null, '', window.location.pathname);
              }

              // Aggressively enforce scroll position
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);

              // Prevent any scroll attempts during load
              function forceTop() {
                window.scrollTo(0, 0);
              }
              window.addEventListener('scroll', forceTop);

              // Critical: Handle initial render state
              let hydrationComplete = false;

              function completeHydration() {
                if (hydrationComplete) return;
                hydrationComplete = true;

                // Remove aggressive scroll lock
                window.removeEventListener('scroll', forceTop);

                // Enable content visibility
                requestAnimationFrame(() => {
                  document.documentElement.setAttribute('data-hydrated', 'true');
                  window.scrollTo(0, 0);

                  // Enable smooth scrolling after everything is stable
                  setTimeout(() => {
                    document.documentElement.style.scrollBehavior = 'smooth';
                  }, 100);
                });
              }

              // Handle both load scenarios
              if (document.readyState === 'complete') {
                completeHydration();
              } else {
                window.addEventListener('load', completeHydration);
              }

              // Backup to ensure hydration completes
              setTimeout(completeHydration, 2000);

              // Handle click events on hash links (only after hydration)
              document.addEventListener('click', function(e) {
                if (!hydrationComplete) return;
                
                const target = e.target.closest('a[href^="#"]');
                if (target) {
                  e.preventDefault();
                  const hash = target.getAttribute('href');
                  const element = document.querySelector(hash);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              });

              // Handle refresh/reload
              window.addEventListener('beforeunload', function() {
                window.scrollTo(0, 0);
              });
            })();
          `}
        </Script>
      </head>
      <body>
        <div className="loading-container">
          <div className="cosmic-background"></div>
          <div className="nebula"></div>
          <div className="star-field">
            {Array.from({ length: 3 }).map((_, layerIndex) => (
              <div 
                key={layerIndex}
                className="star-layer"
                style={{ transform: `translateZ(${-layerIndex * 200}px)` }}
              >
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="star"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      transform: `translateZ(${Math.random() * 400}px)`,
                      animationDelay: `${-Math.random() * 20}s`
                    }}
                  />
                ))}
              </div>
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`shooting-${i}`}
                className="shooting-star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.4}s`
                }}
              />
            ))}
          </div>
          <div className="loading-text-container">
            <div className="letter-wrapper">
              {'LET'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="letter bold"
                  data-letter={letter}
                  style={{
                    animationDelay: `${0.9 + i * 0.12}s`,
                    '--random-y': `${Math.random() * 360}deg`,
                    '--random-z': `${Math.random() * 90 - 45}deg`
                  }}
                >
                  {letter}
                </span>
              ))}
              {'ORA'.split('').map((letter, i) => (
                <span
                  key={i + 3}
                  className="letter light"
                  data-letter={letter}
                  style={{
                    marginLeft: i === 0 ? '0.1em' : '0',
                    letterSpacing: '0.15em',
                    animationDelay: `${1.26 + i * 0.12}s`,
                    '--random-y': `${Math.random() * 360}deg`,
                    '--random-z': `${Math.random() * 90 - 45}deg`
                  }}
                >
                  {letter}
                </span>
              ))}
              <div className="dot"></div>
              <div className="moon"></div>
            </div>
          </div>
        </div>
        <div className="final-flash"></div>

        <ScrollProgress />
        {children}
        <BackToTop />
        <Script id="intersection-observer" strategy="afterInteractive">
          {`
            (() => {
              let observer = null;
              let initTimeout = null;

              function createObserver() {
                if (observer) return observer;
                
                observer = new IntersectionObserver(
                  (entries) => {
                    if (!document.documentElement.hasAttribute('data-hydrated')) return;
                    
                    requestAnimationFrame(() => {
                      entries.forEach(entry => {
                        const currentState = entry.target.getAttribute('data-reveal');
                        const newState = String(entry.isIntersecting);
                        if (currentState !== newState) {
                          entry.target.setAttribute('data-reveal', newState);
                        }
                      });
                    });
                  },
                  { threshold: 0.1 }
                );

                return observer;
              }

              function processElements(elements, startIndex = 0) {
                const endIndex = Math.min(startIndex + 10, elements.length);
                const obs = createObserver();
                
                for (let i = startIndex; i < endIndex; i++) {
                  obs.observe(elements[i]);
                }

                if (endIndex < elements.length) {
                  requestAnimationFrame(() => {
                    processElements(elements, endIndex);
                  });
                }
              }

              function init() {
                if (initTimeout) clearTimeout(initTimeout);
                
                initTimeout = setTimeout(() => {
                  const elements = document.querySelectorAll('[data-reveal]');
                  if (elements.length) {
                    processElements(elements);
                  }
                }, 100);
              }

              // Initialize after content is loaded
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init, { once: true });
              } else {
                init();
              }

              // Cleanup
              document.addEventListener('visibilitychange', () => {
                if (document.hidden && initTimeout) {
                  clearTimeout(initTimeout);
                }
              });

              window.addEventListener('beforeunload', () => {
                if (observer) {
                  observer.disconnect();
                  observer = null;
                }
                if (initTimeout) {
                  clearTimeout(initTimeout);
                  initTimeout = null;
                }
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}