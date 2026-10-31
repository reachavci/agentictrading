import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
