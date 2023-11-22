import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import ReactStrapModal from "../../common/modal";
import { Formik } from "formik";
import {
  bookingsAction,
  bookingsState,
  getScheduledMeetingDetailsAsync,
  updateBookedSessionScheduledMeetingAsync,
  addTraineeClipInBookedSessionAsync,
} from "../common/common.slice";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  AccountType,
  BookedSession,
  FormateDate,
  FormateHours,
  TRAINER_AMOUNT_USD,
  leftSideBarOptions,
  meetingRatingTimeout,
} from "../../common/constants";
import { Utils } from "../../../utils/utils";
import Modal from "../../common/modal";
import StartMeeting from "./start";
import { SocketContext } from "../socket";
import Ratings from "./ratings";
import Rating from "react-rating";
import { Star, X } from "react-feather";
import { authState } from "../auth/auth.slice";
import SocialMediaIcons from "../../common/socialMediaIcons";
import { bookingButton } from "../../common/constants";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import classnames from "classnames";
import VideoUpload from '../videoupload'
import { myClips } from "../../../containers/rightSidebar/fileSection.api";
import { traineeAction, traineeState } from "../trainee/trainee.slice";
const { isMobileFriendly, isSidebarToggleEnabled } = bookingsAction;

const Bookings = ({ accountType = null }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { handleActiveTab, handleSidebarTabClose } = bookingsAction;
  const { newBookingData } = useAppSelector(traineeState);
  const { isLoading, configs } = useAppSelector(bookingsState);
  const { userInfo } = useAppSelector(authState);
  const [bookedSession, setBookedSession] = useState({
    id: "",
    booked_status: "",
  });
  const [tabBook, setTabBook] = useState(bookingButton[0]);
  const [startMeeting, setStartMeeting] = useState({
    trainerInfo: null,
    traineeInfo: null,
    id: null,
    isOpenModal: false,
  });
  const socket = useContext(SocketContext);

  const { removeNewBookingData } = traineeAction;

  const { activeTab } = useAppSelector(bookingsState);
  const { scheduledMeetingDetails, addRatingModel } =
    useAppSelector(bookingsState);
  const { addRating } = bookingsAction;


  const [activeTabs, setActiveTab] = useState(bookingButton[0]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenID, setIsOpenID] = useState("");
  const [clips, setClips] = useState([]);
  const [selectedClips, setSelectedClips] = useState([]);

  useEffect(() => {
    getMyClips()
  }, [])


  useEffect(() => {
    if (newBookingData?._id) {
      setIsOpenID(newBookingData?._id)
      setIsOpen(true);
    }
  }, [newBookingData])

  console.log("isOpenID", isOpenID, newBookingData);

  const getMyClips = async () => {
    var res = await myClips({})
    setClips(res?.data)
  }

  const toggle1 = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handelBookingButton = (tab) => {
    setTabBook(tab);
  };

  useEffect(() => {
    if (accountType === AccountType.TRAINER) {
      if (tabBook) {
        const payload = {
          status: tabBook,
        };
        dispatch(getScheduledMeetingDetailsAsync(payload));
      }
    } else {
      dispatch(getScheduledMeetingDetailsAsync());
    }
  }, [tabBook]);

  useEffect(() => {
    if (bookedSession.id) {
      const updatePayload = {
        id: bookedSession.id,
        booked_status: bookedSession.booked_status,
      };
      const payload = {
        ...(accountType === AccountType.TRAINER
          ? { status: tabBook, updatePayload }
          : { updatePayload }),
      };
      dispatch(updateBookedSessionScheduledMeetingAsync(payload));
    }
  }, [bookedSession, accountType]);

  const addTraineeClipInBookedSession = async () => {
    const payload = { id: isOpenID, trainee_clip: selectedClips?.map(val => val?._id) };
    dispatch(addTraineeClipInBookedSessionAsync(payload));
    dispatch(removeNewBookingData());
    setIsOpen(false)
  }

  const toggle = () => setStartMeeting(!startMeeting);

  const handleAddRatingModelState = (state) => {
    dispatch(addRating(state));
  };

  const isMeetingCompleted = (detail) => {
    return (
      detail.status === BookedSession.completed ||
      (detail &&
        detail.ratings &&
        detail.ratings[accountType.toLowerCase()] &&
        detail.ratings[accountType.toLowerCase()].sessionRating)
    );
  };

  const renderBooking = (
    status,
    booking_index,
    booked_date,
    session_start_time,
    session_end_time,
    _id,
    trainee_info,
    trainer_info,
    ratings,
    trainee_clips
  ) => {
    const availabilityInfo = Utils.meetingAvailability(
      booked_date,
      session_start_time,
      session_end_time
    );
    const {
      isStartButtonEnabled,
      has24HoursPassedSinceBooking,
      isCurrentDateBefore,
      isUpcomingSession,
    } = availabilityInfo;

    const isMeetingDone =
      isMeetingCompleted(scheduledMeetingDetails[booking_index]) ||
      has24HoursPassedSinceBooking;

    switch (accountType) {
      case AccountType.TRAINER:
        return TrainerRenderBooking(
          _id,
          status,
          trainee_info,
          trainer_info,
          isCurrentDateBefore,
          isStartButtonEnabled,
          isMeetingDone,
          isUpcomingSession,
          ratings,
          trainee_clips,
          selectedClips,
          setSelectedClips,
        );
      case AccountType.TRAINEE:
        return TraineeRenderBooking(
          _id,
          status,
          trainee_info,
          trainer_info,
          isCurrentDateBefore,
          isStartButtonEnabled,
          isMeetingDone,
          isUpcomingSession,
          ratings,
          booking_index,
          has24HoursPassedSinceBooking,
          isOpen,
          setIsOpen,
          clips,
          setClips,
          selectedClips,
          setSelectedClips,
          setIsOpenID,
          addTraineeClipInBookedSession,
          trainee_clips
        );
      default:
        break;
    }
  };

  const TrainerRenderBooking = (
    _id,
    status,
    trainee_info,
    trainer_info,
    isCurrentDateBefore,
    isStartButtonEnabled,
    isMeetingDone,
    isUpcomingSession,
    ratings,
    trainee_clips,
    selectedClips,
    setSelectedClips,
  ) => {
    return (
      <React.Fragment>
        {status !== BookedSession.canceled && isMeetingDone && (
          <h3 className="mt-1">Completed</h3>
        )}
        <span className="px-2">
          <span>Trainee share video clips with you </span>
          <span onClick={() => {
            if (trainee_clips?.length > 0) setSelectedClips(trainee_clips)
            setIsOpenID(_id);
            setIsOpen(true);
          }} style={{ textDecoration: 'underline', cursor: 'pointer' }} >click here</span> to view Clip
        </span>
        {
          status === BookedSession.canceled && isMeetingDone && (
            <button
              className="btn btn-danger button-effect btn-sm ml-4"
              type="button"
              style={{
                cursor:
                  status === BookedSession.canceled ? "not-allowed" : "pointer",
              }}
              disabled={status === BookedSession.canceled}
            >
              {status === BookedSession.canceled
                ? BookedSession.canceled
                : "Cancel"}
            </button>
          )
        }
        {
          !isUpcomingSession &&
            !isCurrentDateBefore &&
            status === BookedSession.confirmed &&
            !isStartButtonEnabled &&
            !isMeetingDone ? (
            <button
              className={`btn btn-success button-effect btn-sm mr-4`}
              type="button"
              onClick={() => {
                const payload = {
                  _id,
                  isOpen: true,
                  booking_id: _id,
                };
                handleAddRatingModelState(payload);
              }}
            >
              Rating
            </button>
          ) : (
            <React.Fragment>
              {!isMeetingDone && (
                <React.Fragment>
                  {status !== BookedSession.canceled && (
                    <button
                      className={`btn btn-primary button-effect btn-sm mr-2 btn_cancel`}
                      type="button"
                      style={{
                        cursor:
                          status === BookedSession.confirmed && "not-allowed",
                      }}
                      disabled={status === BookedSession.confirmed}
                      onClick={() =>
                        setBookedSession({
                          ...bookedSession,
                          id: _id,
                          booked_status: BookedSession.confirmed,
                        })
                      }
                    >
                      {status === BookedSession.confirmed
                        ? BookedSession.confirmed
                        : BookedSession.confirm}
                    </button>
                  )}
                  {status === BookedSession.confirmed && (
                    <button
                      className={`btn btn-primary button-effect btn-sm mr-2 btn_cancel`}
                      type="button"
                      disabled={!isStartButtonEnabled}
                      style={{
                        cursor: !isStartButtonEnabled ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        setStartMeeting({
                          ...startMeeting,
                          id: _id,
                          isOpenModal: true,
                          traineeInfo: trainee_info,
                          trainerInfo: trainer_info,
                        });
                      }}
                    >
                      {BookedSession.start}
                    </button>
                  )}
                  <button
                    className={`btn btn-danger button-effect btn-sm btn_cancel`}
                    type="button"
                    style={{
                      cursor:
                        status === BookedSession.canceled || isStartButtonEnabled
                          ? "not-allowed"
                          : "pointer",
                    }}
                    disabled={
                      status === BookedSession.canceled || isStartButtonEnabled
                    }
                    onClick={() => {
                      if (
                        !isStartButtonEnabled &&
                        (status === BookedSession.booked ||
                          status === BookedSession.confirmed)
                      ) {
                        setBookedSession({
                          ...bookedSession,
                          id: _id,
                          booked_status: BookedSession.canceled,
                        });
                      }
                    }}
                  >
                    {status === BookedSession.canceled
                      ? BookedSession.canceled
                      : "Cancel"}
                  </button>
                </React.Fragment>
              )}
            </React.Fragment>
          )
        }

        <Modal
          isOpen={isOpen}
          element={
            <>
              <div className="container media-gallery portfolio-section grid-portfolio ">
                <div className="theme-title">
                  <div className="media">

                    <div className="media-body media-body text-right">
                      <div className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { setIsOpen(false) }} > <X /> </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column  align-items-center">
                  <h2 className="p-3">Trainee share video clips with you.</h2>
                  {selectedClips?.length ? <div >
                    <div className={`block-content`}>
                      <div className="d-flex">
                        {selectedClips.map((clp, index) => (
                          <div key={index} className="p-2">
                            <video style={{ width: "40vw" }} controls>
                              <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${clp?._id}`} type="video/mp4" />
                            </video>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> :
                    <></>
                  }
                </div>
                <div className="justify-content-center">

                </div>
              </div>
            </>
          }
        />

      </React.Fragment >
    );
  };

  const TraineeRenderBooking = (
    _id,
    status,
    trainee_info,
    trainer_info,
    isCurrentDateBefore,
    isStartButtonEnabled,
    isMeetingDone,
    isUpcomingSession,
    ratings,
    booking_index,
    has24HoursPassedSinceBooking,
    isOpen,
    setIsOpen,
    clips,
    setClips,
    selectedClips,
    setSelectedClips,
    setIsOpenID,
    addTraineeClipInBookedSession,
    trainee_clips
  ) => {
    const isCompleted =
      has24HoursPassedSinceBooking ||
      scheduledMeetingDetails[booking_index]?.ratings?.trainee;

    const canShowRatingButton =
      !isUpcomingSession &&
      !isCurrentDateBefore &&
      !isStartButtonEnabled &&
      status !== BookedSession.booked &&
      !isCompleted;

    return (
      <React.Fragment>
        {isCompleted ? <h3>Completed</h3> : null}
        {canShowRatingButton ? (
          <button
            className={`btn btn-success button-effect btn-sm mr-4`}
            type="button"
            onClick={() => {
              const payload = {
                _id,
                isOpen: true,
              };
              handleAddRatingModelState(payload);
            }}
          >
            Rating
          </button>
        ) : (
          <React.Fragment>
            {!isMeetingDone && (
              <React.Fragment>
                {status !== BookedSession.canceled && (
                  <React.Fragment>
                    <button
                      className="btn btn-success button-effect btn-sm mr-4 btn_cancel"
                      type="button"
                      onClick={() => {
                        if (trainee_clips?.length > 0) setSelectedClips(trainee_clips)
                        setIsOpenID(_id)
                        setIsOpen(true)
                      }}
                    >
                      Add Clip
                    </button>
                    {status === BookedSession.booked ? (
                      <button
                        className="btn btn-dark button-effect btn-sm mr-4 btn_cancel"
                        type="button"
                        style={{
                          cursor:
                            status === BookedSession.booked && "not-allowed",
                        }}
                        disabled={status === BookedSession.booked}
                      >
                        {BookedSession.booked}
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary button-effect btn-sm mr-4"
                        type="button"
                        style={{
                          cursor:
                            status === BookedSession.confirmed && "not-allowed",
                        }}
                        disabled={status === BookedSession.confirmed}
                      >
                        {BookedSession.confirmed}
                      </button>
                    )}
                    <Modal
                      isOpen={isOpen}
                      element={
                        <div>
                          <div className="theme-title">
                            <div className="media">
                              <div className="media-body media-body text-right">
                                <div className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => {
                                  setIsOpen(false)
                                  dispatch(removeNewBookingData());
                                }} > <X /> </div>
                              </div>
                            </div>
                          </div>
                          <div className="container media-gallery portfolio-section grid-portfolio ">
                            <h2 className="my-5">Select any 2 clips to share it with your Trainer.</h2>
                            {selectedClips?.length ? <div >
                              <h5 className="block-title p-0"> Selected Clips<label className="badge badge-primary sm ml-2">{selectedClips?.length}</label></h5>
                              <div className={`block-content`}>
                                <div className="row">
                                  {selectedClips.map((clp, index) => (
                                    <div key={index} style={{ borderRadius: 5, position: "relative" }}>
                                      <video style={{ width: "25vw" }} className="p-2">
                                        <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${clp?._id}`} type="video/mp4" />
                                      </video>
                                      <span style={{ position: "absolute", right: 5, top: -3, cursor: "pointer", background: "red", borderRadius: "50%", padding: "0px 6px", color: "#fff" }}
                                        onClick={() => {
                                          var temp = selectedClips;
                                          temp = temp.filter(val => val._id !== clp?._id)
                                          setSelectedClips([...temp]);
                                        }}
                                      >x</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div> : <></>}
                            {clips?.length && clips?.map((cl, ind) => <div className={`collapse-block ${cl?.show ? "" : "open"}`}>
                              <h5 className="block-title pb-0"> {cl?._id}<label className="badge badge-primary sm ml-2">{cl?.clips?.length}</label></h5>
                              <div className={`block-content ${cl?.show ? "d-none" : ""}`}>
                                <div className="row">
                                  {cl?.clips.map((clp, index) => {
                                    var sld = selectedClips.find(val => val?._id === clp?._id)
                                    return <div
                                      key={index}
                                      className={`col-4 `}
                                      style={{ borderRadius: 5 }}
                                      onClick={() => {
                                        if (!sld && selectedClips?.length < 2) {
                                          selectedClips.push(clp);
                                          setSelectedClips([...selectedClips]);
                                        }
                                      }}
                                    >
                                      <video style={{ border: `${sld ? "2px" : "0px"} solid green`, width: "17vw" }} className="p-2"  >
                                        <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${clp?._id}`} type="video/mp4" />
                                      </video>
                                    </div>
                                  })}
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                          <div className="d-flex justify-content-around w-100 p-3">
                            <Button color="primary" onClick={() => { addTraineeClipInBookedSession() }}>Add</Button>
                          </div>
                        </div>
                      }
                    />
                  </React.Fragment>
                )}
                {status === BookedSession.confirmed && (
                  <button
                    className="btn btn-primary button-effect btn-sm mr-4"
                    type="button"
                    disabled={!isStartButtonEnabled}
                    style={{
                      cursor: !isStartButtonEnabled ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      setStartMeeting({
                        ...startMeeting,
                        id: _id,
                        isOpenModal: true,
                        traineeInfo: trainee_info,
                        trainerInfo: trainer_info,
                      });
                    }}
                  >
                    {BookedSession.start}
                  </button>
                )}
                <button
                  className="btn btn-danger button-effect btn-sm btn_cancel"
                  type="button"
                  style={{
                    cursor:
                      status === BookedSession.canceled || isStartButtonEnabled
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={
                    status === BookedSession.canceled || isStartButtonEnabled
                  }
                  onClick={() => {
                    if (
                      !isStartButtonEnabled &&
                      (status === BookedSession.booked ||
                        status === BookedSession.confirmed)
                    ) {
                      setBookedSession({
                        ...bookedSession,
                        id: _id,
                        booked_status: BookedSession.canceled,
                      });
                    }
                  }}
                >
                  {status === BookedSession.canceled
                    ? BookedSession.canceled
                    : "Cancel"}
                </button>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  const showRatingLabel = (ratingInfo) => {
    // for trainee we're showing recommends
    return ratingInfo &&
      ratingInfo[accountType.toLowerCase()] &&
      (ratingInfo[accountType.toLowerCase()].sessionRating ||
        ratingInfo[accountType.toLowerCase()].sessionRating) ? (
      <div className="d-flex items-center">
        {" "}
        You rated{" "}
        <b className="pl-2">
          {ratingInfo[accountType.toLowerCase()].sessionRating ||
            ratingInfo[accountType.toLowerCase()].sessionRating}
        </b>
        <Star color="#FFC436" size={28} className="star-container star-svg" />{" "}
        to this {accountType?.toLowerCase()}.
      </div>
    ) : null;
  };

  const Bookings = () =>
    scheduledMeetingDetails.map((bookingInfo, booking_index) => {
      const {
        _id,
        trainee_info,
        trainer_info,
        booked_date,
        session_start_time,
        session_end_time,
        status,
        ratings,
        trainee_clips
      } = bookingInfo;
      return (
        <div
          className="card mb-4 mt-5 trainer-bookings-card"
          key={`booking-schedule-training${booking_index}`}
        >
          <div className="card-body">
            <div className="row">
              <div className="col">
                <dl className="row">
                  <dd className="ml-3">Trainer :</dd>
                  <dt className="ml-1">{trainer_info.fullname}</dt>
                </dl>
              </div>
              <div className="col">
                <dl className="row ml-1">
                  <dd>Date :</dd>
                  <dt className="ml-1">{Utils.getDateInFormat(booked_date)}</dt>
                </dl>
              </div>
              <div className="w-100"></div>
              <div className="col">
                <dl className="row">
                  <dd className="ml-3">Trainee :</dd>
                  <dt className="ml-1">{trainee_info.fullname}</dt>
                </dl>
              </div>
              <div className="col">
                <dl className="row">
                  <dd className="ml-3">Time Durations :</dd>
                  <dt className="ml-1">{`${Utils.convertToAmPm(
                    session_start_time
                  )}-${Utils.convertToAmPm(session_end_time)}`}</dt>
                </dl>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-11">{showRatingLabel(ratings)}</div>
              <div className="col-12 col-lg-auto ml-lg-auto">
                {renderBooking(
                  status,
                  booking_index,
                  booked_date,
                  session_start_time,
                  session_end_time,
                  _id,
                  trainee_info,
                  trainer_info,
                  ratings,
                  trainee_clips
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

  const renderRating = () => {
    return (
      <ReactStrapModal
        // allowFullWidth={true}
        element={
          <Ratings
            accountType={accountType}
            booking_id={addRatingModel._id}
            key={addRatingModel._id}
            onClose={() => {
              const payload = {
                _id: null,
                isOpen: false,
              };
              handleAddRatingModelState(payload);
            }}
            tabBook={tabBook}
          />
        }
        isOpen={addRatingModel.isOpen}
        id={addRatingModel._id}
      // width={"50%"}
      />
    );
  };

  const renderVideoCall = () => (
    <StartMeeting
      accountType={accountType}
      traineeInfo={startMeeting.traineeInfo}
      trainerInfo={startMeeting.trainerInfo}
      isClose={() => {
        setStartMeeting({
          ...startMeeting,
          id: null,
          isOpenModal: false,
          traineeInfo: null,
          trainerInfo: null,
        });
      }}
    />
  );

  const OpenCloseSidebar = () => {
    dispatch(handleSidebarTabClose(leftSideBarOptions.HOME));
    document.querySelector(".main-nav").classList.add("on");
    document.querySelector(".sidebar-toggle").classList.remove("none");
  };

  const showRatings = (ratings, extraClasses = "") => {
    const { ratingRatio, totalRating } = Utils.getRatings(ratings);
    return (
      <>
        <div className={extraClasses}>
          <Star color="#FFC436" size={28} className="star-container star-svg" />
          <p className="ml-1 mt-1 mr-1 font-weight-light">{ratingRatio || 0}</p>
          <p className="mt-1">({totalRating || 0})</p>
        </div>
      </>
    );
  };
  const trainerInfo = () => (
    <React.Fragment>
      <div className="card rounded trainer-profile-card">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 d-flex justify-content-center align-items-center">
              <img
                src={
                  userInfo?.profile_picture || "/assets/images/avtar/user.png"
                }
                alt="trainer_image"
                className="rounded trainer-profile"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div className="col-7 col-sm-6 col-md-7 col-lg-8 col-xl-9 card-trainer">
              <h3 className="mt-3 ">Hourly Rate: ${TRAINER_AMOUNT_USD}</h3>
              {showRatings([], "mt-3 d-flex ml-n2")}
              {userInfo &&
                userInfo.extraInfo &&
                userInfo.extraInfo.social_media_links &&
                userInfo.extraInfo.social_media_links ? (
                <SocialMediaIcons
                  profileImageURL={""}
                  social_media_links={userInfo.extraInfo.social_media_links}
                  isvisible={false}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  const bookingTabs = () => (
    <React.Fragment>
      <div className="card rounded">
        <div className="card-body">
          <Nav tabs>
            {bookingButton.map((tabName, index) => {
              return (
                <NavItem key={`bookings_tabs${index}`}>
                  <NavLink
                    className={`${classnames({
                      active: activeTabs === tabName,
                    })} ${activeTabs === tabName ? "text-primary" : "text-dark"
                      } text-capitalize`}
                    onClick={() => {
                      toggle1(tabName);
                      setTabBook(tabName);
                    }}
                    style={{ fontSize: "13px" }}
                  >
                    {tabName}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent activeTab={activeTabs}>
            <TabPane tabId={tabBook}>
              {!scheduledMeetingDetails.length ? (
                <h2 className="mb-2 mt-4 d-flex justify-content-center">
                  No {tabBook} sessions
                </h2>
              ) : (
                Bookings()
              )}
            </TabPane>
          </TabContent>
        </div>
      </div>
    </React.Fragment>
  );
  const mediaQuery = window.matchMedia('(min-width: 992px)')

  return (
    <React.Fragment>
      {startMeeting.isOpenModal ? (
        <div
          id="bookings"
          className={mediaQuery.matches ? "video_call custom-scroll position-relative" : "custom-scroll scoll-content position-relative"}
          onScroll={() => {
            if (configs.sidebar.isMobileMode) {
              dispatch(isSidebarToggleEnabled(true));
            }
            return;
          }}
        >
          {renderVideoCall()}
        </div>
      ) : (
        <div
          id="bookings"
          onScroll={() => {
            if (configs.sidebar.isMobileMode) {
              dispatch(isSidebarToggleEnabled(true));
            }
            return;
          }}
          className={`bookings custom-scroll custom-sidebar-content-booking ${configs.sidebar.isMobileMode &&
            configs.sidebar.isToggleEnable &&
            `submenu-width dynemic-sidebar ${activeTab === leftSideBarOptions.SCHEDULE_TRAINING ? "active" : ""
            }`
            }`}
        >
          {addRatingModel.isOpen ? renderRating() : null}
          <div>
            {accountType === AccountType.TRAINER ? (
              <React.Fragment>
                <div className="welcome-text mb-3">
                  Welcome, <br /> {userInfo && userInfo?.fullname}
                  <VideoUpload />
                </div>
                <div>{trainerInfo()}</div>
                {/* <h2 className="d-flex justify-content-center mt-2 p-5 mb-2 bg-primary text-white rounded">
                  Bookings
                </h2> */}
                <h2 className="d-flex justify-content-center p-5">Bookings</h2>

                <div className="mb-2">{bookingTabs()}</div>
              </React.Fragment>
            ) : null}
          </div>
          {accountType === AccountType.TRAINEE ? (
            !scheduledMeetingDetails && !scheduledMeetingDetails.length ? (
              <h2
                className="d-flex 
        justify-content-center mt-4"
              >
                No Bookings available
              </h2>
            ) : (
              <React.Fragment>
                <h3 className="mt-2 p-3 mb-2 bg-primary text-white rounded">
                  Bookings
                </h3>
                {Bookings()}
              </React.Fragment>
            )
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};
export default Bookings;
