import React from "react";
import ImageGallery from "react-image-gallery";
import { carouselItem } from "./constants";
import { ArrowLeft, ArrowRight } from "react-feather";

const ImageVideoThumbnailCarousel = ({
  showFullscreenButton = false,
  showPlayButton = false,
  showBullets = false,
  media,
  originalMedia,
}) => {
  const customItems = media.map((item, index) => {
    return {
      original: item.original,
      thumbnail: item.original, // You should have a thumbnail URL for videos
      description: item.original, // Optional description
      renderItem: () => (
        <div className="video-wrapper">
          <video controls>
            <source src={item.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    };
  });

  return (
    <div>
      <ImageGallery
        items={media}
        showFullscreenButton={showFullscreenButton}
        showPlayButton={showPlayButton}
        showBullets={showBullets}
        renderLeftNav={(onClick, disabled) => {
          return <ArrowLeft className="arrowRight pointer" onClick={onClick} />;
        }}
        renderRightNav={(onClick, disabled) => {
          return (
            <ArrowRight className="arrowRight pointer" onClick={onClick} />
          );
        }}
        showThumbnails={true}
      />
    </div>
  );
};

export default ImageVideoThumbnailCarousel;
