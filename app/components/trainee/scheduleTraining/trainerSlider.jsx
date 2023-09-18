import Slider from "react-slick";

const TrainerSlider = ({ list }) => {
  const settings = {
    autoplay: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipetoslide: true,
    autoplaySpeed: 1000,
    // arrows:false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          autoplay: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          autoplay: true,

          slidesToShow: 7,
        },
      },
      {
        breakpoint: 768,
        settings: {
          autoplay: true,

          slidesToShow: 5,
        },
      },
      {
        breakpoint: 700,
        settings: {
          autoplay: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div style={{
      marginLeft: "8%",
    }} className="recent-slider slider-container recent-chat custom-silder-margin">
      <Slider {...settings}>
        {list.map((contentInfo, index) => {
          return (
            <div key={`slider-${contentInfo.id}-${index}`} className="item">
              <div className="recent-box">
                <div className="dot-btn dot-danger grow"></div>
                <div
                  className="recent-profile"
                  style={{
                    backgroundImage: `url(${contentInfo.background_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "block",
                  }}
                >
                  {/* <img className="bg-img" src="/assets/images/avtar/1.jpg" alt="Avatar" style={{display:"none"}}/> */}
                  <h6> {contentInfo.name}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <br />
      <div />
    </div>
  );
};

export default TrainerSlider;
