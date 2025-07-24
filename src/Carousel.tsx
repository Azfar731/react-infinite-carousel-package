// Carousel.tsx
import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  MutableRefObject,
} from "react";
import "./styles.css";

interface BaseCarouselProps {
  className?: string;
  numOfCopies?: number;
  animationDuration?: number;
  animationDirection?: "ltr" | "rtl";
  hoverSpeedFactor?: number;
  responsiveClones?: { breakpoint: number; num_of_copies: number }[];
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

const chooseClonesFromBreakpoints = (
  rules: { breakpoint: number; num_of_copies: number }[],
  vw: number
) => {
  const sorted = [...rules].sort((a, b) => a.breakpoint - b.breakpoint);
  const match = sorted.find((r) => vw <= r.breakpoint);
  return match?.num_of_copies;
};

export default function Carousel(params: CarouselProps) {
  const {
    animationDuration = 20,
    animationDirection = "ltr",
    hoverSpeedFactor = 1,
    numOfCopies,
    responsiveClones,
    className,
  } = params;

  const marqueeRefs = useRef<HTMLDivElement[]>([]) as MutableRefObject<
    HTMLDivElement[]
  >;
  const addRef = (el: HTMLDivElement | null) => {
    if (el && !marqueeRefs.current.includes(el)) marqueeRefs.current.push(el);
  };

  const firstLaneRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [hovered, setHovered] = useState(false);

  const ssrSafeWindowWidth =
    typeof window === "undefined" ? 1024 : window.innerWidth;

  /** Initial guess so SSR/hydration doesn’t break layout */
  const [clonesCount, setClonesCount] = useState<number>(() => {
    const fromBp = responsiveClones
      ? chooseClonesFromBreakpoints(responsiveClones, ssrSafeWindowWidth)
      : undefined;
    return fromBp ?? numOfCopies ?? 2;
  });

  useEffect(() => {
    if (!responsiveClones?.length) return;

    const handleResize = () => {
      const fromBp = chooseClonesFromBreakpoints(
        responsiveClones,
        window.innerWidth
      );
      if (fromBp && fromBp !== clonesCount) setClonesCount(fromBp);
    };
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsiveClones, clonesCount]);

  const autoCalcRequired =
    !responsiveClones?.length && typeof numOfCopies !== "number";

  useLayoutEffect(() => {
    if (!autoCalcRequired) return;
    if (!containerRef.current || !firstLaneRef.current) return;

    const calc = () => {
      const containerW = containerRef.current!.offsetWidth;
      const laneW = firstLaneRef.current!.scrollWidth;
      if (laneW === 0) return; // images may not have loaded yet
      const needed = Math.max(2, Math.ceil(containerW / laneW) + 1);
      if (needed !== clonesCount) setClonesCount(needed);
    };

    calc();

    const ro = new ResizeObserver(calc);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalcRequired, clonesCount]);

  useEffect(() => {
    marqueeRefs.current.forEach((el) => {
      const anim = el.getAnimations()[0];
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
    });
  }, [hovered, hoverSpeedFactor]);

  const dirClass = animationDirection === "rtl" ? "marquee--rtl" : "";

  const renderMarquee = (copyIdx: number, attachFirstRef?: boolean) => (
    <div
      key={`marquee-${copyIdx}`}
      ref={(el) => {
        addRef(el);
        if (attachFirstRef) firstLaneRef.current = el;
      }}
      className={`marquee ${dirClass}`}
      style={
        { "--marquee-duration": `${animationDuration}s` } as React.CSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {params.itemType === "images" ? (
        params.images_links.map((link, i) => (
          <img
            key={`img-${copyIdx}-${i}`}
            src={link}
            className={className}
            alt=""
          />
        ))
      ) : (
        <span className={className}>{params.text}</span>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="carousel-container">
      {Array.from({ length: clonesCount }, (_, i) => renderMarquee(i, i === 0))}
    </div>
  );
}
