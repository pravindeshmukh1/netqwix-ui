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
import moment from 'moment-timezone';
import axios from 'axios';


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
    const { userInfo } = useAppSelector(authState);
    const mediaQuery = window.matchMedia('(min-width: 992px)')
    const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)


    useEffect(() => {
        if (userInfo?.extraInfo?.working_hours?.time_zone) {
            getIANATimeZone(userInfo?.extraInfo?.working_hours?.time_zone)
        }
    }, [userInfo?.extraInfo?.working_hours?.time_zone])

    const getIANATimeZone = async (timezoneString) => {
        const matches = timezoneString.match(/\(GMT ([\+\-]\d+:\d+)\)/);
        const utcOffset = matches ? matches[1] : null;
        const response = await axios.get('https://fullcalendar.io/api/demo-feeds/timezones.json');
        var timeZones = response.data;
        const ianaTimeZone = utcOffset ? timeZones.find((tz) => moment.tz(tz).utcOffset() === moment.duration(utcOffset).asMinutes()) : '';
        setUserTimeZone(ianaTimeZone ? ianaTimeZone : Intl.DateTimeFormat().resolvedOptions().timeZone)
    };


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
        report,
        start_time,
        end_time
    ) => {

        const availabilityInfo = Utils.meetingAvailability(
            booked_date,
            session_start_time,
            session_end_time,
            userTimeZone,
            start_time,
            end_time
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
            report,
            start_time,
            end_time
        } = bookingInfo;

        const customStartDateTime = moment(start_time)?.tz(userTimeZone)?.format('h:mm a');
        const customEndDateTime = moment(end_time)?.tz(userTimeZone)?.format('h:mm a');

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
                            <dt className="ml-1">{`${customStartDateTime} - ${customEndDateTime}`}</dt>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-11">{showRatingLabel(ratings)}</div>
                    <div className="col-12 col-lg-auto">
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
                            report,
                            start_time,
                            end_time
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
        {scheduledMeetingDetails.length === 0 ? (
            // Show a message when there are no upcoming sessions
           <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                        <h5 className="block-title">No upcoming Session</h5>
                    </div>
        ) : (
            // Render scheduled meetings if there are any
            scheduledMeetingDetails?.map((bookingInfo, booking_index) => (
                <BookingCard bookingInfo={bookingInfo} key={booking_index} booking_index={booking_index} />
            ))
        )}
    </div>
    )
}

export default BookingList