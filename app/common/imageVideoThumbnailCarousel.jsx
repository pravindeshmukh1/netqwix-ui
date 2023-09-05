import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';


class ImageVideoThumbnailCarousel extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showGalleryPlayButton: true,
      showVideo: false,
    }

    this.images = props?.media?.map(({ type, original, thumbnail, title, description, showVideo = false }) => {
      return type === 'video' ? {
        original,
        title,
        thumbnail,
        embedUrl: original,
        description,
        renderItem: this._renderVideo.bind(this)
      } :
        {
          original,
          title,
          thumbnail,
          description,
          renderItem: this._renderImage.bind(this)
        }
    })
    this._toggleShowVideo = this._toggleShowVideo.bind(this);
  }

  _toggleShowVideo() {
    const { showVideo } = this.state;
    this.setState({
      showVideo: !showVideo,
    });

    if (!showVideo) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        {this?.state?.showVideo ? (
          <div className="video-wrapper">
            <button className="close-video" onClick={this._toggleShowVideo} />
            <iframe
              title="sample video"
              // width="500"
              // height="300"
              src={item.embedUrl}
              style={{ border: "none" }}
              allowFullScreen
            />
          </div>
        ) : (
          <>
            <button className="play-button" onClick={this._toggleShowVideo} />
            <img
              alt="sample video cover"
              className="image-gallery-image"
              src={item.thumbnail}
            />
            {this.renderLabels(item)}
          </>
        )}
      </div>
    )
  }


  renderLabels = (item) => {
    return <>
      {item.description && (
        <span
          className="image-gallery-description"
          style={{ right: "0", left: "initial" }}
        >
          <div className='h3'>
            {item?.title}
          </div>
          <div className='mt-2'>{item?.description}</div>
        </span>
      )}
    </>
  }



  _renderImage(item) {
    console.log(`image item ----- `, item);
    return (
      <>
        <img
          alt="sample video cover"
          className="image-gallery-image"
          src={item.original}
        />
        {this.renderLabels(item)}
      </>
    )
  }



  render() {
    return <>
      <div>
        <ImageGallery
          showIndex={false}
          showBullets={true}
          infinite={true}
          showThumbnails={true}
          showFullscreenButton={false}
          showGalleryFullscreenButton={false}
          showGalleryPlayButton={false}
          showPlayButton={
            false
            // this.state.showPlayButton && this.state.showGalleryPlayButton
          }
          showNav={true}
          isRTL={false}
          slideDuration={1200}
          slideInterval={5000}
          slideOnThumbnailOver={false}
          thumbnailPosition={'bottom'}
          useWindowKeyDown={true}
          items={this.images}
        />
      </div>

    </>
  }
}

export default ImageVideoThumbnailCarousel;