import { useCallback, useEffect, useState } from "react";

const ARM_DELAY_MS = 5000; // ignore the first 5s so it never pops instantly
const MIN_SCROLL_DEPTH = 400; // px — must have scrolled down first
const FAST_SCROLL_SPEED = 2; // px/ms upward
const FAST_SAMPLES_NEEDED = 3; // consecutive fast scroll events
const TOUCH_GRACE_MS = 1200; // scroll only counts shortly after a finger drag

// Module-level: survives route changes, resets on reload / next visit.
let hasTriggered = false;

export function useExitIntent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    let armed = false;
    let pendingOnReturn = false;
    let lastTouchMove = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let fastCount = 0;

    const trigger = () => {
      if (!armed || hasTriggered) return;
      hasTriggered = true;
      setIsOpen(true);
      cleanup();
    };

    // Desktop: cursor leaves through the top (tabs, address bar, close button)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Mobile: finger drag tracking so nav taps / back-to-top don't count
    const onTouchMove = () => {
      lastTouchMove = performance.now();
    };

    // Mobile: fast upward flick
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastT;
      const dy = lastY - y; // positive = scrolling up
      lastY = y;
      lastT = now;
      if (dt <= 0) return;

      const byFinger = now - lastTouchMove < TOUCH_GRACE_MS;
      const isFast = dy > 0 && dy / dt >= FAST_SCROLL_SPEED;

      if (byFinger && isFast && y > MIN_SCROLL_DEPTH) fastCount += 1;
      else fastCount = 0;

      if (fastCount >= FAST_SAMPLES_NEEDED) trigger();
    };

    // Both: user leaves the tab/app → show when they come back
    const onVisibility = () => {
      if (document.visibilityState === "hidden") pendingOnReturn = armed;
      else if (pendingOnReturn) trigger();
    };

    const timer = window.setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    const cleanup = () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return cleanup;
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, close };
}