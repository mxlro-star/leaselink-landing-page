import '../styles/globals.css';
import dynamic from 'next/dynamic';

const ScrollProgress = dynamic(() => import('../components/ScrollProgress'), { ssr: false });
const BackToTop = dynamic(() => import('../components/BackToTop'), { ssr: false });

export const metadata = {
  title: "Letora - Guaranteed Rent Service for Landlords",
  description:
    "Get a guaranteed rent property lease service for landlords. Stress-free management with long-term contracts in London, Birmingham, and Manchester.",
  keywords: [
    "guaranteed rent birmingham",
    "guaranteed rent",
    "guaranteed rent london",
    "guaranteed rent manchester",
    "guaranteed rent letting agents",
    "letting agents birmingham",
    "letting agents manchester",
    "letting agents london",
    "property management",
    "landlord services",
    "rental guarantee scheme",
    "property letting services",
    "professional letting agents",
    "guaranteed rental income",
    "property management services"
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
    title: "Letora - Guaranteed Rent Service for Landlords",
    description:
      "Get a guaranteed rent property lease service for landlords. Stress-free management with long-term contracts in London, Birmingham, and Manchester.",
    url: "https://letora.co.uk",
    siteName: "Letora",
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.webp', // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'Letora - Guaranteed Rent Service',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Letora - Guaranteed Rent Service for Landlords",
    description:
      "Get a guaranteed rent property lease service for landlords. Stress-free management with long-term contracts in London, Birmingham, and Manchester.",
    site: "@letora", // If you have a Twitter handle
    creator: "@letora", // If you have a Twitter handle
  },
  category: 'Property Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        {children}
        <BackToTop />
        <script dangerouslySetInnerHTML={{
  __html: `
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          entry.target.setAttribute('data-reveal', entry.isIntersecting)
        })
      }, { threshold: 0.1 })
      
      document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    })
  `
}} />
      </body>
    </html>
  );
} 