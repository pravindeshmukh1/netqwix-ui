import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store';
import { addTraineeClipInBookedSessionAsync, bookingsState, getScheduledMeetingDetailsAsync } from '../common/common.slice';
import { Utils } from '../../../utils/utils';
import { AccountType, BookedSession, bookingButton } from '../../common/constants';
import { authState } from '../auth/auth.slice';
import { Button } from 'reactstrap';
import { X } from 'react-feather';
import Modal from '../../common/modal';
import { traineeAction } from '../trainee/trainee.slice';

const TraineeRenderBooking = ({
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
    report,
    bookedSession, setBookedSession, tabBook, startMeeting, setStartMeeting
}) => {

    const { scheduledMeetingDetails, addRatingModel } = useAppSelector(bookingsState);
    const { removeNewBookingData } = traineeAction;
    const dispatch = useAppDispatch();
    const isCompleted =
        has24HoursPassedSinceBooking ||
        scheduledMeetingDetails[booking_index]?.ratings?.trainee;

    const canShowRatingButton =
        !isUpcomingSession &&
        !isCurrentDateBefore &&
        !isStartButtonEnabled &&
        status !== BookedSession.booked &&
        !isCompleted;


    const updateBookedStatusApi = (_id, booked_status) => {
        if (_id) {
            const updatePayload = {
                id: _id,
                booked_status: booked_status,
            };
            const payload = {
                ...(accountType === AccountType?.TRAINER
                    ? { status: tabBook, updatePayload }
                    : { updatePayload }),
            };
            dispatch(updateBookedSessionScheduledMeetingAsync(payload));
        }
    }

    return (
        <React.Fragment>
            {isCompleted ? <h3>Completed</h3> : null}
            {canShowRatingButton ? (
                <button
                    className={`btn btn-success button-effect btn-sm mr-4 my-1`}
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
                                        className="btn btn-success button-effect btn-sm mr-4 btn_cancel my-1"
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
                                            className="btn btn-dark button-effect btn-sm mr-4 btn_cancel my-1"
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
                                            className="btn btn-primary button-effect btn-sm mr-4 my-1"
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
                                                    {clips?.length ? clips?.map((cl, ind) => <div className={`collapse-block ${cl?.show ? "" : "open"}`}>
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
                                                    ) :
                                                        <>
                                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                                                                <h5 className="block-title">  No Data Found</h5>
                                                            </div>
                                                        </>}
                                                </div>
                                                {clips?.length ? <div className="d-flex justify-content-around w-100 p-3">
                                                    <Button color="success" onClick={() => { addTraineeClipInBookedSession() }}>Share</Button>
                                                </div> : <></>}
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
                                        updateBookedStatusApi(_id, BookedSession.canceled)
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


export default TraineeRenderBooking

