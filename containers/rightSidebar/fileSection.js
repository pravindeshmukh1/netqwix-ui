import { useEffect, useState } from "react";
import { Nav, NavLink, NavItem, TabContent, TabPane, Col } from "reactstrap";
import {  Link, X } from "react-feather";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
const fiveImageGallary = [
  {
    mainColClass: "isotopeSelector filter",
    mediaClass: "media-big",
    src: "/assets/images/gallery/1.jpg",
    width: 150,
    height: 150,
  },
  {
    mediaClass: "media-small isotopeSelector filter",
    src: "/assets/images/gallery/2.jpg",
    width: 150,
    height: 150,
    Children: [
      {
        mediaClass: "media-small isotopeSelector filter",
        src: "/assets/images/gallery/3.jpg",
        width: 150,
        height: 150,
      },
    ],
  },
  {
    mediaClass: "media-small isotopeSelector filter",
    src: "/assets/images/gallery/4.jpg",
    width: 150,
    height: 150,
    Children: [
      {
        mediaClass: "media-small isotopeSelector filter fashion",
        src: "/assets/images/gallery/5.jpg",
        width: 150,
        height: 150,
      },
    ],
  },
];
const eightImageGallary = [
  {
    mainColClass: "isotopeSelector filter",
    mediaClass: "media-big",
    src: "/assets/images/gallery/1.jpg",
    width: 150,
    height: 150,
  },
  {
    mediaClass: "media-small isotopeSelector filter",
    src: "/assets/images/gallery/2.jpg",
    width: 150,
    height: 150,
    Children: [
      {
        mediaClass: "media-small isotopeSelector filter",
        src: "/assets/images/gallery/3.jpg",
        width: 150,
        height: 150,
      },
    ],
  },
  {
    mediaClass: "media-small isotopeSelector filter",
    src: "/assets/images/gallery/4.jpg",
    width: 150,
    height: 150,
    Children: [
      {
        mediaClass: "media-small isotopeSelector filter fashion",
        src: "/assets/images/gallery/5.jpg",
        width: 150,
        height: 150,
      },
    ],
  },
  {
    src: "/assets/images/gallery/2.jpg",
    width: 150,
    height: 150,
    mediaClass: "media-small isotopeSelector filter",
  },
  {
    src: "/assets/images/gallery/3.jpg",
    width: 150,
    height: 150,
    mediaClass: "media-small isotopeSelector filter",
  },
  {
    src: "/assets/images/gallery/4.jpg",
    width: 150,
    height: 150,
    mediaClass: "media-small isotopeSelector filter",
  },
];
const FileSection = (props) => {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + "my-test-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    let lightbox2 = new PhotoSwipeLightbox({
      gallery: "#" + "my-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox2.init();

    let lightbox3 = new PhotoSwipeLightbox({
      gallery: "#" + "gallery8",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox3.init();
    let lightbox4 = new PhotoSwipeLightbox({
      gallery: "#" + "gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox4.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
      lightbox2.destroy();
      lightbox2 = null;
      lightbox3.destroy();
      lightbox3 = null;
      lightbox4.destroy();
      lightbox4 = null;
    };
  }, []);
  const [activeTab, setActiveTab] = useState("media");
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [collapse4, setCollapse4] = useState(false);

  return (
    <div className="apps-content" id="files">
      <div className="theme-title">
        <div className="media">
          <div>
            <h2>Media</h2>
            {/* <h4>Shared Media</h4> */}
          </div>
          <div className="media-body media-body text-right">
              <div
                className="icon-btn btn-sm btn-outline-light close-apps pointer"
                onClick={() => props.smallSideBarToggle()}
              >
                <X />
              </div>
            </div>
        </div>
      </div>
      <div className="theme-tab">
        <Nav tabs>
          <NavItem className="ml-5px">
            <NavLink
              className={`button-effect ${
                activeTab === "media" ? "active" : ""
              }`}
              onClick={() => setActiveTab("media")}
            >
              Trainer
            </NavLink>
          </NavItem>
          <NavItem className="ml-5px">
            <NavLink
              className={`button-effect ${
                activeTab === "link" ? "active" : ""
              }`}
              onClick={() => setActiveTab("link")}
            >
              Trainee
            </NavLink>
          </NavItem>
          <NavItem className="ml-5px">
            <NavLink
              className={`button-effect ${
                activeTab === "docs" ? "active" : ""
              }`}
              onClick={() => setActiveTab("docs")}
            >
              Netquix
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className="file-tab">
        <TabContent activeTab={activeTab} className="custom-scroll">
          <TabPane tabId="media">
            <div className="media-gallery portfolio-section grid-portfolio">
              <div className={`collapse-block ${collapse1 ? "" : "open"}`}>
                <h5
                  className="block-title"
                  onClick={() => setCollapse1(!collapse1)}
                >
                  12/12/2019
                  <label className="badge badge-primary sm ml-2">8</label>
                </h5>
                <div className={`block-content ${collapse1 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="my-test-gallery">
                      {fiveImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass ? image.mainColClass : ""
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img
                                    src={image.src}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index) => (
                              <div key={index} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h5
                  className="block-title"
                  onClick={() => setCollapse2(!collapse2)}
                >
                  10/01/2020
                  <label className="badge badge-primary sm ml-2">5</label>
                </h5>
                <div className={`block-content ${collapse2 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="my-gallery">
                      {fiveImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  Eight  STRUCTURE Start  */}
                <h5
                  className="block-title"
                  onClick={() => setCollapse3(!collapse3)}
                >
                  30/04/2020
                  <label className="badge badge-primary sm ml-2">2</label>
                </h5>
                <div className={`block-content ${collapse3 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="gallery8">
                      {eightImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                {/* <div
                                className="pswp-gallery"
                                id="my-test-gallery"
                              > */}
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                                {/* </div> */}
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  Eight  STRUCTURE END  */}
                <h5
                  className="block-title"
                  onClick={() => setCollapse4(!collapse4)}
                >
                  10/01/2020
                  <label className="badge badge-primary sm ml-2">2</label>
                </h5>
                {/*  NORMAL  STRUCTURE END  */}
                <div className={`block-content ${collapse4 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="gallery">
                      {eightImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="link">
          <div className="media-gallery portfolio-section grid-portfolio">
              <div className={`collapse-block ${collapse1 ? "" : "open"}`}>
                <h5
                  className="block-title"
                  onClick={() => setCollapse1(!collapse1)}
                >
                  12/12/2019
                  <label className="badge badge-primary sm ml-2">8</label>
                </h5>
                <div className={`block-content ${collapse1 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="my-test-gallery">
                      {fiveImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass ? image.mainColClass : ""
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img
                                    src={image.src}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index) => (
                              <div key={index} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h5
                  className="block-title"
                  onClick={() => setCollapse2(!collapse2)}
                >
                  10/01/2020
                  <label className="badge badge-primary sm ml-2">5</label>
                </h5>
                <div className={`block-content ${collapse2 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="my-gallery">
                      {fiveImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  Eight  STRUCTURE Start  */}
                <h5
                  className="block-title"
                  onClick={() => setCollapse3(!collapse3)}
                >
                  30/04/2020
                  <label className="badge badge-primary sm ml-2">2</label>
                </h5>
                <div className={`block-content ${collapse3 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="gallery8">
                      {eightImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                {/* <div
                                className="pswp-gallery"
                                id="my-test-gallery"
                              > */}
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                                {/* </div> */}
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  Eight  STRUCTURE END  */}
                <h5
                  className="block-title"
                  onClick={() => setCollapse4(!collapse4)}
                >
                  10/01/2020
                  <label className="badge badge-primary sm ml-2">2</label>
                </h5>
                {/*  NORMAL  STRUCTURE END  */}
                <div className={`block-content ${collapse4 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="gallery">
                      {eightImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="docs">
          <div className="media-gallery portfolio-section grid-portfolio">
              <div className={`collapse-block ${collapse1 ? "" : "open"}`}>
                <h5
                  className="block-title"
                  onClick={() => setCollapse1(!collapse1)}
                >
                  12/12/2019
                  <label className="badge badge-primary sm ml-2">8</label>
                </h5>
                <div className={`block-content ${collapse1 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="my-test-gallery">
                      {fiveImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass ? image.mainColClass : ""
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img
                                    src={image.src}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index) => (
                              <div key={index} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h5
                  className="block-title"
                  onClick={() => setCollapse2(!collapse2)}
                >
                  10/01/2020
                  <label className="badge badge-primary sm ml-2">5</label>
                </h5>
                <div className={`block-content ${collapse2 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="my-gallery">
                      {fiveImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  Eight  STRUCTURE Start  */}
                <h5
                  className="block-title"
                  onClick={() => setCollapse3(!collapse3)}
                >
                  30/04/2020
                  <label className="badge badge-primary sm ml-2">2</label>
                </h5>
                <div className={`block-content ${collapse3 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="gallery8">
                      {eightImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                {/* <div
                                className="pswp-gallery"
                                id="my-test-gallery"
                              > */}
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                                {/* </div> */}
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  Eight  STRUCTURE END  */}
                <h5
                  className="block-title"
                  onClick={() => setCollapse4(!collapse4)}
                >
                  10/01/2020
                  <label className="badge badge-primary sm ml-2">2</label>
                </h5>
                {/*  NORMAL  STRUCTURE END  */}
                <div className={`block-content ${collapse4 ? "d-none" : ""}`}>
                  <div className="row share-media zoom-gallery">
                    <div className="pswp-gallery row mx-0" id="gallery">
                      {eightImageGallary.map((image, index) => (
                        <div
                          key={index}
                          className={`col-4 ${
                            image.mainColClass && image.mainColClass
                          }`}
                        >
                          <div className={image.mediaClass}>
                            <div className="overlay">
                              <div className="border-portfolio">
                                <a
                                  href={image.src}
                                  data-pswp-width={image.width}
                                  data-pswp-height={image.height}
                                  rel="noreferrer"
                                >
                                  <div className="overlay-background">
                                    <i
                                      className="ti-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <img src={image.src} alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                          {image.Children &&
                            image.Children.map((data, index2) => (
                              <div key={index2} className={data.mediaClass}>
                                <div className="overlay">
                                  <div className="border-portfolio">
                                    <div
                                      className="pswp-gallery"
                                      id="my-test-gallery"
                                    >
                                      <a
                                        href={data.src}
                                        data-pswp-width={data.width}
                                        data-pswp-height={data.height}
                                        rel="noreferrer"
                                      >
                                        <div className="overlay-background">
                                          <i
                                            className="ti-plus"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                        <img src={data.src} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default FileSection;
