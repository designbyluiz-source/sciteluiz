import svgPaths from "./svg-q9rxfrhwj9";

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-68px] relative shrink-0 w-[533.374px]">
      <div className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[#2e1f26] text-[100px] whitespace-nowrap">
        <p className="leading-[normal] mb-0">Lets Work</p>
        <p className="leading-[normal]">Together</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#2e1f26] content-stretch flex items-center justify-center p-[10px] relative rounded-[1000px] shrink-0 size-[263px]">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c77840] text-[30px] whitespace-nowrap">Get in Touch</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center mb-[-68px] relative shrink-0 w-full">
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative">
        <div className="absolute inset-[-2px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 765.02 2">
            <line id="Line 6" stroke="var(--stroke-0, #2E1F26)" strokeWidth="2" x2="765.02" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <Frame10 />
      <div className="h-0 relative shrink-0 w-[91.98px]">
        <div className="absolute inset-[-2px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.98 2">
            <line id="Line 7" stroke="var(--stroke-0, #2E1F26)" strokeWidth="2" x2="91.98" y1="1" y2="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[50px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#2e1f26] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e1f26] text-[22px] whitespace-nowrap">@designby.luiz@outlook.com</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[50px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#2e1f26] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e1f26] text-[22px] whitespace-nowrap">+55 41 9 9989-0036</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center mb-[-68px] relative shrink-0">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start pb-[68px] px-[160px] relative w-full">
        <Frame1 />
        <Frame11 />
        <Frame2 />
      </div>
    </div>
  );
}

function Behance() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Behance">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Behance">
          <path d={svgPaths.p2c927580} fill="var(--fill-0, #C77840)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#2e1f26] content-stretch flex items-center justify-center p-[20px] relative rounded-[60px] shrink-0">
      <Behance />
    </div>
  );
}

function LinkedIn() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="LinkedIn">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="LinkedIn">
          <path d={svgPaths.p1e28a80} fill="var(--fill-0, #C77840)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#2e1f26] content-stretch flex items-center justify-center p-[20px] relative rounded-[60px] shrink-0">
      <LinkedIn />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[29px] items-center relative shrink-0">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[40px] relative w-full">
          <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e1f26] text-[45px] whitespace-nowrap">2026</p>
          <Frame />
        </div>
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="bg-[#c77840] content-stretch flex flex-col gap-[126px] items-start pb-[40px] pt-[120px] relative size-full">
      <Frame3 />
      <Frame5 />
    </div>
  );
}