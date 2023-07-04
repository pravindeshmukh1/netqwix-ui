import { useEffect, useState } from "react";
import { Nav, NavLink, NavItem, TabContent, TabPane, Col } from "reactstrap";
import { Download, Link, X } from "react-feather";
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
            <h2>Files</h2>
            <h4>Shared Media</h4>
          </div>
          <div className="media-body media-body text-right">
            <Link
              className="icon-btn btn-sm btn-outline-light close-apps"
              href="#"
              onClick={() => props.smallSideBarToggle()}
            >
              <X />
            </Link>
          </div>
        </div>
      </div>
      <div className="theme-tab">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={`button-effect ${
                activeTab === "media" ? "active" : ""
              }`}
              onClick={() => setActiveTab("media")}
            >
              Media
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`button-effect ${
                activeTab === "link" ? "active" : ""
              }`}
              onClick={() => setActiveTab("link")}
            >
              Link
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`button-effect ${
                activeTab === "docs" ? "active" : ""
              }`}
              onClick={() => setActiveTab("docs")}
            >
              Docs
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
            <div className="link-group">
              <div className="media">
                <div className="media-body">
                  <h5 className="mt-0">Jquery Template</h5>
                  <h6>12:05 PM Today </h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/endless-react-admin-template/25365098">
                https://themeforest.net/item/endless-react-admin-template
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/12.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>React Template</h5>
                  <h6 className="mt-0">Functionality integration project.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                <div className="media-body">
                  <h5 className="mt-0">Multikart Template</h5>
                  <h6>05:12 AM Today</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/multikart-responsive-vuejs-ecommerce-template/25174665">
                https://themeforest.net/item/multikart-responsive-template
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/3.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Multipurpose Vuejs.</h5>
                  <h6 className="mt-0">
                    Template is a multi-use Vue template.
                  </h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">Unice-Multipurpose</h5>
                  <h6>03:26 PM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/unice-angular-multipurpose-template/24776272">
                https://themeforest.net/item/unice-angular-template
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/8.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Angular Template.</h5>
                  <h6 className="mt-0">Unice is a Perfect Respon.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">Endless-Angular</h5>
                  <h6>02:26 AM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/endless-angular-admin-template/23884779">
                https://themeforest.net/item/endless-angular-admin-template
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/12.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Endless Document.</h5>
                  <h6 className="mt-0">Help you understand angular.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">Bigdeal-eCommerce</h5>
                  <h6>04:00 PM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/bigdeal-ecommerce-html-template/24809149">
                https://themeforest.net/item/bigdeal-ecommerce-template
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/9.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>HTML Template.</h5>
                  <h6 className="mt-0">eCommerce HTML Template.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">Multikart-Responsive.</h5>
                  <h6>11:05 PM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/multikart-responsive-react-ecommerce-template/23067773">
                https://themeforest.net/item/multikart-responsive-react-ecommerce
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/3.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Multipurp eComme.</h5>
                  <h6 className="mt-0">Well with multi-purpose websites.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">Creative - Responsive</h5>
                  <h6>12:26 PM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/creative-responsive-admin-template/24978419">
                https://themeforest.net/item/creative-responsive
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/11.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Dashboard Templa.</h5>
                  <h6 className="mt-0">Creative Admin is a full featured.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">eComme Template</h5>
                  <h6>12:26 PM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/multikart-responsive-angular-ecommerce-template/22905358">
                https://themeforest.net/item/multikart-responsive-angular
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/3.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Responsive Ang.</h5>
                  <h6 className="mt-0">Multikart – Multipurpose.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                <div className="media"></div>
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">Multikart Templat.</h5>
                  <h6>12:26 PM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/multikart-responsive-ecommerce-html-template/22809967">
                https://themeforest.net/item/multikart-responsive-ecommerce
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/10.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Multi Responsive.</h5>
                  <h6 className="mt-0">Ecommerce HTML Theme.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                <div className="media"></div>
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">BigBoost Template</h5>
                  <h6>04:26 PM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/bigboost-ecommerce-html-template/24168053">
                https://themeforest.net/item/bigboost-ecommerce-html-template
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/7.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Fully Responsive.</h5>
                  <h6 className="mt-0">Multiple Header Varations.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">App Landing </h5>
                  <h6>10:05 PM 20/05/2019</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/unice-app-landing-corporate-and-portfolio-multipurpose-template/24581311">
                https://themeforest.net/item/unice-app-landing-corporate-and-portfolio-multipurpose-template
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/4.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Multi-Purpos theme.</h5>
                  <h6 className="mt-0">Unice is a Perfect Responsive.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">Reno - Tools Store</h5>
                  <h6>12:26 PM</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/reno-multipurpose-html-template/24141678">
                https://themeforest.net/item/reno-multipurpose-html-template
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/6.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Reno Template is a busines.</h5>
                  <h6 className="mt-0">Android Mobile or tablets.</h6>
                </div>
              </div>
            </div>
            <div className="link-group">
              <div className="media">
                {/* <Link /> */}
                <div className="media-body">
                  <h5 className="mt-0">Shop - Mart</h5>
                  <h6>12:26 PM 03/11/2019</h6>
                </div>
              </div>
              <a href="https://themeforest.net/item/shopmart-multipurpose-shopify-theme/24040917?s_rank=12">
                https://themeforest.net/item/shopmart-multipurpose-shopify-theme
              </a>
              <div className="media">
                <img
                  className="img-fluid"
                  src="/assets/images/file_icons/5.png"
                  alt="media-img"
                />
                <div className="media-body">
                  <h5>Shop Mart Landing Page.</h5>
                  <h6 className="mt-0">This is App Landing Template.</h6>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="docs">
            <ul className="chat-main">
              <li>
                <div className="chat-box">
                  <div className="media">
                    <div className="profile">
                      <a
                        className="icon-btn btn-outline-danger btn-xl pull-right rouded15"
                        href="#"
                      >
                        <i className="fa fa-file-code-o"></i>
                      </a>
                    </div>
                    <div className="details">
                      <h5>messenger.html</h5>
                      <h6>2, octomber 2019</h6>
                    </div>
                    <div className="media-body">
                      <a
                        className="icon-btn btn-outline-light btn-sm pull-right"
                        href="#"
                      >
                        <Download />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box">
                  <div className="media">
                    <div className="profile">
                      <a
                        className="icon-btn btn-outline-success btn-xl pull-right rouded15"
                        href="#"
                      >
                        <i className="fa fa-file-video-o"></i>
                      </a>
                    </div>
                    <div className="details">
                      <h5>chapter1.MP4</h5>
                      <h6>3, Octomber 2019</h6>
                    </div>
                    <div className="media-body">
                      <a
                        className="icon-btn btn-outline-light btn-sm pull-right"
                        href="#"
                      >
                        <Download />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box">
                  <div className="media">
                    <div className="profile">
                      <a
                        className="icon-btn btn-outline-primary btn-xl pull-right rouded15"
                        href="#"
                      >
                        <i className="fa fa-file-word-o"></i>
                      </a>
                    </div>
                    <div className="details">
                      <h5>salary.xlsx</h5>
                      <h6>5, Octomber 2019</h6>
                    </div>
                    <div className="media-body">
                      <a
                        className="icon-btn btn-outline-light btn-sm pull-right"
                        href="#"
                      >
                        <Download />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box">
                  <div className="media">
                    <div className="profile">
                      <a
                        className="icon-btn btn-outline-warning btn-xl pull-right rouded15"
                        href="#"
                      >
                        <i className="fa fa-file-pdf-o"></i>
                      </a>
                    </div>
                    <div className="details">
                      <h5>document.pdf</h5>
                      <h6>7, Octomber 2019</h6>
                    </div>
                    <div className="media-body">
                      <a
                        className="icon-btn btn-outline-light btn-sm pull-right"
                        href="#"
                      >
                        <Download />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box">
                  <div className="media">
                    <div className="profile">
                      <a
                        className="icon-btn btn-outline-danger btn-xl pull-right rouded15"
                        href="#"
                      >
                        <i className="fa fa-file-text-o"></i>
                      </a>
                    </div>
                    <div className="details">
                      <h5>details.txt</h5>
                      <h6>20, Octomber 2019</h6>
                    </div>
                    <div className="media-body">
                      <a
                        className="icon-btn btn-outline-light btn-sm pull-right"
                        href="#"
                      >
                        <Download />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box">
                  <div className="media">
                    <div className="profile">
                      <a
                        className="icon-btn btn-outline-success btn-xl pull-right rouded15"
                        href="#"
                      >
                        <i className="fa fa-file-code-o"></i>
                      </a>
                    </div>
                    <div className="details">
                      <h5>messenger.html</h5>
                      <h6>2, Octomber 2019</h6>
                    </div>
                    <div className="media-body">
                      <a
                        className="icon-btn btn-outline-light btn-sm pull-right"
                        href="#"
                      >
                        <Download />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default FileSection;
