import { useContext, useEffect, useState } from "react";
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
  meetingRatingTimeout,
} from "../../common/constants";
import { Utils } from "../../../utils/utils";
import Modal from "../../common/modal";
import StartMeeting from "./start";
import { SocketContext } from "../socket";
import Ratings from "./ratings";
import Rating from "react-rating";
import { Star } from "react-feather";

const Bookings = ({ accountType = null }) => {
  const router = useRouter();

  const [bookedSession, setBookedSession] = useState({
    id: "",
    booked_status: "",
  });

  const [startMeeting, setStartMeeting] = useState({
    trainerInfo: null,
    traineeInfo: null,
    id: null,
    isOpenModal: false,
  });
  const socket = useContext(SocketContext);

  const dispatch = useAppDispatch();
  const { scheduledMeetingDetails, addRatingModel } =
    useAppSelector(bookingsState);
  const { addRating } = bookingsAction;

  useEffect(() => {
    dispatch(getScheduledMeetingDetailsAsync());
  }, []);

  useEffect(() => {
    if (bookedSession.id) {
      const updatePayload = {
        id: bookedSession.id,
        booked_status: bookedSession.booked_status,
      };
      dispatch(updateBookedSessionScheduledMeetingAsync(updatePayload));
    }
  }, [bookedSession]);

  const toggle = () => setStartMeeting(!startMeeting);

  const handleAddRatingModelState = (state) => {
    dispatch(addRating(state));
  };


  const isMeetingCompleted = (detail) => {
    return detail.status === BookedSession.completed || (detail && detail.ratings && detail.ratings[accountType.toLowerCase()] && detail.ratings[accountType.toLowerCase()].sessionRating);
  }

  const isMeetingTimePassed = ({ booked_date, session_start_time }) => {
    const currentDate = moment().format(FormateDate.YYYY_MM_DD);
    const currentTime = moment().format(FormateHours.HH_MM);
    const currentFormattedTime = Utils.convertToAmPm(currentTime);
    const bookedDate = Utils.getDateInFormat(booked_date);
    const sessionEndTime = Utils.convertToAmPm(session_start_time);
    const bookingDateTime = moment(
      `${bookedDate} ${sessionEndTime}`,
      `${FormateDate.YYYY_MM_DD} ${FormateHours.HH_MM}`
    );
    const currentDateTime = moment(
      `${currentDate} ${currentFormattedTime}`,
      `${FormateDate.YYYY_MM_DD} ${FormateHours.HH_MM}`
    );

    return bookingDateTime < currentDateTime;
  }


  const handleBookedScheduleTraining = (
    scheduledMeetingDetails,
    index,
    status,
    _id,
    trainee_info,
    trainer_info
  ) => {
    // not showing cancle button if missing start time is passed
    const showCancelButton = isMeetingTimePassed(scheduledMeetingDetails[index]);
    if (accountType === AccountType.TRAINEE) {
      const meetingAvailability = Utils.checkMeetingAvailability(
        scheduledMeetingDetails
      );
      const has24HoursPassed = Utils.has24HoursPassed(scheduledMeetingDetails);
      const isMeetingDone = has24HoursPassed[index] || isMeetingCompleted(scheduledMeetingDetails[index]);
      return (
        <>
          {(isMeetingDone) && <h3>Completed</h3>}
          {!isMeetingDone &&
            status === BookedSession.confirmed &&
            !meetingAvailability[index] && (
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
            )}
          {!isMeetingDone && status === BookedSession.booked ? (
            <button
              className={`btn btn-dark button-effect btn-sm`}
              type="button"
              style={{
                cursor: accountType === AccountType.TRAINEE && "not-allowed",
              }}
              disabled={accountType === AccountType.TRAINEE}
            >
              Booked
            </button>
          ) : (
            <>
              {!status === BookedSession.canceled ||
                (status === BookedSession.confirmed &&
                  !isMeetingDone && (
                    <>
                      <button
                        className={`btn btn-primary button-effect btn-sm`}
                        type="button"
                        style={{
                          cursor:
                            status === BookedSession.confirmed
                              ? "not-allowed"
                              : "pointer",
                        }}
                        disabled={status === BookedSession.confirmed}
                      >
                        Confirmed
                      </button>
                      <button
                        className={`btn btn-primary button-effect btn-sm ml-4`}
                        type="button"
                        disabled={
                          status === BookedSession.confirmed &&
                          !meetingAvailability[index]
                        }
                        style={{
                          cursor:
                            status === BookedSession.booked ||
                              status === BookedSession.confirmed ||
                              !meetingAvailability[index]
                              ? "not-allowed"
                              : "pointer",
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
                        Start
                      </button>
                    </>
                  ))}
            </>
          )}

          {!isMeetingDone && (status === BookedSession.canceled) ? (
            <button
              className={`btn btn-danger button-effect btn-sm`}
              type="button"
              style={{
                cursor: status === BookedSession.canceled && "not-allowed",
              }}
              disabled={status === BookedSession.canceled}
            >
              Canceled
            </button>) : <>
            {!showCancelButton && <button
              className="btn btn-danger button-effect btn-sm mr-4 ml-4"
              type="button"
              style={{
                cursor:
                  "pointer",
              }}
              onClick={() => {
                if (
                  status === BookedSession.booked ||
                  status === BookedSession.confirmed
                ) {
                  setBookedSession({
                    ...bookedSession,
                    id: _id,
                    booked_status: BookedSession.canceled,
                  });
                }
              }}
            >
              Cancel
            </button>}

          </>}
        </>
      );
    } else if (accountType === AccountType.TRAINER) {
      const meetingAvailability = Utils.checkMeetingAvailability(
        scheduledMeetingDetails
      );
      const has24HoursPassed = Utils.has24HoursPassed(scheduledMeetingDetails);
      const isMeetingDone = has24HoursPassed[index] || isMeetingCompleted(scheduledMeetingDetails[index]);
      return (
        <>
          {(isMeetingDone) && <h3>Completed</h3>}
          {!isMeetingDone &&
            status === BookedSession.confirmed &&
            !meetingAvailability[index] && (
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
            )}
          {!isMeetingDone && status === BookedSession.canceled ? (
            <button
              className={`btn btn-danger button-effect btn-sm`}
              type="button"
              style={{
                cursor: status === BookedSession.canceled && "not-allowed",
              }}
              disabled={status === BookedSession.canceled}
            >
              Canceled
            </button>
          ) : (
            <>
              {!isMeetingDone && (
                <>
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
                  <button
                    className={`btn btn-primary button-effect btn-sm ml-4`}
                    type="button"
                    disabled={
                      status === BookedSession.confirmed &&
                      !meetingAvailability[index]
                    }
                    style={{
                      cursor:
                        status === BookedSession.booked ||
                          !meetingAvailability[index]
                          ? "not-allowed"
                          : "pointer",
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
                    Start
                  </button>

                  {!showCancelButton && <button
                    className="btn btn-danger button-effect btn-sm ml-4"
                    type="button"
                    onClick={() =>
                      setBookedSession({
                        ...bookedSession,
                        id: _id,
                        booked_status: BookedSession.canceled,
                      })
                    }
                  >
                    Cancel
                  </button>
                  }
                </>
              )}
            </>
          )}
        </>
      );
    }
  };

  const showRatingLabel = (ratingInfo) => {

    return ((ratingInfo && ratingInfo[accountType.toLowerCase()] && ratingInfo[accountType.toLowerCase()].recommendRating) ? (<div className="d-flex items-center"> You rated <b className="pl-2">{ratingInfo[accountType.toLowerCase()].recommendRating}</b>
      <Star
        color="#FFC436"
        size={28}
        className="star-container star-svg"
      /> to this {accountType?.toLowerCase()}.
    </div>) : <></>)
  }

  const renderBookings = () =>
    scheduledMeetingDetails.map((data, index) => {
      const {
        _id,
        trainee_info,
        trainer_info,
        booked_date,
        session_start_time,
        session_end_time,
      } = data;
      return (
        <div className="card mb-4" key={`booking-schedule-training${index}`}>
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
          <div className="card-footer ">
            <div className="row">
              <div className="col-6">
                {showRatingLabel(data.ratings)}
              </div>
              <div className="col-6 px-5 pb-3 d-flex justify-content-end">
                {handleBookedScheduleTraining(
                  scheduledMeetingDetails,
                  index,
                  data.status,
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
  return (
    <>
      <div id="bookings" className="bookings container-content">
        {addRatingModel.isOpen ? renderRating() : null}
        {!scheduledMeetingDetails.length ? (
          <h3 className="d-flex justify-content-center mt-20">
            No bookings available
          </h3>
        ) : startMeeting.isOpenModal ? (
          renderVideoCall()
        ) : (
          <div>
            <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
              Bookings
            </h3>
            {renderBookings()}
          </div>
        )}
      </div>

      {/* calling popup */}
      {/* <Modal
        key={"startMeeting"}
        toggle={toggle}
        allowFullWidth={true}
        isOpen={startMeeting.isOpenModal}
        // height="100vh"
        element={
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
        }
      /> */}
    </>
  );
};
export default Bookings;
