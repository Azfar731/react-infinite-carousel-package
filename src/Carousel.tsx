import React, { useState } from "react";
import "./styles.css"; // adjust if needed
interface BaseCarouselProps {
  className?: string;
  num_of_copies?: number;
  animationDuration?: number;
  animationDirection?: "ltr" | "rtl";
  hoverSpeedFactor?: number;
}

// For image carousels
interface ImageCarouselProps extends BaseCarouselProps {
  itemType: "images";
  images_links: string[];
}

// For text carousels
interface TextCarouselProps extends BaseCarouselProps {
  itemType: "text";
  text: string[];
}

// Discriminated union type
type CarouselProps = ImageCarouselProps | TextCarouselProps;
const Carousel: React.FC<CarouselProps> = (params: CarouselProps) => {
  const [hovered, setHovered] = useState(false);

  const effectiveDuration = getEffectiveDuration({
    hovered,
    hoverSpeedFactor: params.hoverSpeedFactor,
    baseDuration: params.animationDuration || 20,
  });

  const numCopies = params.num_of_copies || 2;

  const animationStyle = {
    animation: `marquee ${effectiveDuration}s linear infinite   ${
      params.animationDirection === "rtl" ? "reverse" : ""
    }`,
  };

  if (params.itemType === "images") {
    const carouselCopies = Array.from({ length: numCopies }, (_, i) => (
      <div
        key={`marquee-${i}`}
        className="marquee"
        style={animationStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {params.images_links.map((link, index) => (
          <img
            key={`img-${i}-${index}`}
            src={link}
            className={`${params.className}`}
            alt="Carousel Item"
          />
        ))}
      </div>
    ));
    return <div className="carousel-container">{carouselCopies}</div>;
  } else {
    const CarouselCopies = Array.from({ length: numCopies }, (_, i) => (
      <div key={`marquee-${i}`} className="marquee" style={animationStyle}>
        <div className={`${params.className}`}>{params.text}</div>
      </div>
    ));
    return <div className="carousel-container">{CarouselCopies}</div>;
  }
};

export default Carousel;

function getEffectiveDuration({
  hovered,
  hoverSpeedFactor,
  baseDuration,
}: {
  hovered: boolean;
  hoverSpeedFactor: number | undefined;
  baseDuration: number;
}) {
  if (hovered && hoverSpeedFactor !== undefined && hoverSpeedFactor !== 1) {
    if (hoverSpeedFactor === 0) {
      return 100000; // simulate pause
    } else {
      return baseDuration / hoverSpeedFactor;
    }
  }
  return baseDuration;
}
