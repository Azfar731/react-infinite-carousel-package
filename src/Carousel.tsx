// Carousel.tsx
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import "./styles.css";

interface BaseCarouselProps {
  className?: string;
  numOfCopies?: number;
  animationDuration?: number;
  animationDirection?: "ltr" | "rtl";
  hoverSpeedFactor?: number;
  fade?: number;

  responsiveClones?: { breakpoint: number; numOfCopies: number }[];
}

interface ImageCarouselProps extends BaseCarouselProps {
  itemType: "images";
  images_links: string[];
}

interface TextCarouselProps extends BaseCarouselProps {
  itemType: "text";
  text: string;
}

type CarouselProps = ImageCarouselProps | TextCarouselProps;

/* helper for responsive clone rules -------------------------------------- */
const chooseClonesFromBreakpoints = (
  rules: { breakpoint: number; numOfCopies: number }[] = [],
  vw: number
) => {
  const sorted = [...rules].sort((a, b) => a.breakpoint - b.breakpoint);
  const match = sorted.find((r) => vw <= r.breakpoint);
  return match?.numOfCopies;
};

export default function Carousel(params: CarouselProps) {
  const {
    animationDuration = 20,
    animationDirection = "ltr",
    hoverSpeedFactor = 1,
    numOfCopies,
    responsiveClones,
    className,
    fade,
  } = params;

  /*  refs  */
  const trackRef = useRef<HTMLDivElement | null>(null); // animated wrapper
  const firstLaneRef = useRef<HTMLDivElement | null>(null); // first clone
  const containerRef = useRef<HTMLDivElement | null>(null);

  const ssrSafeVW = typeof window === "undefined" ? 1024 : window.innerWidth;
  const [clonesCount, setClonesCount] = useState<number>(() => {
    const fromBP = chooseClonesFromBreakpoints(responsiveClones, ssrSafeVW);
    return fromBP ?? numOfCopies ?? 10;
  });

  useEffect(() => {
    if (!responsiveClones?.length) return;
    const handle = () => {
      const fromBP = chooseClonesFromBreakpoints(
        responsiveClones,
        window.innerWidth
      );
      if (fromBP && fromBP !== clonesCount) setClonesCount(fromBP);
    };
    handle();
    window.addEventListener("resize", handle, { passive: true });
    return () => window.removeEventListener("resize", handle);
  }, [responsiveClones, clonesCount]);

  /* auto-calculate copies when numOfCopies NOT supplied */
  const autoCalcRequired =
    !responsiveClones?.length && typeof numOfCopies !== "number";

  useLayoutEffect(() => {
    if (!autoCalcRequired) return;
    if (!containerRef.current || !firstLaneRef.current) return;

    const calc = () => {
      const containerW = containerRef.current!.offsetWidth;
      const laneW = firstLaneRef.current!.scrollWidth;
      if (laneW === 0) return; // images may still be loading
      const needed = Math.max(2, Math.ceil(containerW / laneW) + 1);
      if (needed !== clonesCount) setClonesCount(needed);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [autoCalcRequired, clonesCount]);

  /*  hover speed / pause  */
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const anim = trackRef.current?.getAnimations()[0];
    if (!anim) return;
    if (hovered) {
      if (hoverSpeedFactor === 0) anim.pause();
      else {
        anim.playbackRate = hoverSpeedFactor;
        anim.play();
      }
    } else {
      anim.playbackRate = 1;
      anim.play();
    }
  }, [hovered, hoverSpeedFactor]);

  const createLane = (copyIdx: number, attachRef?: boolean) => (
    <div
      key={`lane-${copyIdx}`}
      ref={attachRef ? firstLaneRef : undefined}
      className="marquee-lane"
    >
      {params.itemType === "images" ? (
        params.images_links.map((link, i) => (
          <img key={`img-${copyIdx}-${i}`} src={link} className={className} />
        ))
      ) : (
        <span className={className}>{params.text}</span>
      )}
    </div>
  );

  const lanes = Array.from({ length: clonesCount }, (_, i) =>
    createLane(i, i === 0)
  );

  const dirClass = animationDirection === "rtl" ? "track--rtl" : "";

  return (
    <div
      ref={containerRef}
      style={
        fade
          ? {
              "--fade-px": `${fade}px`,
            }
          : undefined
      }
      className="carousel-container"
    >
      <div
        ref={trackRef}
        className={`track ${dirClass}`}
        style={
          {
            "--marquee-duration": `${animationDuration}s`,
          } as React.CSSProperties
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        key={clonesCount}
      >
        {lanes}
        {lanes}
      </div>
    </div>
  );
}
