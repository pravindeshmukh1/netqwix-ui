import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store';
import { addTraineeClipInBookedSessionAsync, bookingsState, getScheduledMeetingDetailsAsync } from '../common/common.slice';
import { Utils } from '../../../utils/utils';
import { AccountType, BookedSession, bookingButton, topNavbarOptions } from '../../common/constants';
import { authAction, authState } from '../auth/auth.slice';
import TraineeRenderBooking from './TraineeRenderBooking';
import TrainerRenderBooking from './TrainerRenderBooking';
import StartMeeting from './start';
import Modal from '../../common/modal';
import { Star, X } from 'react-feather';
import { myClips } from '../../../containers/rightSidebar/fileSection.api';


export var meetingRoom = () => <></>


const BookingList = ({ activeCenterContainerTab }) => {
    const [tabBook, setTabBook] = useState(bookingButton[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [clips, setClips] = useState([]);
    const [selectedClips, setSelectedClips] = useState([]);
    const [isOpenID, setIsOpenID] = useState("");
    const dispatch = useAppDispatch()
    const { scheduledMeetingDetails, addRatingModel } = useAppSelector(bookingsState);
    const { accountType } = useAppSelector(authState);
    const [bookedSession, setBookedSession] = useState({
        id: "",
        booked_status: "",
    });
    const { isLoading, configs } = useAppSelector(bookingsState);

    const mediaQuery = window.matchMedia('(min-width: 992px)')

    const [startMeeting, setStartMeeting] = useState({
        trainerInfo: null,
        traineeInfo: null,
        id: null,
        isOpenModal: false,
    });
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
        getMyClips()
    }, [tabBook, activeCenterContainerTab]);
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

    const isMeetingCompleted = (detail) => {
        return (
            detail.status === BookedSession.completed ||
            (detail &&
                detail.ratings &&
                detail.ratings[accountType.toLowerCase()] &&
                detail.ratings[accountType.toLowerCase()].sessionRating)
        );
    };


    const getMyClips = async () => {
        var res = await myClips({})
        setClips(res?.data)
    }

    const addTraineeClipInBookedSession = async () => {
        const payload = { id: isOpenID, trainee_clip: selectedClips?.map(val => val?._id) };
        dispatch(addTraineeClipInBookedSessionAsync(payload));
        dispatch(removeNewBookingData());
        setIsOpen(false)
        setIsModalOpen(false);
    }

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
                return <TrainerRenderBooking
                    _id={_id}
                    status={status}
                    trainee_info={trainee_info}
                    trainer_info={trainer_info}
                    isCurrentDateBefore={isCurrentDateBefore}
                    isStartButtonEnabled={isStartButtonEnabled}
                    isMeetingDone={isMeetingDone}
                    isUpcomingSession={isUpcomingSession}
                    ratings={ratings}
                    booking_index={booking_index}
                    has24HoursPassedSinceBooking={has24HoursPassedSinceBooking}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    clips={clips}
                    setClips={setClips}
                    selectedClips={selectedClips}
                    setSelectedClips={setSelectedClips}
                    setIsOpenID={setIsOpenID}
                    addTraineeClipInBookedSession={addTraineeClipInBookedSession}
                    trainee_clips={trainee_clips}
                    report={report}
                    bookedSession={bookedSession}
                    setBookedSession={setBookedSession}
                    tabBook={tabBook}
                    setStartMeeting={setStartMeeting}
                    startMeeting={startMeeting}
                />
            case AccountType.TRAINEE:
                return <TraineeRenderBooking
                    _id={_id}
                    status={status}
                    trainee_info={trainee_info}
                    trainer_info={trainer_info}
                    isCurrentDateBefore={isCurrentDateBefore}
                    isStartButtonEnabled={isStartButtonEnabled}
                    isMeetingDone={isMeetingDone}
                    isUpcomingSession={isUpcomingSession}
                    ratings={ratings}
                    booking_index={booking_index}
                    has24HoursPassedSinceBooking={has24HoursPassedSinceBooking}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    clips={clips}
                    setClips={setClips}
                    selectedClips={selectedClips}
                    setSelectedClips={setSelectedClips}
                    setIsOpenID={setIsOpenID}
                    addTraineeClipInBookedSession={addTraineeClipInBookedSession}
                    trainee_clips={trainee_clips}
                    report={report}
                    bookedSession={bookedSession}
                    setBookedSession={setBookedSession}
                    tabBook={tabBook}
                    setStartMeeting={setStartMeeting}
                    startMeeting={startMeeting}
                />
            default:
                break;
        }
    };


    const BookingCard = ({ bookingInfo, booking_index }) => {
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
        return <div
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
    }


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
                dispatch(authAction?.setTopNavbarActiveTab(topNavbarOptions?.HOME))
            }}
        />
    );

    meetingRoom = () => {
        return <div> <div
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
        </div></div>
    }

    useEffect(() => {
        if (startMeeting?.isOpenModal) {
            dispatch(authAction?.setTopNavbarActiveTab(topNavbarOptions?.MEETING_ROOM))
        }
    }, [startMeeting?.isOpenModal])


    return (
        <div>
            {/* <Modal isOpen={startMeeting?.isOpenModal}
                element={
                    <div>
                        {renderVideoCall()}
                    </div>
                }
            /> */}

            {
                scheduledMeetingDetails?.map((bookingInfo, booking_index) => {
                    return <BookingCard bookingInfo={bookingInfo} key={booking_index} booking_index={booking_index} />
                })
            }
        </div>
    )
}

export default BookingList