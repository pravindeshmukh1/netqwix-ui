import React from "react";
import ImageGallery from "react-image-gallery";

const ImageVideoThumbnailCarousel = ({
  showFullscreenButton = false,
  showPlayButton = false,
  showBullets = false,
  media,
}) => {
  return (
    <div>
      <ImageGallery
        items={media}
        showFullscreenButton={showFullscreenButton}
        showPlayButton={showPlayButton}
        showBullets={showBullets}
      />
    </div>
  );
};

export default ImageVideoThumbnailCarousel;
