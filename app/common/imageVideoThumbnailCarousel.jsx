import React from 'react';
import ImageGallery from 'react-image-gallery';
import {carouselItem} from './constants';

const ImageVideoThumbnailCarousel = ({
  showFullscreenButton = false,
  showPlayButton = false,
  showBullets = false,
  media,
  originalMedia,
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
