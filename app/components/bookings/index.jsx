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

const { isMobileFriendly, isSidebarToggleEnabled } = bookingsAction;

const Bookings = ({ accountType = null }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { handleActiveTab, handleSidebarTabClose } = bookingsAction;
  const { isLoading, configs } = useAppSelector(bookingsState);
  const { userInfo } = useAppSelector(authState);
  const [bookedSession, setBookedSession] = useState({
    id: "",
    booked_status: "",
  });
  const [tabBook, setTabBook] = useState(bookingButton[0])

  const [startMeeting, setStartMeeting] = useState({
    trainerInfo: null,
    traineeInfo: null,
    id: null,
    isOpenModal: false,
  });
  const socket = useContext(SocketContext);

  const { activeTab } = useAppSelector(bookingsState);
  const { scheduledMeetingDetails, addRatingModel } =
    useAppSelector(bookingsState);
  const { addRating } = bookingsAction;

  const handelBookingButton = (tab) => {
    setTabBook(tab)
  }

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
        status: tabBook,
        updatePayload,
      };
      dispatch(updateBookedSessionScheduledMeetingAsync(payload));
    }
  }, [bookedSession]);

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
    trainer_info
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
          isMeetingDone
        );
      case AccountType.TRAINEE:
        return TraineeRenderBooking(
          _id,
          status,
          trainee_info,
          trainer_info,
          isCurrentDateBefore,
          isStartButtonEnabled,
          isMeetingDone
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
    isMeetingDone
  ) => {
    return (
      <div>
        {isMeetingDone && <h3>Completed</h3>}
        {!isCurrentDateBefore &&
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
              };
              handleAddRatingModelState(payload);
            }}
          >
            Rating
          </button>
        ) : (
          <div className="d-flex">
            {!isMeetingDone && (
              <>
                {status !== BookedSession.canceled && (
                  <button
                    className={`btn btn-primary button-effect btn-sm`}
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
                    className={`btn btn-primary button-effect btn-sm ml-4`}
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
                  className="btn btn-danger button-effect btn-sm ml-4"
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
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const TraineeRenderBooking = (
    _id,
    status,
    trainee_info,
    trainer_info,
    isCurrentDateBefore,
    isStartButtonEnabled,
    isMeetingDone
  ) => {
    return (
      <div>
        {isMeetingDone && <h3>Completed</h3>}
        {!isCurrentDateBefore &&
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
              };
              handleAddRatingModelState(payload);
            }}
          >
            Rating
          </button>
        ) : (
          !isMeetingDone && (
            <div>
              {status !== BookedSession.canceled && (
                <>
                  {status === BookedSession.booked ? (
                    <button
                      className={`btn btn-dark button-effect btn-sm`}
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
                      className={`btn btn-primary button-effect btn-sm`}
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
                </>
              )}
              {status === BookedSession.confirmed && (
                <button
                  className={`btn btn-primary button-effect btn-sm ml-4`}
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
                className="btn btn-danger button-effect btn-sm ml-4 btnbook"
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
            </div>
          )
        )}
      </div>
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
    ) : (
      <></>
    );
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
      } = bookingInfo;
      return (
        <div
          className="card mb-4"
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
              <div className="col-6">
                {showRatingLabel(bookingInfo.ratings)}
              </div>
              {/* <div className="col-6 d-flex justify-content-end"> */}
              <div className="col-12 d-flex justify-content-end  ">
                {renderBooking(
                  status,
                  booking_index,
                  booked_date,
                  session_start_time,
                  session_end_time,
                  _id,
                  trainee_info,
                  trainer_info
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
          />
        }
        isOpen={addRatingModel.isOpen}
        id={addRatingModel._id}
        width={"50%"}
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
      <div>
        <div className={extraClasses}>
          <Star color="#FFC436" size={28} className="star-container star-svg" />
          <p className="ml-1 mt-1 mr-1 font-weight-light">{ratingRatio || 0}</p>
          <p className="mt-1">({totalRating || 0})</p>
        </div>
      </div>
    );
  };
  const trainerInfo = () => (
    <React.Fragment>
      <div className="card rounded trainer-profile-card">
        <div className="card-body">
          <div className="row">
            <div className="col-5 col-sm-6 col-md-5 col-lg-4 col-xl-2">
              <img
                src={
                  userInfo && userInfo?.profile_picture
                    ? userInfo && userInfo?.profile_picture
                    : "/assets/images/avtar/user.png"
                }
                alt="trainer_image"
                className="rounded trainer-profile"
              />
            </div>
            <div className="col-8 col-sm-6 col-md-6 col-lg-6 col-xl-8">
              <h3 className="mt-3">Hourly Rate: ${TRAINER_AMOUNT_USD}</h3>
              {showRatings([], "mt-3 d-flex")}
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
          <div className="row">
            <div className="col-12 col-mb-2 col-sm-6 col-sm-mb-2 col-md-8 col-lg-12 col-xl-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  {bookingButton?.map((tab, index) => {
                    return (
                      <button key={`booking-tab${index}`} aria-selected={tab} onClick={() => handelBookingButton(tab)}
                        className={`${tab === tabBook ? `border border-primary` : ''} 
                        nav-link text-primary text-capitalize book-tabs`}
                        id={tab}
                        data-bs-toggle="tab" data-bs-target={`#${tab}`} type="button" role="tab" aria-controls="nav-home">
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                {!scheduledMeetingDetails.length ?
                  <h2 className="mt-5 d-flex justify-content-center">
                    No {tabBook} sessions
                  </h2> : (Bookings())}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
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
        {startMeeting.isOpenModal ? (
          renderVideoCall()
        ) : (
          <div>
            {
              accountType === AccountType.TRAINER ? (
                <React.Fragment>
                  <div className="welcome-text mb-3">Welcome {userInfo && userInfo?.fullname}</div>
                  <div>
                    {trainerInfo()}
                  </div>
                  <h2 className="d-flex justify-content-center mt-2 p-5 mb-2 bg-primary text-white rounded">
                    Bookings
                  </h2>
                  <div className="mb-2">
                    {bookingTabs()}
                  </div>
                </React.Fragment>
              ) : null
            }
          </div>
        )}
        {accountType === AccountType.TRAINEE ? !scheduledMeetingDetails && !scheduledMeetingDetails.length ? <h2 className="d-flex 
        justify-content-center mt-4">No Bookings available</h2> :
          <React.Fragment>
            <h3 className="mt-2 p-3 mb-2 bg-primary text-white rounded">
              Bookings
            </h3>
            {Bookings()}
          </React.Fragment>
          : null}
      </div>
    </React.Fragment>
  );
};
export default Bookings;
