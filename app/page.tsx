import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EssayTeaser from "@/components/EssayTeaser";
import Volume from "@/components/Volume";
import HowItWorks from "@/components/HowItWorks";
import Capabilities from "@/components/Capabilities";
import Security from "@/components/Security";
import Solutions from "@/components/Solutions";
import Ownership from "@/components/Ownership";
import Faq from "@/components/Faq";
import Demo from "@/components/Demo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <EssayTeaser />
        <Volume />
        <HowItWorks />
        <Capabilities />
        <Security />
        <Solutions />
        <Ownership />
        <Faq />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}
