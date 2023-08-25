import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import {
  Carousel as ReactCarousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import { Message } from "./constants";

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
    <CarouselItem onExiting={onExiting} onExited={onExited} key={`${index}`}>
      <div
        key={`item_${index}`}
        className=" d-flex justify-content-center ml-4 mt-4"
      >
        {/* TODO: get from constance */}
        {item.url && item.type === "image" ? (
          <img
            key={`image_${index}`}
            src={item.url}
            alt={item.altText}
            className="d-block"
            style={{ width: "500px", height: "300px" }} //TODO: Adjust width and height values as needed
          />
        ) : item.url && item.type === "video" ? (
          <>
            {/* TODO: video */}
            <iframe
              className="d-block w-50"
              src={`https://www.youtube.com/embed/rokGy0huYEA`}
              allowFullScreen
              style={{ width: "500px", height: "300px" }} // TODO:Adjust width and height values as needed
              title="Embedded youtube"
            />
          </>
        ) : (
          <>{Message.noMediaFound}</>
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
        direction={slides.length ? "prev" : null}
        directionText={slides.length ? <ArrowLeft /> : null}
        onClickHandler={previous}
      />
      <CarouselControl
        direction={slides.length ? "next" : null}
        directionText={slides.length ? <ArrowRight /> : null}
        onClickHandler={next}
      />
    </ReactCarousel>
  );
};

export default Carousel;
