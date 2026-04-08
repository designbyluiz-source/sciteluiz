import svgPaths from "./svg-crr9i1ce9w";
import imgFrame5 from "../assets/24ed2fdde7b0356be69eb847960e469f7c342c23.png";
import imgFrame6 from "../assets/dea83ccece2367a9ef6dbad9c1009b587db11e08.png";

function Union() {
  return (
    <div className="relative shrink-0 size-[41px]" data-name="Union 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g clipPath="url(#clip0_1_29)" id="Union 1">
          <path d={svgPaths.p2d46400} fill="var(--fill-0, #2E1F26)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_29">
            <rect fill="white" height="41" width="41" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[40px] py-[10px] relative rounded-[50px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#2e1f26] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e1f26] text-[22px] whitespace-nowrap">WORK</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[40px] py-[10px] relative rounded-[50px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#2e1f26] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e1f26] text-[22px] whitespace-nowrap">ABOUT</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[40px] py-[10px] relative rounded-[50px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#2e1f26] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e1f26] text-[22px] whitespace-nowrap">CONTACT</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame7 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[40px] relative w-full">
          <Union />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center px-[160px] relative w-full">
          <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e1f26] text-[52px] w-[386.294px]">
            FREELANCE
            <br aria-hidden="true" />
            DESIGNER UX|UI
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex font-['Space_Grotesk:Bold',sans-serif] font-bold gap-[176px] items-center justify-center leading-[normal] relative shrink-0 text-[#2e1f26] text-[200px] w-[1440px] whitespace-nowrap">
      <p className="relative shrink-0">USER EXPERIENCE</p>
      <p className="relative shrink-0">USER INTERFACE</p>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-between pb-[80px] pt-[40px] relative size-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgFrame5} />
        <div className="absolute bg-[rgba(199,120,64,0.5)] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[84.03%] left-[10.6%] max-w-none top-[15.97%] w-[78.8%]" src={imgFrame6} />
        </div>
        <div className="absolute bg-gradient-to-b from-[65.113%] from-[rgba(199,120,64,0)] inset-0 to-[#2e1f26]" />
      </div>
      <Frame2 />
      <Frame />
      <Frame4 />
    </div>
  );
}