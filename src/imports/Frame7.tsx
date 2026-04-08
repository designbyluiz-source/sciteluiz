function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[160px] pr-[80px] relative shrink-0 w-[920px]">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold h-[225.602px] leading-[normal] relative shrink-0 text-[#c77840] text-[33px] w-full">
        Helping brands turn complexity into clarity through design.
        <br aria-hidden="true" />
        Together we build products that scale, convert and feel effortless.
        <br aria-hidden="true" />
        No noise, just thoughtful UX and sharp UI.
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pr-[160px] relative w-full">
          <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#c77840] text-[19px] w-[386.143px]">
            <p className="leading-[normal]">
              I’m a UX/UI Designer focused on creating intuitive, high-impact digital experiences.
              <br aria-hidden="true" />
              Blending strategy, design systems and product thinking to deliver real results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#c77840] content-stretch flex h-[193px] items-center justify-center p-[40px] relative rounded-[1000px] shrink-0">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e1f26] text-[24px] whitespace-nowrap">About Me</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end justify-between px-[160px] relative w-full">
          <div className="flex flex-col font-['Space_Grotesk:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#c77840] text-[18px] w-[569.881px]">
            <p className="leading-[normal]">RECENT WORK</p>
          </div>
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute left-[1255.77px] size-[86px] top-[43.26px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86 86">
        <g id="Frame 33">
          <rect fill="var(--fill-0, #502506)" height="86" rx="43" width="86" />
          <line id="Line 9" stroke="var(--stroke-0, white)" strokeWidth="3" x1="16.2804" x2="69.7196" y1="34.5" y2="34.5" />
          <line id="Line 8" stroke="var(--stroke-0, white)" strokeWidth="3" x1="16.2804" x2="69.7196" y1="48.5" y2="48.5" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="bg-[#2e1f26] content-stretch flex flex-col items-end pb-[40px] pt-[200px] relative size-full">
      <Frame2 />
      <Frame4 />
      <Frame6 />
    </div>
  );
}