import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Security from "@/components/Security";
import Solutions from "@/components/Solutions";
import AgentsRow from "@/components/AgentsRow";
import Faq from "@/components/Faq";
import Demo from "@/components/Demo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Security />
        <Solutions />
        <AgentsRow />
        <Faq />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}
