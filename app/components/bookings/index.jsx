import { useEffect, useState } from "react";
import {
  bookingsState,
  getScheduledMeetingDetailsAsync,
  updateBookedSessionScheduledMeetingAsync,
} from "../common/common.slice";

import { useAppSelector, useAppDispatch } from "../../store";
import {
  AccountType,
  BookedSession,
  BookedSessionMessage,
} from "../../common/constants";
const Bookings = ({ accountType = null }) => {
  const [bookedSession, setBookedSession] = useState({
    id: "",
    booked_status: "",
  });
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

  return (
    <>
      <div className="m-25 w-100">
        {!scheduledMeetingDetails.length ? (
          <h1 className="d-flex justify-content-center">
            No Booked Schedule Training Found
          </h1>
        ) : (
          scheduledMeetingDetails.map((data) => {
            const {
              _id,
              trainee_info,
              trainer_info,
              booked_date,
              session_start_time,
              session_end_time,
            } = data;
            return (
              <div className="card mb-5">
                <div className="card-header pt-0 px-0">
                  <h5 className="mt-3 ml-3">Booked Schedule Training</h5>
                </div>
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
                        <dt className="ml-1">{booked_date}</dt>
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
                        <dt className="ml-1">{`${session_start_time}-${session_end_time}`}</dt>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="card-footer px-5 pb-3 d-flex justify-content-end">
                  {data.status === BookedSession.canceled ||
                  data.status === BookedSession.confirmed ? (
                    <p className={"text-dark"}>
                      Note:{" "}
                      {data.status === BookedSession.canceled
                        ? BookedSessionMessage.canceled
                        : BookedSessionMessage.confirmed}
                    </p>
                  ) : (
                    <>
                      {!data.status === BookedSession.confirmed ||
                        (data.status === BookedSession.booked && (
                          <button
                            className="btn btn-danger button-effect btn-sm mr-4"
                            type="button"
                            onClick={() =>
                              setBookedSession({
                                ...bookedSession,
                                id: _id,
                                booked_status: BookedSession.canceled,
                              })
                            }
                          >
                            Canceled
                          </button>
                        ))}
                      {!data.status === BookedSession.confirmed ||
                        (data.status === BookedSession.booked && (
                          <button
                            className={`btn ${
                              accountType === AccountType.TRAINEE
                                ? "btn-dark"
                                : "btn-primary"
                            } button-effect btn-sm`}
                            type="button"
                            onClick={() =>
                              setBookedSession({
                                ...bookedSession,
                                id: _id,
                                booked_status: BookedSession.confirmed,
                              })
                            }
                            style={{
                              cursor:
                                accountType === AccountType.TRAINEE &&
                                "not-allowed",
                            }}
                            disabled={accountType === AccountType.TRAINEE}
                          >
                            Confirmed
                          </button>
                        ))}
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
export default Bookings;
