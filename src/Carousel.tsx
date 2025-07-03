import React from "react";
import "./styles.css"; // adjust if needed

interface CarouselProps {
  items: { link: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <div className="carousel-container">
      <div className="marquee">
        {items.map((item, index) => (
          <img
            key={`A${index}`}
            src={item.link}
            className="carousel-item"
            alt="Carousel Item"
          />
        ))}
      </div>
      <div className="marquee">
        {items.map((item, index) => (
          <img
            key={`B${index}`}
            src={item.link}
            className="carousel-item"
            alt="Carousel Item"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
