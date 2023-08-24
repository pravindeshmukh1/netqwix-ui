import React, { useState } from "react";
import {
  Carousel as ReactCarousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

const Carousel = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === media.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? media.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const slides = media.map((item, index) => (
    <CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
      <div key={`${index}`} className="d-flex justify-content-center">
        {item.url ? (
          <img
            key={`image_${index}`}
            src={item.url}
            alt={item.altText}
            width={"100%"}
            height={"100%"}
          />
        ) : (
          "No media found!"
        )}
      </div>
    </CarouselItem>
  ));

  return (
    <ReactCarousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={media}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </ReactCarousel>
  );
};

export default Carousel;
