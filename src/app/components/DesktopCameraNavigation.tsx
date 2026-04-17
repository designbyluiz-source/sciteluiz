import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../language";

type RuntimeState = "idle" | "loading" | "ready" | "error";
type CursorPoint = { x: number; y: number };

const GRAB_FINGER_COUNT = 3;
const OPEN_FINGER_COUNT = 2;
const CLICK_PINCH_THRESHOLD = 0.32;
const CURSOR_SMOOTHING = 0.55;
const SCROLL_SPEED = 2.8;
const INPUT_MARGIN_X = 0.18;
const INPUT_MARGIN_Y = 0.2;
const CURL_THRESHOLD = 0.85;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getScrollableAncestors(start: Element | null) {
  const elements: HTMLElement[] = [];
  let current = start instanceof HTMLElement ? start : null;
  while (current) {
    const style = window.getComputedStyle(current);
    if ((style.overflowY === "auto" || style.overflowY === "scroll") && current.scrollHeight > current.clientHeight + 8) {
      elements.push(current);
    }
    current = current.parentElement;
  }
  return elements;
}

function normalizeInput(value: number, margin: number) {
  return clamp((value - margin) / (1 - margin * 2), 0, 1);
}

export function DesktopCameraNavigation() {
  const { t } = useLanguage();
  const [enabled, setEnabled] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [runtimeState, setRuntimeState] = useState<RuntimeState>("idle");
  const [status, setStatus] = useState("");
  const [cursor, setCursor] = useState<CursorPoint>({ x: 0.5, y: 0.5 });
  const [hoveredTag, setHoveredTag] = useState<string>("");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [cursorEmoji, setCursorEmoji] = useState("☝️");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const cursorRef = useRef<CursorPoint>({ x: 0.5, y: 0.5 });
  const grabStateRef = useRef(false);
  const pinchStateRef = useRef(false);
  const lastGrabPalmYRef = useRef<number | null>(null);
  const hoverCardRef = useRef<HTMLElement | null>(null);

  const isDesktop = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
  }, []);

  const stopTracking = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastVideoTimeRef.current = -1;
    lastGrabPalmYRef.current = null;
    pinchStateRef.current = false;
    grabStateRef.current = false;
    handLandmarkerRef.current?.close();
    handLandmarkerRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    if (hoverCardRef.current) {
      delete hoverCardRef.current.dataset.cameraHovered;
      hoverCardRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  useEffect(() => {
    if (!enabled) {
      stopTracking();
      setRuntimeState("idle");
      setStatus("");
      setIsGrabbing(false);
      setHoveredTag("");
      setCursorEmoji("☝️");
    }
  }, [enabled, stopTracking]);

  const updateHoverTarget = useCallback((next: CursorPoint) => {
    const viewportX = next.x * window.innerWidth;
    const viewportY = next.y * window.innerHeight;
    const target = document.elementFromPoint(viewportX, viewportY) as HTMLElement | null;
    const hoverCard = target?.closest("[data-camera-hover-target]") as HTMLElement | null;
    if (hoverCardRef.current && hoverCardRef.current !== hoverCard) {
      delete hoverCardRef.current.dataset.cameraHovered;
    }
    if (hoverCard) {
      hoverCard.dataset.cameraHovered = "true";
    }
    hoverCardRef.current = hoverCard;
    const interactive = target?.closest("a, button, [role='button'], input, textarea, select") as HTMLElement | null;
    setHoveredTag(interactive ? interactive.tagName.toLowerCase() : "");
    return interactive ?? target;
  }, []);

  const performClick = useCallback(
    (next: CursorPoint) => {
      const target = updateHoverTarget(next) as HTMLElement | null;
      if (!target) return;
      target.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, clientX: next.x * window.innerWidth, clientY: next.y * window.innerHeight }));
      target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, clientX: next.x * window.innerWidth, clientY: next.y * window.innerHeight }));
      target.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, clientX: next.x * window.innerWidth, clientY: next.y * window.innerHeight }));
      target.click();
      setStatus(t("cameraNavClick"));
    },
    [t, updateHoverTarget],
  );

  const startTracking = useCallback(async () => {
    if (!isDesktop) {
      setRuntimeState("error");
      setStatus(t("cameraNavDesktopOnly"));
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setRuntimeState("error");
      setStatus(t("cameraNavUnsupported"));
      return;
    }

    try {
      setRuntimeState("loading");
      setStatus(t("cameraNavLoading"));

      const filesetResolver = await FilesetResolver.forVisionTasks("/wasm");

      const handLandmarker = await HandLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      streamRef.current = stream;
      handLandmarkerRef.current = handLandmarker;

      if (!videoRef.current) {
        throw new Error("Video element unavailable");
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      const loop = () => {
        const currentVideo = videoRef.current;
        if (!currentVideo) return;

        if (currentVideo.readyState >= 2 && currentVideo.currentTime !== lastVideoTimeRef.current) {
          lastVideoTimeRef.current = currentVideo.currentTime;
          const now = performance.now();
          const handResult = handLandmarkerRef.current?.detectForVideo(currentVideo, now);

          const handLandmarks = handResult?.landmarks?.[0];
          if (handLandmarks?.length) {
            const indexTip = handLandmarks[8];
            const middleTip = handLandmarks[12];
            const thumbTip = handLandmarks[4];
            const wrist = handLandmarks[0];
            const middleBase = handLandmarks[9];
            const pinkyTip = handLandmarks[20];
            const handScale = Math.max(distance(wrist, middleBase), 0.0001);
            const palmY = (wrist.y + handLandmarks[5].y + handLandmarks[17].y) / 3;
            const pinchAmount = distance(thumbTip, indexTip) / handScale;
            const indexCurl = distance(indexTip, wrist) / Math.max(distance(handLandmarks[6], wrist), 0.0001);
            const middleCurl = distance(middleTip, wrist) / Math.max(distance(handLandmarks[10], wrist), 0.0001);
            const ringCurl = distance(handLandmarks[16], wrist) / Math.max(distance(handLandmarks[14], wrist), 0.0001);
            const pinkyCurl = distance(pinkyTip, wrist) / Math.max(distance(handLandmarks[18], wrist), 0.0001);
            const closedFingerCount = [indexCurl, middleCurl, ringCurl, pinkyCurl].filter((value) => value < CURL_THRESHOLD).length;

            const pointerX = 1 - (indexTip.x + middleTip.x) / 2;
            const pointerY = (indexTip.y + middleTip.y) / 2;
            const normalizedX = normalizeInput(pointerX, INPUT_MARGIN_X);
            const normalizedY = normalizeInput(pointerY, INPUT_MARGIN_Y);

            const nextCursor = {
              x: clamp(cursorRef.current.x + (normalizedX - cursorRef.current.x) * CURSOR_SMOOTHING, 0, 1),
              y: clamp(cursorRef.current.y + (normalizedY - cursorRef.current.y) * CURSOR_SMOOTHING, 0, 1),
            };
            cursorRef.current = nextCursor;
            setCursor(nextCursor);

            const hoveredElement = updateHoverTarget(nextCursor);

            const isClosedHand = closedFingerCount >= GRAB_FINGER_COUNT;
            if (isClosedHand) {
              if (!grabStateRef.current) {
                grabStateRef.current = true;
                setIsGrabbing(true);
                setCursorEmoji("✊");
                setStatus(t("cameraNavGrabStart"));
                lastGrabPalmYRef.current = palmY;
              } else if (lastGrabPalmYRef.current != null) {
                const scrollDelta = (palmY - lastGrabPalmYRef.current) * window.innerHeight * SCROLL_SPEED;
                if (Math.abs(scrollDelta) > 2) {
                  const scrollTarget =
                    getScrollableAncestors(hoveredElement)[0] ??
                    (document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement);
                  scrollTarget.scrollBy({ top: scrollDelta, behavior: "auto" });
                }
                lastGrabPalmYRef.current = palmY;
              }
            } else if (grabStateRef.current && closedFingerCount <= OPEN_FINGER_COUNT) {
              grabStateRef.current = false;
              setIsGrabbing(false);
              setCursorEmoji("🖐️");
              setStatus(t("cameraNavRelease"));
              lastGrabPalmYRef.current = null;
            } else if (!grabStateRef.current) {
              lastGrabPalmYRef.current = palmY;
            }

            const isPinching = pinchAmount < CLICK_PINCH_THRESHOLD;
            if (isPinching && !pinchStateRef.current && !grabStateRef.current) {
              pinchStateRef.current = true;
              setCursorEmoji("👌");
              performClick(nextCursor);
            } else if (!isPinching) {
              pinchStateRef.current = false;
              setCursorEmoji(grabStateRef.current ? "✊" : hoveredTag ? "👉" : "☝️");
            }
          } else {
            setHoveredTag("");
            if (grabStateRef.current) {
              grabStateRef.current = false;
              setIsGrabbing(false);
              setStatus(t("cameraNavRelease"));
            }
            lastGrabPalmYRef.current = null;
            pinchStateRef.current = false;
            setCursorEmoji("✋");
          }
        }

        rafRef.current = requestAnimationFrame(loop);
      };

      setEnabled(true);
      setPanelOpen(false);
      setRuntimeState("ready");
      setStatus(t("cameraNavReady"));
      rafRef.current = requestAnimationFrame(loop);
    } catch (error) {
      stopTracking();
      setRuntimeState("error");
      setEnabled(false);
      setStatus(error instanceof Error && error.message ? `${t("cameraNavPermissionDenied")} ${error.message}` : t("cameraNavPermissionDenied"));
    }
  }, [isDesktop, performClick, stopTracking, t, updateHoverTarget]);

  if (!isDesktop) return null;

  const buttonLabel = enabled ? t("cameraNavStop") : t("cameraNavStart");
  const launcherEmoji = enabled ? "📷" : "👋";

  return (
    <>
      <div className="pointer-events-auto fixed bottom-4 left-[max(72px,calc(var(--shell-pad,16px)+32px))] z-[90] flex flex-col items-start gap-3">
        {panelOpen ? (
          <div className="w-[min(320px,calc(100vw-32px))] rounded-[28px] border border-white/20 bg-black/70 p-4 text-white shadow-2xl backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-['Darker_Grotesque',sans-serif] text-[1.1rem] font-bold uppercase tracking-wide">
                  {t("cameraNavTitle")}
                </p>
                <p className="mt-1 font-['Darker_Grotesque',sans-serif] text-[0.95rem] leading-tight text-white/80">
                  {t("cameraNavSummary")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="rounded-full border border-white/30 px-3 py-1 font-['Darker_Grotesque',sans-serif] text-[0.85rem] font-bold uppercase tracking-wide text-white/80 transition hover:bg-white hover:text-black"
              >
                {t("cameraNavClose")}
              </button>
            </div>

            <div className="mt-3 space-y-2 font-['Darker_Grotesque',sans-serif] text-[1rem] leading-tight">
              <p>{t("cameraNavHandHelp")}</p>
              <p>{t("cameraNavClickHelp")}</p>
            </div>

            <p className="mt-3 min-h-[1.5rem] font-['Darker_Grotesque',sans-serif] text-[0.95rem] text-white/75" aria-live="polite">
              {runtimeState === "loading" ? t("cameraNavLoading") : status || t("cameraNavHint")}
            </p>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (enabled) {
                    stopTracking();
                    setEnabled(false);
                    setRuntimeState("idle");
                    setStatus("");
                    setPanelOpen(false);
                    return;
                  }
                  void startTracking();
                }}
                className="rounded-full border border-white/50 px-4 py-2 font-['Darker_Grotesque',sans-serif] text-[0.95rem] font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setPanelOpen((current) => !current)}
          aria-label={t("cameraNavLauncher")}
          className={`flex items-center gap-2 rounded-full border px-4 py-3 text-white shadow-2xl backdrop-blur-md transition ${
            enabled ? "border-white/35 bg-black/65" : "border-white/20 bg-black/45 hover:bg-black/60"
          }`}
        >
          <span className="text-[1.25rem]" aria-hidden>
            {launcherEmoji}
          </span>
          <span className="font-['Darker_Grotesque',sans-serif] text-[0.95rem] font-bold uppercase tracking-wide">
            {enabled ? t("cameraNavOn") : t("cameraNavTitle")}
          </span>
        </button>
      </div>

      {enabled ? (
        <div
          className="pointer-events-none fixed z-[95] -translate-x-1/2 -translate-y-1/2 text-[2rem] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
          style={{
            left: cursor.x * window.innerWidth,
            top: cursor.y * window.innerHeight,
          }}
          aria-hidden
        >
          <span role="presentation">{cursorEmoji}</span>
        </div>
      ) : null}

      <video ref={videoRef} className="hidden" muted playsInline autoPlay />
    </>
  );
}
