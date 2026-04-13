import { useId } from "react";
import svgPaths from "../../imports/svg-crr9i1ce9w";

type LogoProps = {
  className?: string;
  /** Cor do símbolo (default: grafite do site) */
  fill?: string;
};

export function Logo({ className = "", fill = "#2E1F26" }: LogoProps) {
  const clipId = useId().replace(/:/g, "");
  return (
    <div className={`relative size-[41px] shrink-0 md:size-[36px] ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 41 41" aria-hidden>
        <g clipPath={`url(#logo-${clipId})`}>
          <path d={svgPaths.p2d46400} fill={fill} />
        </g>
        <defs>
          <clipPath id={`logo-${clipId}`}>
            <rect fill="white" height="41" width="41" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
