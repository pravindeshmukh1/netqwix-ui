const SocialMediaIcons = ({ social_media_links }) => {
  return (
    <div>
      <ul className="integratin d-flex">
        <li>
          <div className="media">
            <div className="media-left">
              <a
                className="fb"
                href={social_media_links && social_media_links.fb}
                target="_blank"
              >
                <i className="fa fa-facebook mr-1" />
                <h5>Facebook </h5>
              </a>
            </div>
            <div className="media-right">
              <div
                className="profile"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "block",
                }}
              >
                <img
                  className="bg-img"
                  src="/assets/images/contact/1.jpg"
                  alt="Avatar"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="media">
            <div className="media-left">
              <a
                className="insta"
                href={social_media_links && social_media_links.instagram}
                target="_blank"
              >
                <i className="fa fa-instagram mr-1" />
                <h5>instagram</h5>
              </a>
            </div>
            <div className="media-right">
              <div
                className="profile"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "block",
                }}
              >
                <img
                  className="bg-img"
                  src="/assets/images/contact/2.jpg"
                  alt="Avatar"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="media">
            <div className="media-left">
              <a
                className="twi"
                href={social_media_links && social_media_links.twitter}
                target="_blank"
              >
                <i className="fa fa-twitter mr-1" />
                <h5>twitter </h5>
              </a>
            </div>
            <div className="media-right">
              <div
                className="profile"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "block",
                }}
              >
                <img
                  className="bg-img"
                  src="/assets/images/contact/3.jpg"
                  alt="Avatar"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="media">
            <div className="media-left">
              <a
                className="ggl"
                href={social_media_links && social_media_links.google}
                target="_blank"
              >
                <i className="fa fa-google mr-1" />
                <h5>google </h5>
              </a>
            </div>
            <div className="media-right">
              <div
                className="profile"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "block",
                }}
              >
                <img
                  className="bg-img"
                  src="/assets/images/contact/2.jpg"
                  alt="Avatar"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="media">
            <div className="media-left">
              <a className="slc" href="#">
                <i className="fa fa-slack mr-1" />
                <h5>Slack </h5>
              </a>
            </div>
            <div className="media-right">
              <div className="profile">
                <a
                  href={social_media_links && social_media_links.slack}
                  target="_blank"
                ></a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SocialMediaIcons;
