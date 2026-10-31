import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AgentsRow from "@/components/AgentsRow";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <AgentsRow />
      </main>
      <Footer />
    </div>
  );
}
