import React, { useContext, useEffect, useState,useRef } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import ReactStrapModal from "../../common/modal";
import ShareModalTrainer from "./start/Share modal Trainer";
import { Formik } from "formik";
import Slider from "react-slick";
import Addworkinghour from "../../../containers/leftSidebar/Addworkinghour";

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
import { authAction, authState } from "../auth/auth.slice";
import SocialMediaIcons from "../../common/socialMediaIcons";
import { bookingButton } from "../../common/constants";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import classnames from "classnames";
import VideoUpload from '../videoupload'
import { myClips, shareClips } from "../../../containers/rightSidebar/fileSection.api";
import { traineeAction, traineeState } from "../trainee/trainee.slice";
import CalendarPage from "../calendar/calendar";
import { masterState } from "../master/master.slice";
import { trainerAction, trainerState } from "../trainer/trainer.slice";
import { toast } from "react-toastify";
const { isMobileFriendly, isSidebarToggleEnabled } = bookingsAction;
const images = [...Array().keys()]; 

 
const Bookings = ({ accountType = null }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { handleActiveTab, handleSidebarTabClose } = bookingsAction;
  const { newBookingData } = useAppSelector(traineeState);
  const { isLoading, configs } = useAppSelector(bookingsState);
  const { userInfo } = useAppSelector(authState);
  const { trainersList, selectedTrainerInfo } = useAppSelector(trainerState);
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
  const { scheduledMeetingDetails, addRatingModel } = useAppSelector(bookingsState);
  const { addRating } = bookingsAction;


  const [activeTabs, setActiveTab] = useState(bookingButton[0]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenID, setIsOpenID] = useState("");
  const [clips, setClips] = useState([]);
  const [selectedClips, setSelectedClips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [err, setErr] = useState({ email: false, video: false });

  const handleSelectClip = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getMyClips()
  }, [])


  useEffect(() => {
    if (newBookingData?._id) {
      setIsOpenID(newBookingData?._id)
      setIsOpen(true);
    }
  }, [newBookingData])

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
    setIsModalOpen(false);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onShare = async () => {
    if (!emailRegex.test(userEmail)) setErr({ email: true, video: false });
    else
      if (!selectedClips?.length) setErr({ email: false, video: true });
      else {
        var res = await shareClips({ user_email: userEmail, clips: selectedClips })
        toast.success("Email sent successfully.", { type: "success" })
        setErr({ email: false, video: false })
      }
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
    trainee_clips,
    report
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
          report
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
          trainee_clips,
          report
        );
      default:
        break;
    }
  };
  // const TRAINER_AMOUNT_USD = 10;
  // const [isEditing, setEditing] = useState(false);
  // const [editedRate, setEditedRate] = useState(() => {
  //   const storedRate = localStorage.getItem('editedRate');
  //   return storedRate ? parseFloat(storedRate) : TRAINER_AMOUNT_USD;
  // });
  // const inputRef = useRef(null);

  // const handleEditClick = () => {
  //   setEditing(true);
  // };

  // const handleRateChange = (e) => {
  //   setEditedRate(e.target.value);
  // };

  // const handleSaveClick = () => {
  //   localStorage.setItem('editedRate', editedRate.toString());
  //   setEditing(false);
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (inputRef.current && !inputRef.current.contains(event.target)) {
  //       handleSaveClick();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [handleSaveClick]);



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
    report
  ) => {
    return (
      <React.Fragment>
        {status !== BookedSession.canceled && isMeetingDone && (
          <h3 className="mt-1">Completed</h3>
        )}
        <span className="px-2">
          <span>{trainee_info?.fullname} shared the following clips with you, give them a look… </span>
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
                  <h1 className="p-3">{trainee_info.fullname} shared the following clips with you, give them a look…</h1>
                  {selectedClips?.length ? <div >
                    <div className={`block-content`}>
                      <div className="row">
                        {selectedClips.map((clp, index) => (<>
                          <div key={index} className="col-md-6 col-sm-12 col-xs-12 p-2" >
                            <div className="col">
                              <dl className="row">
                                <h3 className="ml-1">{clp?.title || "-"}</h3>
                              </dl>
                            </div>
                            <video className="videoStyle" controls>
                              <source src={Utils?.generateVideoURL(clp)} type="video/mp4" />
                            </video>
                          </div>
                        </>
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
    trainee_clips,
    report
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
                            <h2 className="my-5">Feel free to share upto 2 clips with the {trainer_info?.fullname}</h2>
                            {selectedClips?.length ? <div >
                              <h5 className="block-title p-0"> Selected Clips<label className="badge badge-primary sm ml-2">{selectedClips?.length}</label></h5>
                              <div className={`block-content`}>
                                <div className="row">
                                  {selectedClips?.map((clp) => (
                                    <div key={clp?._id} style={{ borderRadius: 5, position: "relative", border: "1px solid #ebebeb", marginLeft: "15px" }} className={`col-5`}>
                                      <video style={{ width: "100%", maxHeight: "200px", height: "100%" }}>
                                        <source src={Utils?.generateVideoURL(clp)} type="video/mp4" />
                                      </video>
                                      <span
                                        style={{ position: "absolute", right: -5, top: -3, cursor: "pointer", background: "red", borderRadius: "50%", padding: "0px 6px", color: "#fff" }}
                                        onClick={(e) => {
                                          e.stopPropagation(); // Prevent the event from bubbling up
                                          const updatedVideos = selectedClips.filter((video) => video._id !== clp?._id);
                                          setSelectedClips(updatedVideos);
                                        }}
                                      >
                                        x
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div> : <></>}
                            <div style={{ marginTop: "30px" }}></div>
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
                                          selectedClips?.push(clp);
                                          setSelectedClips([...selectedClips]);
                                        }
                                      }}
                                    >
                                      <video style={{ border: `${sld ? "2px" : "0px"} solid green`, width: "98%", maxHeight: "150px", height: "100%" }}  >
                                        <source src={Utils?.generateVideoURL(clp)} type="video/mp4" />
                                      </video>
                                    </div>
                                  })}
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                          <div className="d-flex justify-content-around w-100 p-3">
                            <Button color="success" onClick={() => { addTraineeClipInBookedSession() }}>Share</Button>
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
        trainee_clips,
        report
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
                  trainee_clips,
                  report
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
      id={startMeeting.id}
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
      <div className="trainer-Pro" style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="card rounded trainer-profile-card" style={{ width: "60%" }}>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 d-flex justify-content-center align-items-center">
                <img
                  src={
                    Utils?.dynamicImageURL(userInfo?.profile_picture) || "/assets/images/avtar/user.png"
                  }
                  alt="trainer_image"
                  className="rounded trainer-profile"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <div className="col-7 col-sm-6 col-md-7 col-lg-8 col-xl-9 card-trainer">
                <h3 className="mt-3 ">Hourly Rate: ${TRAINER_AMOUNT_USD}</h3>
                {/* {isEditing ? (
        <div>
          <input
            type="number"
            value={editedRate}
            onChange={handleRateChange}
            onBlur={handleSaveClick}
            ref={inputRef}
          />
          <button onClick={handleSaveClick} disabled={!editedRate}>
            Save
          </button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )} */}
                
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

        <div className="card rounded trainer-profile-card Select" style={{ width: "39%" }}>
          <div className="card-body" style={{ margin: "auto" }}>
            <div className="row" style={{ justifyContent: "center" }}>
              <h3 className="mt-3">Share clips</h3>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              {/* <h3 className="mt-3">Trainee text</h3> */}
            </div>
            <div className="row" style={{ justifyContent: "center", marginTop: "10px" }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSelectClip}
              >
                Select Clip
              </button>
            </div>
            {isModalOpen && (
              // Content for the modal
              <ShareModalTrainer
                isOpen={isModalOpen}
                onClose={closeModal}
                selectedClips={selectedClips}
                clips={clips}
                addTraineeClipInBookedSession={addTraineeClipInBookedSession}
                setSelectedClips={setSelectedClips}
              />
            )}
            <div className="row" style={{ justifyContent: "center", paddingTop: "10px", margin: "auto" }}>
              <input value={userEmail} onChange={(e) => setUserEmail(e?.target?.value)} className="form-control" type="email" placeholder="Email"></input>
            </div>

            {err?.video && <p style={{ color: "red", marginTop: "5px" }}>Please select video.</p>}
            {err?.email && <p style={{ color: "red", marginTop: "5px" }}>Invalid Email.</p>}
            <div className="row" style={{ justifyContent: "center", marginTop: "10px" }}>
              <button onClick={() => { onShare() }} className="btn btn-success button-effect btn-sm btn_cancel">Share</button>
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


  const TogglTab = (value) => {
    dispatch(authAction.setActiveTab(value));
    if (
      window.innerWidth < 800 &&
      document &&
      document.querySelector &&
      document.querySelector(".app-sidebar")
    ) {
      document.querySelector(".app-sidebar").classList.remove("active");
    }
  };


  const [data, setData] = useState();
  const masterRecords = useAppSelector(masterState).master;
  useEffect(() => {
    setData(masterRecords?.masterData);
  }, [masterRecords]);
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
             <div className="Content-Trainer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
             <div className="card rounded trainer-profile-card Select Recent Student" style={{ width: '26%',marginTop:'32px',height:'82vh',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
  <div className="card-body">
    <div className="row" style={{ justifyContent: 'center' }}>
      <h2 className="Recent-Heading">Recent Students</h2>
    </div>
    <div className="row" style={{ justifyContent: 'center' }}>
  <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '15px', width: '85%', justifyContent: 'space-between', overflowY: 'auto', maxHeight: '60vh' }}>
    <img src="/assets/images/about/Coach.jpeg" alt="Student 1" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
    <img src="/assets/images/about/Coach.jpeg" alt="Student 1" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
    <img src="/assets/images/about/Coach.jpeg" alt="Student 2" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
    <img src="/assets/images/about/Coach.jpeg" alt="Student 1" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
    <img src="/assets/images/about/Coach.jpeg" alt="Student 1" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
    <img src="/assets/images/about/Coach.jpeg" alt="Student 2" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />

    <img src="/assets/images/about/Coach.jpeg" alt="Student 2" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
     <img src="/assets/images/about/Coach.jpeg" alt="Student 1" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
    <img src="/assets/images/about/Coach.jpeg" alt="Student 2" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
     <img src="/assets/images/about/Coach.jpeg" alt="Student 1" style={{ width: '8vw', height: '20vh', marginBottom: '10px', marginRight: '10px' }} />
    {/* Add more images as needed */}
    {images.map((index) => (
        <img
        key={index}
        src={`/assets/images/about/Coach${index + 1}.jpeg`}
        alt={`Student ${index + 1}`}
        style={{
          width: '8vw',
          height: '20vh',
          marginBottom: '10px',
          flexGrow: '0',
          flexShrink: '0',
          flexBasis: 'calc(33.3333% - 20px)', // 33.3333% for 3 images in a row with 20px margin
        }}
      />
        ))}
  </div>
</div>

    {/* Additional content for Recent Students section can be added here */}
  </div>
</div>

  <div className="calendar-container Child" style={{ width: '70%' }}>
    {/* Set width and height of CalendarPage */}
    <Addworkinghour />
    <CalendarPage />
  </div>
</div>



              
                <h2 className="d-flex justify-content-center p-5">Bookings</h2>
                <div className="mb-2">{bookingTabs()}</div>
              </React.Fragment>
            ) : null}
          </div>
          {accountType === AccountType.TRAINEE ? (
            scheduledMeetingDetails.length ? (
              <React.Fragment>
                <h3 className="mt-2 p-3 mb-2 bg-primary text-white rounded">
                  Bookings
                </h3>
                {Bookings()}
              </React.Fragment>
            ) : (
              <>
                <h3 className="mt-2 p-3 mb-2 bg-primary text-white rounded">
                  Bookings
                </h3>
                <h3 className="d-flex justify-content-center mt-4" >
                  Its empty here, search for trainers on the homepage and get started on your learning journey !
                </h3>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "50px" }}>
                  <button onClick={() => { TogglTab("home"); dispatch(trainerAction?.setSelectedTrainerInfo(null)) }} className={`btn btn-primary button-effect btn-sm mr-2 btn_cancel`}>Go To Home Page</button>
                </div>

                <div className="trainer-recommended" style={{ height: '90px' }}>
                  <div className="row">
                    <div className="col d-none d-sm-block">
                      <Slider {...settings}>
                        {data?.category?.map((item, index) => (
                          <div key={`slider-item-${index}`} >
                            <span
                              className="badge badge-light lg"
                              style={{
                                margin: "12px",
                                padding: "18px", // Add your desired padding here
                                alignItems: "center",
                                fontSize: "14px",
                                color: "black",
                                cursor: "pointer",
                                width: "80%",
                                height: "0",
                                display: "flex",
                                justifyContent: "center", // Center content horizontally
                                flexDirection: "column",
                              }}
                              onClick={() => {
                                TogglTab("home");
                                dispatch(trainerAction?.setSelectedTrainerInfo({
                                  userInfo: {
                                    id: item,
                                    isCategory: true,
                                    name: item,
                                  },
                                  selected_category: item,
                                }))
                              }}
                            >
                              {item}
                            </span>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>

              </>
            )
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};
export default Bookings;
