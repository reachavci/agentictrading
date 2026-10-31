import { demo } from "@/content/site";
import DemoForm from "./DemoForm";
import Reveal from "./Reveal";

export default function Demo() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <Reveal className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] lg:gap-16">
        <div>
          <h2 id="demo-title" className="text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[48px]">
            {demo.title}
          </h2>
          <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-ink-secondary">{demo.text}</p>
        </div>
        <DemoForm />
      </Reveal>
    </section>
  );
}
