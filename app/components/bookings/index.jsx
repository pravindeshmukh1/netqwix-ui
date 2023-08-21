import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactStrapModal from "../../common/modal";

import {
  bookingsState,
  getScheduledMeetingDetailsAsync,
  updateBookedSessionScheduledMeetingAsync,
} from "../common/common.slice";

import { useAppSelector, useAppDispatch } from "../../store";
import { AccountType, BookedSession } from "../../common/constants";
import { Utils } from "../../../utils/utils";
import Modal from "../../common/modal";
import StartMeeting from "./start";
import { SocketContext } from "../socket";
import Ratings from "./ratings";

const Bookings = ({ accountType = null }) => {
  const router = useRouter();

  const [bookedSession, setBookedSession] = useState({
    id: "",
    booked_status: "",
  });
  const [rating, setRating] = useState({ _id: "", isOpen: false });

  const [startMeeting, setStartMeeting] = useState({
    trainerInfo: null,
    traineeInfo: null,
    id: null,
    isOpenModal: false,
  });
  const socket = useContext(SocketContext);

  const dispatch = useAppDispatch();
  const { scheduledMeetingDetails } = useAppSelector(bookingsState);
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

  const handleBookedScheduleTraining = (
    scheduledMeetingDetails,
    index,
    status,
    _id,
    trainee_info,
    trainer_info
  ) => {
    if (accountType === AccountType.TRAINEE) {
      return (
        <>
          {status === BookedSession.booked ? (
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
                (status === BookedSession.confirmed && (
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
                        status === BookedSession.confirmed ? false : true
                      }
                      style={{
                        cursor:
                          status === BookedSession.booked
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
          <button
            className="btn btn-danger button-effect btn-sm mr-4 ml-4"
            type="button"
            style={{
              cursor:
                status === BookedSession.canceled ? "not-allowed" : "pointer",
            }}
            disabled={status === BookedSession.canceled}
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
            {status === BookedSession.canceled ? "Canceled" : "Cancel"}
          </button>
        </>
      );
    } else if (accountType === AccountType.TRAINER) {
      const meetingAvailability = Utils.checkMeetingAvailability(
        scheduledMeetingDetails
      );
      return (
        <>
          {!meetingAvailability[index] && (
            <button
              className={`btn btn-success button-effect btn-sm mr-4`}
              type="button"
              onClick={() =>
                setRating((prev) => ({ ...prev, _id, isOpen: true }))
              }
            >
              Rating
            </button>
          )}
          {status === BookedSession.canceled ? (
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
              <button
                className={`btn btn-primary button-effect btn-sm`}
                type="button"
                style={{
                  cursor: status === BookedSession.confirmed && "not-allowed",
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
                disabled={!meetingAvailability[index]}
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
              <button
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
            </>
          )}
        </>
      );
    }
  };

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
          <div className="card-footer px-5 pb-3 d-flex justify-content-end">
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
      );
    });

  const renderRating = () => {
    return (
      <ReactStrapModal
        element={<Ratings />}
        isOpen={rating.isOpen}
        id={rating.id}
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
      <div className="m-25 w-100 custom-scroll" id="bookings">
        {rating.isOpen ? renderRating() : null}
        {!scheduledMeetingDetails.length ? (
          <h3 className="d-flex justify-content-center mt-20">
            No bookings available
          </h3>
        ) : startMeeting.isOpenModal ? (
          renderVideoCall()
        ) : (
          <>
            <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
              Bookings
            </h3>
            {renderBookings()}
          </>
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
