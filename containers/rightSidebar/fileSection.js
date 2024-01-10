import { useEffect, useState } from "react";
import { Nav, NavLink, NavItem, TabContent, TabPane, Col, Button } from "reactstrap";
import { Link, X } from "react-feather";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { videouploadAction, videouploadState } from "../../app/components/videoupload/videoupload.slice";
import { myClips, reports, traineeClips } from "./fileSection.api";
import { LOCAL_STORAGE_KEYS } from "../../app/common/constants";
import Modal from "../../app/common/modal";
import VideoUpload from "../../app/components/videoupload";
import ReportModal from "../../app/components/video/reportModal";

import { Tooltip } from "react-tippy";

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
    src: "/assets/images/gallery/4.jpg",
    width: 150,
    height: 150,
    mediaClass: "media-small isotopeSelector filter",
  }, {
    src: "/assets/images/gallery/4.jpg",
    width: 150,
    height: 150,
    mediaClass: "media-small isotopeSelector filter",
  }, {
    src: "/assets/images/gallery/4.jpg",
    width: 150,
    height: 150,
    mediaClass: "media-small isotopeSelector filter",
  }, {
    src: "/assets/images/gallery/4.jpg",
    width: 150,
    height: 150,
    mediaClass: "media-small isotopeSelector filter",
  }, {
    src: "/assets/images/gallery/4.jpg",
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
];

var netquixVideos = [{
  "_id": "656acd81cd2d7329ed0d8e91",
  "title": "Dog Activity",
  "category": "Acting",
  "user_id": "6533881d1e8775aaa25b3b6e",
  "createdAt": "2023-12-02T06:24:01.995Z",
  "updatedAt": "2023-12-02T06:24:01.995Z",
  "__v": 0
},
{
  "_id": "657053c4c440a4d0d775e639",
  "title": "Pupppy clip",
  "category": "Golf",
  "user_id": "64ad7aae6d668be38e53be1b",
  "createdAt": "2023-12-06T10:58:12.080Z",
  "updatedAt": "2023-12-06T10:58:12.080Z",
  "__v": 0
}]

const FileSection = (props) => {
  const dispatch = useAppDispatch();

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
  const { isOpen } = useAppSelector(videouploadState);
  const [activeTab, setActiveTab] = useState("media");
  const [clips, setClips] = useState([]);
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [collapse4, setCollapse4] = useState(false);
  const [isOpenPlayVideo, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [traineeClip, setTraineeClips] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [reportsData, setReportsData] = useState([]);
  const [isOpenPDF, setIsOpenPDF] = useState(false);
  const [reportName, setReportName] = useState("");
  const [isOpenReport, setIsOpenReport] = useState(false);

  const [currentReportData, setCurrentReportData] = useState({})



  const [videoDimensions, setVideoDimensions] = useState({ width: "470px", height: "587px" });

  const handleVideoLoad = (event) => {
    const video = event.target;
    const aspectRatio = video.videoWidth / video.videoHeight;
  
    // Set width and height based on aspect ratio
    if (aspectRatio > 1) {
      setVideoDimensions({ width: "100%", height: "70%" });
    } else {
      setVideoDimensions({ width: "470px", height: "587px" });
    }
  };

  useEffect(() => {
    if (!isOpen) getMyClips()
  }, [isOpen])

  useEffect(() => {
    setAccountType(localStorage.getItem(LOCAL_STORAGE_KEYS.ACC_TYPE));
  }, []);

  const getMyClips = async () => {
    setClips([])
    setTraineeClips([])
    var res = await myClips({})
    setClips(res?.data)
    var res2 = await traineeClips({})
    setTraineeClips(res2?.data)
    var res3 = await reports({})
    setReportsData(res3?.result || [])
  }


  return (
    <div className="apps-content" id="files">
      <div className="theme-title">
        <div className="media">
          <div>
            <h2>Locker</h2>
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
      <Button className="button-effect mb-3" style={{ width: "100%", justifyContent: 'center' }} color="primary" onClick={() => dispatch(videouploadAction.setIsOpen(true))} >
        Upload Clip
      </Button>
      <VideoUpload />
      <div className="theme-tab">
        <Nav tabs>

          <NavItem className="ml-5px">
            <NavLink
              className={`button-effect ${activeTab === "media" ? "active" : ""
                }`}
              onClick={() => setActiveTab("media")}
            >
              My Clips
            </NavLink>
          </NavItem>
          {accountType === "Trainer" && <NavItem className="ml-5px">
            <NavLink
              className={`button-effect ${activeTab === "trainee" ? "active" : ""
                }`}
              onClick={() => setActiveTab("trainee")}
            >
              Trainee
            </NavLink>
          </NavItem>}
          {accountType === "Trainer" && <NavItem className="ml-5px">
            <NavLink
              className={`button-effect ${activeTab === "docs" ? "active" : ""
                }`}
              onClick={() => setActiveTab("docs")}
            >
              Netquix
            </NavLink>
          </NavItem>}

          <NavItem className="Report ml-5px " style={{ marginTop: accountType === "Trainer" ? "10px" : "0px" }}>
            <NavLink
              className={`button-effect ${activeTab === "report" ? "active" : ""}`}
              onClick={() => setActiveTab("report")}
            >
              Reports
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className="file-tab">
        <TabContent activeTab={activeTab} className="custom-scroll">
          <TabPane tabId="media">
            <div className="media-gallery portfolio-section grid-portfolio">
              {clips?.length ? clips?.map((cl, ind) =>
                <div className={`collapse-block ${!cl?.show ? "" : "open"}`}>
                  <h5
                    className="block-title"
                    onClick={() => {
                      var temp = clips
                      temp = temp.map(vl => { return { ...vl, show: false } })
                      temp[ind].show = true
                      setClips([...temp])
                    }}
                  >
                    {cl?._id}
                    <label className="badge badge-primary sm ml-2">{cl?.clips?.length}</label>
                  </h5>
                  {/*  NORMAL  STRUCTURE END  */}
                  <div className={`block-content ${!cl?.show ? "d-none" : ""}`}>
                    <div className="row">
                      {cl?.clips.map((clp, index) => (
                        <div
                          key={index}
                          className={`col-4 p-1`}
                          style={{ borderRadius: 5 }}
                          onClick={() => {
                            setSelectedVideo(`https://netquix.s3.ap-south-1.amazonaws.com/${clp?._id}`)
                            setIsOpen(true)
                          }}
                        >
                          <Tooltip title={clp?.title} position="top" trigger="mouseenter">
                            <video style={{ width: "5vw", height: "9vh" }}  >
                              <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${clp?._id}`} type="video/mp4" />
                            </video>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : <>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                  <h5 className="block-title">  No Data Found</h5>
                </div>
              </>}
            </div>
          </TabPane>
          <TabPane tabId="trainee">
            <div className="media-gallery portfolio-section grid-portfolio">
              {traineeClip?.length ? traineeClip?.map((cl, ind) =>
                <div className={`collapse-block ${!cl?.show ? "" : "open"}`}>
                  <h5
                    className="block-title"
                    onClick={() => {
                      var temp = traineeClip
                      temp = temp.map(vl => { return { ...vl, show: false } })
                      temp[ind].show = true
                      setTraineeClips([...temp])
                    }}
                  >
                    {cl?._id?.fullname}
                    <label className="badge badge-primary sm ml-2">{cl?.clips?.length}</label>
                  </h5>
                  {/*  NORMAL  STRUCTURE END  */}
                  <div className={`block-content ${!cl?.show ? "d-none" : ""}`}>
                    <div className="row">
                      {cl?.clips.map((clp, index) => (
                        <div
                          key={index}
                          className={`col-4 p-1`}
                          style={{ borderRadius: 5 }}
                          onClick={() => {
                            setSelectedVideo(`https://netquix.s3.ap-south-1.amazonaws.com/${clp?.clips?._id}`)
                            setIsOpen(true)
                          }}
                        >
                          <Tooltip title={clp?.clips?.title} position="top" trigger="mouseenter">
                            <video style={{ width: "80%", height: "80%" }}  >
                              <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${clp?.clips?._id}`} type="video/mp4" />
                            </video>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <h5 className="block-title">  No Data Found</h5>
              </div>}
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
                          className={`col-4 ${image.mainColClass ? image.mainColClass : ""
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
                          className={`col-4 ${image.mainColClass && image.mainColClass
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
                          className={`col-4 ${image.mainColClass && image.mainColClass
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
                          className={`col-4 ${image.mainColClass && image.mainColClass
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
                <div className={`block-content ${collapse4 ? "d-none" : ""}`}>
                  <div className="row">
                    {netquixVideos.map((clp, index) => (
                      <div
                        key={index}
                        className={`col-6 p-1`}
                        style={{ borderRadius: 5 }}
                        onClick={() => {
                          setSelectedVideo(`https://netquix.s3.ap-south-1.amazonaws.com/${clp?._id}`)
                          setIsOpen(true)
                        }}
                      >
                        <Tooltip title="Title" position="top" trigger="mouseenter">
                          <video style={{ width: "100%", height: "100%" }}  >
                            <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${clp?._id}`} type="video/mp4" />
                          </video>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="report">
            <div className="media-gallery portfolio-section grid-portfolio">
              {reportsData?.length ? reportsData?.map((cl, ind) =>
                <div className={`collapse-block ${!cl?.show ? "" : "open"}`}>
                  <h5
                    className="block-title"
                    onClick={() => {
                      var temp = reportsData
                      temp = temp.map(vl => { return { ...vl, show: false } })
                      temp[ind].show = true
                      setReportsData([...temp])
                    }}
                  >
                    <label className="badge badge-primary sm ml-2">{`${cl?._id?.day}/${cl?._id?.month}/${cl?._id?.year}`}</label>
                  </h5>
                  {/*  NORMAL  STRUCTURE END  */}
                  <div className={`block-content ${!cl?.show ? "d-none" : "d-flex flex-wrap"}`}>
  {cl?.report.map((clp, index) => (
     <div className={`col-6`} key={index} style={{ whiteSpace: "nowrap" }}>
      <div className="ml-3" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: "5px" }}>
          <dd
            className="ml-3"
            style={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => {
              if (accountType === "Trainer") {
                setCurrentReportData({ session: clp?.session?._id, trainer: clp?.trainer?._id, trainee: clp?.trainee?._id })
                setIsOpenReport(true)
              } else {
                setIsOpenPDF(true)
                setReportName(clp?.session?.report)
              }
            }}
          >
            <img
              src="/icons/FileSee.png" // Adjust the path to your PNG icon
              alt="FileSee Icon"
              style={{ width: "30px", height: "30px" }} // Adjust the size accordingly
            />
            {accountType === "Trainer" ? "" : ""}
          </dd>
        </div>
        <div>
          <dd>{index + 1}. {accountType === "Trainer" ? "Trainee" : "Trainer"} : <strong>{clp?.[accountType === "Trainer" ? "trainee" : "trainer"]?.fullname}</strong></dd>
        </div>
      </div>
    </div>
  ))}
</div>


                </div>
              ) : <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <h5 className="block-title">  No Data Found</h5>
              </div>}
            </div>
          </TabPane>
        </TabContent>
      </div>

      <Modal
        isOpen={isOpenPlayVideo}
        allowFullWidth={true}
        element={
          <>
            <div className="d-flex flex-column align-items-center p-3 justify-content-center h-100">
              <div
                style={{ borderRadius: 5 }}
              >
                <div className="media-body media-body text-right">
                  <div
                    className="icon-btn btn-sm btn-outline-light close-apps pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                  </div>
                </div>
                <video
  style={videoDimensions}
  autoPlay
  controls
  onLoadedData={handleVideoLoad}
>
  <source src={selectedVideo} type="video/mp4" />
</video>
              </div>
            </div>
          </>
        }
      />

      <Modal
        isOpen={isOpenPDF}
        element={
          <>
            <div className="container media-gallery portfolio-section grid-portfolio ">
              <div className="theme-title">
                <div className="media">
                  <div className="media-body media-body text-right">
                    <div className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { setIsOpenPDF(false) }} > <X /> </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column  align-items-center">
                <h1 className="p-3">Report</h1>
                <embed src={`https://netquix.s3.ap-south-1.amazonaws.com/${reportName}`} width="100%" height="500px" allowfullscreen />
              </div>
              <div className="justify-content-center">
              </div>
            </div>
          </>
        }
      />


      <ReportModal
        currentReportData={currentReportData}
        isOpenReport={isOpenReport}
        setIsOpenReport={setIsOpenReport}
      />


    </div>
  );
};

export default FileSection;
