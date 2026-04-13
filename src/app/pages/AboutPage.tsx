import { useEffect, type ReactNode } from "react";
import { Globe } from "lucide-react";
import imgAbout from "../../assets/dea83ccece2367a9ef6dbad9c1009b587db11e08.png";
import { ContactFooter } from "../components/ContactFooter";
import { SitePageHeader } from "../components/SitePageHeader";

function HelpColumn({
  index,
  title,
  children,
  titlePrefix,
}: {
  index: string;
  title: string;
  children: ReactNode;
  titlePrefix?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <p className="font-['Space_Grotesk',sans-serif] text-xs font-bold tabular-nums tracking-wide text-[#2e1f26]/40 md:text-sm">
        {index}
      </p>
      <div className="h-px w-full bg-[#2e1f26]/15" />
      <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-bold leading-snug text-[#2e1f26] md:text-2xl">
        {titlePrefix}
        {title}
      </h3>
      <p className="font-['Space_Grotesk',sans-serif] text-[15px] font-bold leading-relaxed text-[#2e1f26]/75 md:text-[17px]">
        {children}
      </p>
    </div>
  );
}

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f2ee] text-[#2e1f26]">
      <SitePageHeader active="about" />

      <main>
        <section className="mx-auto max-w-[1600px] px-6 pb-10 pt-10 md:px-10 md:pb-14 md:pt-14 lg:px-16 lg:pt-20">
          <h1 className="max-w-[1100px] font-['Space_Grotesk',sans-serif] text-[clamp(2.25rem,6.5vw,5.5rem)] font-bold leading-[0.98] tracking-tight text-[#2e1f26]">
            Helping brands thrive in the digital world
          </h1>
        </section>

        <section className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-0">
            <div className="h-px flex-1 bg-[#2e1f26]/20" />
            <div className="relative z-10 mx-3 shrink-0 md:mx-5">
              <div className="flex size-[88px] items-center justify-center rounded-full bg-[#c77840] shadow-[0_16px_40px_rgba(199,120,64,0.35)] md:size-[120px] md:shadow-[0_20px_50px_rgba(199,120,64,0.4)]">
                <Globe className="size-10 text-[#2e1f26] md:size-14" strokeWidth={1.35} aria-hidden />
              </div>
            </div>
            <div className="h-px flex-1 bg-[#2e1f26]/20" />
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24 lg:px-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
            <div className="flex items-start font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#c77840] md:col-span-1 md:justify-center md:text-3xl">
              <span aria-hidden>→</span>
            </div>
            <div className="font-['Space_Grotesk',sans-serif] text-base font-bold leading-relaxed text-[#2e1f26]/85 md:col-span-5 md:text-lg md:leading-relaxed">
              I help teams from brief to launch with tailor-made digital products. With each project I push craft and
              clarity further—strategy, interface and the details users feel every day—always with quality first.
            </div>
            <div className="overflow-hidden rounded-sm bg-[#e8e4df] shadow-[0_20px_50px_rgba(46,31,38,0.08)] md:col-span-6">
              <img
                src={imgAbout}
                alt=""
                className="aspect-[4/3] w-full object-cover object-[center_20%] md:aspect-[16/11] md:max-h-[min(72vh,560px)] md:min-h-[320px]"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-[#2e1f26]/8 bg-[#f5f2ee] px-6 py-16 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="max-w-[720px] font-['Space_Grotesk',sans-serif] text-3xl font-bold leading-tight tracking-tight text-[#2e1f26] md:text-[clamp(2rem,3.5vw,2.75rem)]">
              I can help you with ...
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-3 md:gap-10 lg:gap-16">
              <HelpColumn index="01" title="Design">
                UX and UI for web and product: flows, prototypes and polished interfaces—backed by research and a
                strong sense of hierarchy, typography and motion when it elevates the experience.
              </HelpColumn>
              <HelpColumn index="02" title="Development">
                Hands-on front-end when the concept needs to ship: structured components, responsive layouts and tasteful
                micro-interactions so the build matches the design intent.
              </HelpColumn>
              <HelpColumn
                index="03"
                title="The full package"
                titlePrefix={<span className="mr-1.5 inline-block text-[#c77840]">✦</span>}
              >
                End-to-end collaboration—from problem framing and art direction to final UI and implementation support.
                Design thinking plus execution so launches feel cohesive, fast and memorable.
              </HelpColumn>
            </div>
          </div>
        </section>
      </main>

      <ContactFooter />
    </div>
  );
}
