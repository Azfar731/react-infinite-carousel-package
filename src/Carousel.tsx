import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import "./styles.css";

/* ------------ Prop types (unchanged except text:string) -------------- */
interface BaseCarouselProps {
  className?: string;
  num_of_copies?: number;
  animationDuration?: number;           // seconds
  animationDirection?: "ltr" | "rtl";
  hoverSpeedFactor?: number;            // 2, 0.5, 0, etc.
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

/* --------------------------------------------------------------------- */
export default function Carousel(params: CarouselProps) {
  const {
    animationDuration = 20,
    animationDirection = "ltr",
    hoverSpeedFactor = 1,
    num_of_copies = 2,
    className,
  } = params;

  /* Store refs to all marquee <div>s so we can touch their animations */
  const marqueeRefs = useRef<HTMLDivElement[]>([]) as MutableRefObject<
    HTMLDivElement[]
  >;

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !marqueeRefs.current.includes(el)) {
      marqueeRefs.current.push(el);
    }
  };

  const [hovered, setHovered] = useState(false);

  /* Adjust playbackRate or pause/resume whenever hover state changes */
  useEffect(() => {
    marqueeRefs.current.forEach((el) => {
      const anim = el.getAnimations()[0]; // first (and only) CSS animation
      if (!anim) return;

      if (hovered) {
        if (hoverSpeedFactor === 0) {
          anim.pause();             // perfect pause
        } else {
          anim.playbackRate = hoverSpeedFactor;
          anim.play();              // ensure running
        }
      } else {
        anim.playbackRate = 1;       // back to normal
        anim.play();
      }
    });
  }, [hovered, hoverSpeedFactor]);

  /* Static class setup – never recreated, so no restart */
  const dirClass = animationDirection === "rtl" ? "marquee--rtl" : "";

  const renderMarquee = (copyIdx: number) => (
    <div
      key={`marquee-${copyIdx}`}
      ref={addRef}
      className={`marquee ${dirClass}`}
      style={{ "--marquee-duration": `${animationDuration}s` } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {params.itemType === "images" ? (
        params.images_links.map((link, i) => (
          <img key={`img-${copyIdx}-${i}`} src={link} className={className} alt="" />
        ))
      ) : (
        <span className={className}>{params.text}</span>
      )}
    </div>
  );

  return (
    <div className="carousel-container">
      {Array.from({ length: num_of_copies }, (_, i) => renderMarquee(i))}
    </div>
  );
}
