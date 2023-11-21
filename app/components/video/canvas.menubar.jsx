import { Edit2, RefreshCw, X } from "react-feather";
import Image from "next/image";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { SHAPES } from "../../common/constants";
import Modal from "../../common/modal";
import { Nav, NavLink, NavItem, TabContent, TabPane, Col, Button } from "reactstrap";
import { myClips, traineeClips } from "../../../containers/rightSidebar/fileSection.api";


export const CanvasMenuBar = ({
  isOpen,
  setIsOpen,
  canvasConfigs,
  sketchPickerColor,
  setSketchPickerColor,
  undoDrawing,
  refreshDrawing,
  setCanvasConfigs,
  drawShapes,
  selectedClips,
  setSelectedClips
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [activeTab, setActiveTab] = useState(SHAPES.FREE_HAND);
  const [videoActiveTab, setAideoActiveTab] = useState("media");
  const [clips, setClips] = useState([]);
  const [traineeClip, setTraineeClips] = useState([]);
  const [selectClips, setSelectClips] = useState([]);

  useEffect(() => {
    if (isOpen) { getMyClips(); }
  }, [isOpen])


  const getMyClips = async () => {
    var res = await myClips({})
    setClips(res?.data)
    var res2 = await traineeClips({})
    setTraineeClips(res2?.data)
  }
  const mediaQuery = window.matchMedia('(min-width: 768px)')

  return (
    <div style={{ margin: "1rem", display: "flex", justifyContent: "center" }}>
      <div className="creationBarItem " style={mediaQuery.matches ? { width: 52 } : { width: "100%" }}>
        <div className="CreationBarCustomizable">
          <span>

          </span>
          {/* free hand */}
          <span>
            {/* {displayColorPicker ?
               */}
            <Popover
              className="color-picker-popover"
              isOpen={displayColorPicker}
              positions={["left", "right"]} // if you'd like, you can limit the positions
              padding={10} // adjust padding here!
              reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
              onClickOutside={() => setDisplayColorPicker(false)} // handle click events outside of the popover/target here!
              content={(
                { position, nudgedLeft, nudgedTop } // you can also provide a render function that injects some useful stuff!
              ) => (
                <div>
                  <SketchPicker
                    onChange={(color) => {
                      const payload = {
                        ...canvasConfigs,
                        sender: {
                          ...canvasConfigs.sender,
                          strokeStyle: color.hex,
                        },
                      };
                      setCanvasConfigs(payload);
                      canvasConfigs = payload;
                      // canvasConfigs.sender.strokeStyle = color.hex;
                      setSketchPickerColor(color.rgb);
                    }}
                    color={sketchPickerColor}
                  />
                </div>
              )}
            >
              <div
                className="icon-btn m-5  button-effect btn-sm"
                onClick={() => {
                  setDisplayColorPicker(true);
                }}
              >
                <Image
                  src="/icons/color-wheel.png"
                  width={20}
                  height={20}
                  alt="color-picker"
                />
              </div>
            </Popover>
            {/* : null} */}
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${SHAPES.FREE_HAND === activeTab
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.FREE_HAND);
                setActiveTab(SHAPES.FREE_HAND);
              }}
            >
              <Edit2 />
            </div>
          </span>
          {/* line */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${activeTab === SHAPES.LINE
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.LINE);
                setActiveTab(SHAPES.LINE);
              }}
            >
              <Image src="/icons/line.png" width={20} height={20} alt="line" />
            </div>
          </span>
          {/* circle */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${activeTab === SHAPES.CIRCLE
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.CIRCLE);
                setActiveTab(SHAPES.CIRCLE);
              }}
            >
              <i className="fa fa-circle-thin" />
            </div>
          </span>
          {/* square */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${activeTab === SHAPES.SQUARE
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.SQUARE);
                setActiveTab(SHAPES.SQUARE);
              }}
            >
              <i className="fa fa-square-o" />
            </div>
          </span>
          {/* rectangle */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${activeTab === SHAPES.RECTANGLE
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.RECTANGLE);
                setActiveTab(SHAPES.RECTANGLE);
              }}
            >
              <Image
                src="/icons/rectangle.png"
                width={20}
                height={20}
                alt="rectangle"
              />
            </div>
          </span>
          {/* oval */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${activeTab === SHAPES.OVAL
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.OVAL);
                setActiveTab(SHAPES.OVAL);
              }}
            >
              {/* <i className="fa fa-long-arrow-right" /> */}
              <Image src="/icons/oval.png" width={20} height={20} alt="oval" />
            </div>
          </span>
          {/* triangle */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${activeTab === SHAPES.TRIANGLE
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.TRIANGLE);
                setActiveTab(SHAPES.TRIANGLE);
              }}
            >
              <Image
                src="/icons/triangle.png"
                width={20}
                height={20}
                alt="triangle"
              />
            </div>
          </span>
          {/* arrows */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${activeTab === SHAPES.ARROW_RIGHT
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.ARROW_RIGHT);
                setActiveTab(SHAPES.ARROW_RIGHT);
              }}
            >
              <i className="fa fa-long-arrow-right" />
            </div>
          </span>
          <span>
            <div
              className={`icon-btn m-5  button-effect btn-sm ${activeTab === SHAPES.TWO_SIDE_ARROW
                ? "btn-outline-primary"
                : "btn-outline-light"
                }`}
              onClick={() => {
                drawShapes(SHAPES.TWO_SIDE_ARROW);
                setActiveTab(SHAPES.TWO_SIDE_ARROW);
              }}
            >
              <i className="fa fa-arrows-v rotate-90" />
            </div>
          </span>
          <span>
            <div
              className={`icon-btn m-5  button-effect btn-sm my-3`}
              onClick={undoDrawing}
            >
              <Image src="/icons/undo.png" width={20} height={20} alt="Undo" />
            </div>
          </span>
          <span>
            <div
              className={`icon-btn m-5  button-effect btn-sm my-3`}
              onClick={refreshDrawing}
            >
              <RefreshCw />
            </div>
          </span>
          {/* <span>
            <div
              className={`icon-btn m-5  button-effect btn-sm my-3`}
              onClick={() => { setIsOpen(true) }}
            >
              <i className="fa fa-film" />
            </div>
          </span> */}
        </div>
      </div>


      {/* ------------------------------ ------------------ -----------------------------*/}

      <Modal
        isOpen={isOpen}
        element={
          <>
            <div className="container media-gallery portfolio-section grid-portfolio">
              <div className="theme-title  mb-5">
                <div className="media">
                  <div>
                    <h2>Select up to 2 clips for analysis.</h2>
                  </div>
                  <div className="media-body media-body text-right" >
                    <div
                      className="icon-btn btn-sm btn-outline-light close-apps pointer"
                      onClick={() => {
                        setSelectedClips(selectClips)
                        setIsOpen(false)
                      }}
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
                      className={`button-effect ${videoActiveTab === "media" ? "active" : ""
                        }`}
                      onClick={() => setAideoActiveTab("media")}
                    >
                      My Clips
                    </NavLink>
                  </NavItem>
                  <NavItem className="ml-5px">
                    <NavLink
                      className={`button-effect ${videoActiveTab === "trainee" ? "active" : ""
                        }`}
                      onClick={() => setAideoActiveTab("trainee")}
                    >
                      Trainee
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <div className="file-tab">
                <TabContent activeTab={videoActiveTab} className="custom-scroll">
                  <TabPane tabId="media">
                    <div className="media-gallery portfolio-section grid-portfolio">
                      {clips?.length ? clips?.map((cl, ind) =>
                        <div className={`collapse-block open`}>
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
                          <div className={`block-content`}>
                            <div className="row">
                              {cl?.clips.map((clp, index) => {
                                var sld = selectClips.find(val => val?._id === clp?._id)
                                return <div
                                  key={index}
                                  className={`col-4 p-1`}
                                  style={{ borderRadius: 5 }}
                                  onClick={() => {
                                    if (!sld && selectClips?.length < 2) {
                                      selectClips.push(clp);
                                      setSelectClips([...selectClips]);
                                    } else {
                                      var temp = selectClips;
                                      temp = temp.filter(val => val._id !== clp?._id)
                                      setSelectClips([...temp]);
                                    }
                                  }}
                                >
                                  <video style={{ border: `${sld ? "2px" : "0px"} solid green`, width: "80%", height: "80%" }}  >
                                    <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${clp?._id}`} type="video/mp4" />
                                  </video>
                                </div>
                              })}
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
                        <div className={`collapse-block open`}>
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
                          <div className={`block-content `}>
                            <div className="row">
                              {cl?.clips.map((clp, index) => {
                                var sld = selectClips.find(val => val?._id === clp?._id)
                                return <div
                                  key={index}
                                  className={`col-4 p-1`}
                                  style={{ borderRadius: 5 }}
                                  onClick={() => {
                                    if (!sld && selectClips?.length < 2) {
                                      selectClips.push(clp);
                                      setSelectClips([...selectClips]);
                                    } else {
                                      var temp = selectClips;
                                      temp = temp.filter(val => val._id !== clp?._id)
                                      setSelectClips([...temp]);
                                    }
                                  }}
                                >
                                  <video style={{ border: `${sld ? "2px" : "0px"} solid green`, width: "80%", height: "80%" }}  >
                                    <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${clp?.clips?._id}`} type="video/mp4" />
                                  </video>
                                </div>
                              })}
                            </div>
                          </div>
                        </div>
                      ) : <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                        <h5 className="block-title">  No Data Found</h5>
                      </div>}
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};
