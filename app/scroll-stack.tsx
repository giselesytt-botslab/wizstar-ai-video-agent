"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

type ScrollStackItemProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
};

export function ScrollStackItem({ children, className = "", itemClassName = "" }: ScrollStackItemProps) {
  return (
    <div className={`scroll-stack-card ${className} ${itemClassName}`.trim()}>
      {children}
    </div>
  );
}

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  mode?: "stack" | "flip";
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  collapseDistance?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
};

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

function layoutTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;

  // offsetTop follows layout geometry and is not changed by CSS transforms.
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return top;
}

function parsePosition(value: string, containerHeight: number) {
  return value.includes("%")
    ? (parseFloat(value) / 100) * containerHeight
    : parseFloat(value);
}

export default function ScrollStack({
  children,
  className = "",
  mode = "stack",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  collapseDistance = "20%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const onStackCompleteRef = useRef(onStackComplete);

  useEffect(() => {
    onStackCompleteRef.current = onStackComplete;
  }, [onStackComplete]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    const endElement = scroller.querySelector<HTMLElement>(".scroll-stack-end");
    if (!cards.length || !endElement) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileLayout = window.matchMedia("(max-width: 680px)").matches;
    const transforms = new Map<number, CardTransform>();
    let cardTops: number[] = [];
    let cardHeights: number[] = [];
    let endTop = 0;
    let updateFrame = 0;
    let lenisFrame = 0;
    let stackComplete = false;

    cards.forEach((card, index) => {
      card.style.marginBottom = index < cards.length - 1 ? `${itemDistance}px` : "0px";
      card.style.transformOrigin = mode === "flip" ? "center center" : "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.willChange = reduceMotion || mobileLayout ? "auto" : "transform";
    });

    const measure = () => {
      if (useWindowScroll) {
        cardTops = cards.map(layoutTop);
        cardHeights = cards.map((card) => card.offsetHeight);
        endTop = layoutTop(endElement);
      } else {
        const inner = scroller.querySelector<HTMLElement>(".scroll-stack-inner");
        const innerTop = inner?.offsetTop ?? 0;
        cardTops = cards.map((card) => innerTop + card.offsetTop);
        cardHeights = cards.map((card) => card.offsetHeight);
        endTop = innerTop + endElement.offsetTop;
      }
    };

    const writeTransform = (card: HTMLElement, index: number, next: CardTransform) => {
      const previous = transforms.get(index);
      const changed =
        !previous ||
        Math.abs(previous.translateY - next.translateY) > 0.1 ||
        Math.abs(previous.scale - next.scale) > 0.001 ||
        Math.abs(previous.rotation - next.rotation) > 0.1 ||
        Math.abs(previous.blur - next.blur) > 0.1;

      if (!changed) return;

      card.style.transform = mode === "flip"
        ? `perspective(1400px) translate3d(0, ${next.translateY}px, 0) rotateX(${next.rotation}deg) scale(${next.scale})`
        : `translate3d(0, ${next.translateY}px, 0) scale(${next.scale}) rotate(${next.rotation}deg)`;
      card.style.filter = next.blur > 0 ? `blur(${next.blur}px)` : "none";
      transforms.set(index, next);
    };

    const update = () => {
      if (reduceMotion || mobileLayout) return;

      const scrollTop = useWindowScroll ? window.scrollY : scroller.scrollTop;
      const containerHeight = useWindowScroll ? window.innerHeight : scroller.clientHeight;

      if (mode === "flip") {
        const viewportCenter = scrollTop + containerHeight / 2;

        cards.forEach((card, index) => {
          const cardCenter = cardTops[index] + cardHeights[index] / 2;
          const position = Math.max(-1, Math.min(1, (cardCenter - viewportCenter) / containerHeight));
          const distance = Math.abs(position);

          writeTransform(card, index, {
            translateY: Math.round(position * 24 * 100) / 100,
            scale: Math.round((1 - distance * 0.025) * 1000) / 1000,
            rotation: Math.round((-position * 7) * 100) / 100,
            blur: 0,
          });
        });

        const lastCardCenter = cardTops[cards.length - 1] + cardHeights[cards.length - 1] / 2;
        const complete = viewportCenter >= lastCardCenter;
        if (complete && !stackComplete) onStackCompleteRef.current?.();
        stackComplete = complete;
        return;
      }

      const stackPositionPx = parsePosition(stackPosition, containerHeight);
      const collapseDistancePx = parsePosition(collapseDistance, containerHeight);
      const tallestCard = Math.max(...cardHeights);
      const availableStackOffset = Math.max(0, containerHeight - stackPositionPx - tallestCard - 16);
      const stackDistancePx = Math.min(
        itemStackDistance,
        availableStackOffset / Math.max(1, cards.length - 1),
      );
      const releaseOffsetPx = useWindowScroll ? Math.min(220, containerHeight * 0.25) : 0;
      const pinEnd = endTop - containerHeight / 2 - releaseOffsetPx;
      let topCardIndex = 0;

      for (let index = 0; index < cards.length; index += 1) {
        const trigger = cardTops[index] - stackPositionPx - stackDistancePx * index;
        if (scrollTop >= trigger) topCardIndex = index;
      }

      cards.forEach((card, index) => {
        const cardTop = cardTops[index];
        const pinStart = cardTop - stackPositionPx - stackDistancePx * index;
        const nextPinStart = index < cards.length - 1
          ? cardTops[index + 1] - stackPositionPx - stackDistancePx * (index + 1)
          : Number.POSITIVE_INFINITY;
        const collapseStart = Math.max(pinStart, nextPinStart - collapseDistancePx);
        const scaleProgress = index < cards.length - 1
          ? Math.max(0, Math.min(1, (scrollTop - collapseStart) / Math.max(1, nextPinStart - collapseStart)))
          : 0;
        const targetScale = baseScale + index * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);

        let translateY = 0;
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx + stackDistancePx * index;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + stackDistancePx * index;
        }

        const blur = blurAmount > 0 && index < topCardIndex
          ? (topCardIndex - index) * blurAmount
          : 0;

        writeTransform(card, index, {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(index * rotationAmount * scaleProgress * 100) / 100,
          blur: Math.round(blur * 100) / 100,
        });
      });

      const lastStart = cardTops[cards.length - 1] - stackPositionPx - stackDistancePx * (cards.length - 1);
      const complete = scrollTop >= lastStart && scrollTop <= pinEnd;
      if (complete && !stackComplete) onStackCompleteRef.current?.();
      stackComplete = complete;
    };

    const scheduleUpdate = () => {
      if (updateFrame) return;
      updateFrame = window.requestAnimationFrame(() => {
        updateFrame = 0;
        update();
      });
    };

    const resetForNaturalFlow = () => {
      cards.forEach((card) => {
        card.style.transform = "none";
        card.style.filter = "none";
        card.style.willChange = "auto";
      });
      transforms.clear();
    };

    measure();

    if (reduceMotion || mobileLayout) {
      resetForNaturalFlow();
      return;
    }

    const lenis = useWindowScroll
      ? new Lenis({
          duration: 1.2,
          easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          lerp: 0.1,
          syncTouch: true,
          syncTouchLerp: 0.075,
        })
      : new Lenis({
          wrapper: scroller,
          content: scroller.querySelector<HTMLElement>(".scroll-stack-inner") ?? undefined,
          duration: 1.2,
          easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          lerp: 0.1,
          syncTouch: true,
          syncTouchLerp: 0.075,
        });

    lenis.on("scroll", scheduleUpdate);

    const animateLenis = (time: number) => {
      lenis.raf(time);
      lenisFrame = window.requestAnimationFrame(animateLenis);
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      scheduleUpdate();
    });

    resizeObserver.observe(scroller);
    cards.forEach((card) => resizeObserver.observe(card));
    window.addEventListener("resize", measure, { passive: true });
    lenisFrame = window.requestAnimationFrame(animateLenis);
    scheduleUpdate();

    return () => {
      window.cancelAnimationFrame(updateFrame);
      window.cancelAnimationFrame(lenisFrame);
      window.removeEventListener("resize", measure);
      resizeObserver.disconnect();
      lenis.destroy();
      resetForNaturalFlow();
    };
  }, [
    baseScale,
    blurAmount,
    collapseDistance,
    itemDistance,
    itemScale,
    itemStackDistance,
    mode,
    rotationAmount,
    stackPosition,
    useWindowScroll,
  ]);

  return (
    <div
      ref={scrollerRef}
      className={`scroll-stack scroll-stack-${mode} ${useWindowScroll ? "scroll-stack-window" : "scroll-stack-contained"} ${className}`.trim()}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}

export { ScrollStack };
