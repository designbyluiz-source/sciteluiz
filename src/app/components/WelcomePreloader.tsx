import { useCallback, useEffect, useRef, useState } from "react";

/** Ordem: PT → EN → ES → ZH, depois outros */
const GREETINGS = [
  "Olá",
  "Hello",
  "Hola",
  "你好",
  "Ciao",
  "Bonjour",
  "Hallo",
  "Привет",
  "こんにちは",
  "안녕하세요",
  "Hej",
  "Merhaba",
  "Szia",
  "Ahoj",
  "Salut",
  "Sveiki",
] as const;

const PRELOADER_MS = 5000;
const EXIT_MS = 650;
const EXIT_MS_REDUCED = 220;
const TICK_MS = 260;
const TICK_MS_REDUCED = 500;

type WelcomePreloaderProps = {
  onComplete: () => void;
};

export function WelcomePreloader({ onComplete }: WelcomePreloaderProps) {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reducedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    onCompleteRef.current();
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const tick = reducedRef.current ? TICK_MS_REDUCED : TICK_MS;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % GREETINGS.length);
    }, tick);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setExiting(true), PRELOADER_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const ms = reducedRef.current ? EXIT_MS_REDUCED : EXIT_MS;
    const id = window.setTimeout(finish, ms);
    return () => window.clearTimeout(id);
  }, [exiting, finish]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#121212] transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:duration-200 ${
        exiting
          ? "-translate-y-full opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="A carregar"
    >
      <div className="flex items-center gap-[0.65em] px-6 font-['Darker_Grotesque',sans-serif] text-[clamp(1.35rem,4.5vmin,2rem)] font-normal text-white">
        <span className="size-2 shrink-0 rounded-full bg-white" aria-hidden />
        <span key={index} className="preloader-greet min-w-[2.5ch] tracking-tight">
          {GREETINGS[index]}
        </span>
      </div>
      <style>{`
        @keyframes preFade {
          from { opacity: 0.4; filter: blur(1.5px); }
          to { opacity: 1; filter: blur(0); }
        }
        .preloader-greet { animation: preFade 0.22s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .preloader-greet { animation: none; }
        }
      `}</style>
    </div>
  );
}
