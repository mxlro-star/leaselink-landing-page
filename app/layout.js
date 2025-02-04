import '../styles/globals.css';
import dynamic from 'next/dynamic';

const ScrollProgress = dynamic(() => import('../components/ScrollProgress'), { ssr: false });
const BackToTop = dynamic(() => import('../components/BackToTop'), { ssr: false });

export const metadata = {
  title: "Company Lease Service for Landlords",
  description:
    "Get a guaranteed rent property lease service for landlords. Stress-free management with long-term contracts.",
  openGraph: {
    title: "Company Lease Service for Landlords",
    description:
      "Get a guaranteed rent property lease service for landlords. Stress-free management with long-term contracts.",
    url: "https://yourdomain.com",
    siteName: "CompanyLease",
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Lease Service for Landlords",
    description:
      "Get a guaranteed rent property lease service for landlords. Stress-free management with long-term contracts.",
  },
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