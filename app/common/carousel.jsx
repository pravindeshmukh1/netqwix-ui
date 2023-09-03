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
        className="d-flex justify-content-center ml-4 mt-4"
      >
        {item.url && item.type === "image" ? (
          <div>
            <img
              key={`image_${index}`}
              src={item.url}
              alt={item.altText}
              className="d-block img-fluid" // Make images responsive
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h3 className="text-white">{item.title}</h3>
              <p className="text-white mt-2">{item.description}</p>
            </div>
          </div>
        ) : item.url && item.type === "video" ? (
          <>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item" // Make videos responsive
                src={`${item.url}`}
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
            <div className="carousel-caption d-none d-md-block">
              <h3 className="text-white">{item.title}</h3>
              <p className="text-white mt-2">{item.description}</p>
            </div>
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
        className="carousel-indicators-white"
      />
      {slides}
      <CarouselControl
        direction={slides.length ? "prev" : null}
        directionText={slides.length ? <ArrowLeft /> : null}
        onClickHandler={previous}
      />
      <CarouselControl
        direction={slides.length ? "next" : null}
        directionText={
          slides.length ? <ArrowRight className="arrowRight" /> : null
        }
        onClickHandler={next}
      />
    </ReactCarousel>
  );
};

export default Carousel;