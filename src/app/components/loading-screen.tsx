import { useEffect, useState, useCallback } from "react";

const greetings = [
  "Olá",        // Brazilian Portuguese
  "Hola",       // Spanish
  "Hello",      // English
  "Bonjour",    // French
  "Ciao",       // Italian
  "Hallo",      // German
  "Konnichiwa", // Japanese
  "Annyeong",   // Korean
  "Namaste",    // Hindi
  "Merhaba",    // Turkish
];

const TYPE_SPEED = 80;    // ms per character typed
const PAUSE_AFTER = 600;  // pause after fully typed before erasing
const ERASE_SPEED = 50;   // ms per character erased
const PAUSE_BETWEEN = 300;// pause after erase before next word
const MIN_INDEX = 2;      // must reach "Hello" (index 2)

type Phase = "typing" | "paused" | "erasing" | "waiting";

interface LoadingScreenProps {
  onComplete: () => void;
  pageReady: boolean;
}

export function LoadingScreen({ onComplete, pageReady }: LoadingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [fading, setFading] = useState(false);

  const currentWord = greetings[currentIndex];
  const displayedText = currentWord.slice(0, displayedChars);

  // Typing phase
  useEffect(() => {
    if (phase !== "typing") return;
    if (displayedChars >= currentWord.length) {
      setPhase("paused");
      return;
    }
    const t = setTimeout(() => setDisplayedChars((c) => c + 1), TYPE_SPEED);
    return () => clearTimeout(t);
  }, [phase, displayedChars, currentWord]);

  // Paused phase (word fully typed)
  useEffect(() => {
    if (phase !== "paused") return;

    // Check if we should exit
    const reachedMinimum = currentIndex >= MIN_INDEX;
    const reachedEnd = currentIndex >= greetings.length - 1;
    if ((reachedMinimum && pageReady) || reachedEnd) {
      const t = setTimeout(() => setFading(true), PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setPhase("erasing"), PAUSE_AFTER);
    return () => clearTimeout(t);
  }, [phase, currentIndex, pageReady]);

  // Erasing phase
  useEffect(() => {
    if (phase !== "erasing") return;
    if (displayedChars <= 0) {
      setPhase("waiting");
      return;
    }
    const t = setTimeout(() => setDisplayedChars((c) => c - 1), ERASE_SPEED);
    return () => clearTimeout(t);
  }, [phase, displayedChars]);

  // Waiting phase (between words)
  useEffect(() => {
    if (phase !== "waiting") return;
    const t = setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setDisplayedChars(0);
      setPhase("typing");
    }, PAUSE_BETWEEN);
    return () => clearTimeout(t);
  }, [phase]);

  // Fade out complete
  useEffect(() => {
    if (fading) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [fading, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-800 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative min-h-[1.2em] flex items-center justify-center">
        <span className="font-['Space_Grotesk',sans-serif] font-bold text-white text-5xl md:text-8xl">
          {displayedText}
        </span>
        <span
          className={`inline-block w-[3px] md:w-[4px] h-[1em] bg-white ml-1 ${
            phase === "paused" ? "animate-pulse" : ""
          }`}
          style={{
            animation: phase === "paused" ? undefined : "none",
            opacity: fading ? 0 : 1,
          }}
        />
      </div>
    </div>
  );
}
