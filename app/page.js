import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import WhatsAppContact from "../components/WhatsAppContact";
import Footer from "../components/Footer";
import Tenants from "../components/Tenants";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero data-reveal="true" />
      <Benefits data-reveal="true" />
      <Tenants data-reveal="true" />
      <Process data-reveal="true" />
      <Testimonials data-reveal="true" />
      <FAQ data-reveal="true" />
      <WhatsAppContact data-reveal="true" />
      <Footer />
    </div>
  );
} 