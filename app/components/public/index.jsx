import React, { useEffect, useState } from "react";
import { ArrowLeft, Star, X } from "react-feather";
import {
  getTraineeWithSlotsAsync,
  traineeState,
} from "../trainee/trainee.slice";
import { Popover } from "react-tiny-popover";
import { useAppDispatch, useAppSelector } from "../../store";
import DatePicker from "react-datepicker";
import moment from "moment";
import StripeCard from "../../common/stripe/index";
import { Input, Label, Nav, NavItem, NavLink } from "reactstrap";
import {
  FILTER_DEFAULT_CHECKED_ID,
  FILTER_TIME,
  Message,
  TRAINER_AMOUNT_USD,
  TRAINER_MEETING_TIME,
  params,
  routingPaths,
  weekDays,
} from "../../common/constants";
import { Utils } from "../../../utils/utils";
import SocialMediaIcons from "../../common/socialMediaIcons";
import Accordion from "../../common/accordion";
import { bookingsState } from "../common/common.slice";
import TrainerSlider from "../trainee/scheduleTraining/trainerSlider";
import Modal from "../../common/modal";
import ImageVideoThumbnailCarousel from "../../common/imageVideoThumbnailCarousel";
import { useRouter } from "next/router";

const TrainersDetails = ({
  onClose,
  trainerInfo,
  selectTrainer,
  selectOption,
  searchQuery,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { push } = router;
  const { getTraineeSlots, transaction } = useAppSelector(traineeState);
  const [accordion, setAccordion] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [getParams, setParams] = useState(params);
  const [bookingTableData, setBookingTableData] = useState([]);
  const [bookingColumns, setBookingColumns] = useState([]);
  const [listOfTrainers, setListOfTrainers] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const [filterParams, setFilterParams] = useState({
    date: null,
    day: null,
    time: null,
  });
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState({});
  const [trainerDetails, setTrainerDetails] = useState({
    _id: null,
    select_trainer: false,
  });
  const [accordionsData, setAccordionsData] = useState({
    teaching_style: null,
    credentials_and_affiliations: null,
    curriculum: null,
  });
  // TODO: showing dummy records, will replace it with actual records
  useEffect(() => {
    if (trainerInfo && trainerInfo.extraInfo) {
      setAccordion(trainerInfo.extraInfo);
    }

    if (trainerInfo && !trainerInfo.isCategory) {
      setTrainerDetails((prev) => ({
        ...prev,
        _id: trainerInfo && trainerInfo.id,
        select_trainer: true,
      }));
      selectTrainer(trainerInfo && trainerInfo._id);
    }
  }, [trainerInfo]);

  useEffect(() => {
    const searchTerm = trainerInfo ? trainerInfo.name : searchQuery;
    if (filterParams.day || filterParams.time) {
      const filterPayload = {
        time: filterParams.time,
        day: filterParams.day,
        search: searchTerm,
      };
      dispatch(getTraineeWithSlotsAsync(filterPayload));
      console.log(`searchQuery --- `, searchTerm, filterParams);
    }
  }, [filterParams]);

  useEffect(() => {
    if (transaction && transaction.intent && transaction.intent.client_secret) {
      setShowTransactionModal(true);
    }
  }, [transaction]);

  useEffect(() => {
    const todaySDate = Utils.getDateInFormat(new Date());
    const { weekDates, weekDateFormatted } =
      Utils.getNext7WorkingDays(todaySDate);
    setTableData(getTraineeSlots, weekDates);
    setColumns(weekDateFormatted);
    setListOfTrainers(
      getTraineeSlots.map((trainer) => {
        return {
          id: trainer._id,
          background_image: trainer?.profilePicture,
          isActive: true,
          category: trainer?.category,
          name: trainer?.fullname,
          isCategory: false,
          extraInfo: trainer.extraInfo,
        };
      })
    );
  }, [getTraineeSlots]);

  const accordionData = [
    {
      id: 1,
      label: "Teaching Style",
      value: accordion.teaching_style || accordionsData.teaching_style,
    },
    {
      id: 2,
      label: "Credentials & Affiliations",
      value:
        accordion.credentials_and_affiliations ||
        accordionsData.credentials_and_affiliations,
    },
    {
      id: 3,
      label: "Curriculum",
      value: accordion.curriculum || accordionsData.curriculum,
    },
  ];

  const renderBookingTable = () => (
    <React.Fragment>
      <div className="row">
        <div className="mt-4 col-1.4  border border-dark p-10 ml-3">
          <DatePicker
            minDate={moment().toDate()}
            onChange={(date) => {
              setStartDate(date);
              const todaySDate = Utils.getDateInFormat(date.toString());
              const { weekDateFormatted, weekDates } =
                Utils.getNext7WorkingDays(todaySDate);
              setColumns(weekDateFormatted);
              setTableData(getTraineeSlots, weekDates);
              setColumns(weekDateFormatted);
            }}
            selected={startDate}
            // ref={null}
            customInput={<Input />}
          />
        </div>
      </div>
      <div className="row">
        <Modal
          isOpen={showTransactionModal}
          element={renderStripePaymentContent()}
        />
      </div>
    </React.Fragment>
  );

  const renderStripePaymentContent = () =>
    transaction && transaction.intent ? (
      <React.Fragment>
        <div className="d-flex justify-content-end mr-3">
          <h2
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              setShowTransactionModal(false);
            }}
          >
            <X />
          </h2>
        </div>
        <React.Fragment>
          {/* <h5>To book a slot, please pay {TRAINER_AMOUNT_USD}$.</h5> */}
          <React.Fragment>
            <StripeCard
              clientSecret={transaction.intent.client_secret}
              handlePaymentSuccess={() => {
                setShowTransactionModal(false);
                const payload = bookSessionPayload;
                dispatch(bookSessionAsync(payload));
                setIsPopoverOpen(null);
                setBookSessionPayload({});
              }}
              extraContent={
                bookSessionPayload && bookSessionPayload.trainer_id ? (
                  renderPaymentContent()
                ) : (
                  <></>
                )
              }
            />
          </React.Fragment>
        </React.Fragment>
      </React.Fragment>
    ) : (
      <></>
    );

  const renderPaymentContent = () => {
    return (
      <React.Fragment>
        <h3>
          {" "}
          Trainer: {bookSessionPayload.trainer_info.fullname} (Price per hour $
          {TRAINER_AMOUNT_USD}){" "}
        </h3>
        <h4 className="mt-3 mb-3">
          Booking time: {moment(bookSessionPayload.booked_date).format("ll")} |
          From: {bookSessionPayload.session_start_time} To:{" "}
          {bookSessionPayload.session_end_time}
        </h4>
        <h4 className="mb-3">
          Price: <b>${bookSessionPayload.charging_price}</b>
        </h4>
      </React.Fragment>
    );
  };

  const renderSlotsByDay = ({ slot, date, trainer_info }) => {
    const handleSignInRedirect = () => {
      push({ pathname: routingPaths.signIn });
    };
    return slot.map((content, index) => (
      <Popover
        key={`popover${index}`}
        isOpen={
          `${trainer_info._id}_${index}-${date.toString()}` === isPopoverOpen
        }
        positions={["top"]} // if you'd like, you can limit the positions
        align={"center"}
        padding={5} // adjust padding here!
        reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        onClickOutside={() => setIsPopoverOpen(null)} // handle click events outside of the popover/target here!
        content={(
          { position, nudgedLeft, nudgedTop } // you can also provide a render function that injects some useful stuff!
        ) => (
          <div style={{ zIndex: 5000 }} key={`tablist-${index}`}>
            <div className="alert alert-info m-20" role="alert">
              <p>
                Want to schedule a meeting with <b>{trainer_info.fullname}?</b>
              </p>
              <Nav tabs id="myTab1" role="tablist">
                <NavItem>
                  <NavLink
                    style={{ background: "white" }}
                    onClick={() => {
                      // const amountPayable = Utils.getMinutesFromHourMM(
                      //   content.start_time,
                      //   content.end_time
                      // );
                      // if (amountPayable > 0) {
                      //   const payload = {
                      //     charging_price: +amountPayable.toFixed(2),
                      //     trainer_id: trainer_info.trainer_id,
                      //     trainer_info,
                      //     status: BookedSession.booked,
                      //     booked_date: date,
                      //     session_start_time: content.start_time,
                      //     session_end_time: content.end_time,
                      //   };
                      //   setBookSessionPayload(payload);
                      //   alert("h");
                      //   dispatch(
                      //     createPaymentIntentAsync({
                      //       amount: +amountPayable.toFixed(2),
                      //     })
                      //   );
                      // } else {
                      //   toast.error("Invalid slot timing...");
                      // }
                      handleSignInRedirect();
                    }}
                  >
                    Book slot now
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        )}
      >
        <div
          onClick={() => {
            setIsPopoverOpen(`${trainer_info._id}_${index}-${date.toString()}`);
          }}
          key={`slot-${index}-content`}
          className="rounded-pill bg-primary text-white text-center p-1 mb-1 pointer font-weight-bold"
        >
          {Utils.convertToAmPm(content.start_time)} -{" "}
          {Utils.convertToAmPm(content.end_time)}{" "}
        </div>
      </Popover>
    ));
  };

  const renderTable = () => (
    <div
      className={`${
        trainerInfo && trainerInfo.userInfo
          ? "table-responsive-width"
          : "table-responsive-width border border-dark"
      }`}
    >
      <table className="table custom-trainer-slots-booking-table ml-30 mr-30">
        <thead className="justify-center align-center table-thead">
          <tr>
            {bookingColumns.map((columns, index) =>
              columns.title.length ? (
                <th scope="col" key={`booking-col-${index}`}>
                  {columns.title}
                </th>
              ) : null
            )}
          </tr>
        </thead>
        {bookingTableData && bookingTableData.length ? (
          <>
            {bookingTableData
              .filter(({ trainer_info }) => {
                return (
                  (trainer_info._id === trainerInfo &&
                    trainerInfo.userInfo?.id) ||
                  trainer_info._id === trainerDetails._id
                );
              })
              .map(
                ({ monday, tuesday, wednesday, thursday, friday }, index) => {
                  return (
                    <tr key={`table-data-${index}`}>
                      <td key={index}>
                        {monday.slot.length ? (
                          renderSlotsByDay(monday)
                        ) : (
                          <div
                            key={`slot-${index}-content`}
                            className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                          >
                            {Message.noSlotsAvailable}
                          </div>
                        )}
                      </td>
                      <td>
                        {tuesday.slot.length ? (
                          renderSlotsByDay(tuesday)
                        ) : (
                          <div
                            key={`slot-${index}-content`}
                            className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                          >
                            {Message.noSlotsAvailable}
                          </div>
                        )}
                      </td>
                      <td>
                        {wednesday.slot.length ? (
                          renderSlotsByDay(wednesday)
                        ) : (
                          <div
                            key={`slot-${index}-content`}
                            className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                          >
                            {Message.noSlotsAvailable}
                          </div>
                        )}
                      </td>
                      <td>
                        {thursday.slot.length ? (
                          renderSlotsByDay(thursday)
                        ) : (
                          <div
                            key={`slot-${index}-content`}
                            className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                          >
                            {Message.noSlotsAvailable}
                          </div>
                        )}
                      </td>
                      <td>
                        {friday.slot.length ? (
                          renderSlotsByDay(friday)
                        ) : (
                          <div
                            key={`slot-${index}-content`}
                            className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                          >
                            {Message.noSlotsAvailable}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            <tr key={`table-data-empty`} className="table-last-row">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </>
        ) : (
          <tr key={"no-data"} className="no-data">
            <td colSpan="6">No trainers available.</td>
          </tr>
        )}
      </table>
    </div>
  );

  const getSlotByDate = (slots = [], day) => {
    const slot =
      slots.find(
        (slot) => slot?.day && slot?.day?.toLowerCase() === day?.toLowerCase()
      ).slots || [];
    return slot
      .filter(({ start_time }) => start_time && start_time.length)
      .map(({ start_time, end_time }) => {
        return {
          start_time: getSpliitedTime(start_time),
          end_time: getSpliitedTime(end_time),
        };
      });
  };

  const getSpliitedTime = (time = "") => {
    const splittedTime = time.split(":");
    return `${splittedTime[0]}:${splittedTime[1]}`;
  };

  const setColumns = (weeks = []) => {
    setBookingColumns([]);
    const initialHeader = {
      title: "",
      dataIndex: "trainer_info",
      key: "Available_Trainers",
      width: 70,
      render: (
        { category, email, fullname, profilePicture, trainer_id, _id },
        record
      ) => {
        return (
          <div className="text-center">
            <img
              height={100}
              width={100}
              src={profilePicture}
              className="rounded"
            />
            <p htmlFor="exampleFormControlInput1" className="form-label mt-2">
              {fullname}
            </p>
          </div>
        );
      },
    };

    const weekCols = weeks.map((week, index) => {
      return {
        title: Utils.capitalizeFirstLetter(week),
        // a key using which we'll show records
        dataIndex: `${week.split(" ")[0].toLowerCase()}`,
        key: `week-col-${index}`,
        width: 100,
      };
    });

    setBookingColumns([initialHeader, ...weekCols]);
  };

  const Input = ({ onChange, placeholder, value, isSecure, id, onClick }) => (
    <span
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      isSecure={isSecure}
      id={id}
      onClick={onClick}
      className="select_date"
    >
      {Utils.formateDate(startDate)}
    </span>
  );

  const setTableData = (data = [], selectedDate) => {
    const result = data.map(
      ({
        available_slots,
        category,
        email,
        fullname,
        profilePicture,
        trainer_id,
        _id,
      }) => {
        const trainer_info = {
          category,
          email,
          fullname,
          profilePicture,
          trainer_id,
          _id,
        };
        return {
          trainer_info,
          monday: {
            date: selectedDate[0],
            trainer_info,
            slot: getSlotByDate(available_slots, weekDays[0]),
          },
          tuesday: {
            date: selectedDate[1],
            trainer_info,
            slot: getSlotByDate(available_slots, weekDays[1]),
          },
          wednesday: {
            date: selectedDate[2],
            trainer_info,
            slot: getSlotByDate(available_slots, weekDays[2]),
          },
          thursday: {
            date: selectedDate[3],
            trainer_info,
            slot: getSlotByDate(available_slots, weekDays[3]),
          },
          friday: {
            date: selectedDate[4],
            trainer_info,
            slot: getSlotByDate(available_slots, weekDays[4]),
          },
        };
      }
    );
    setBookingTableData(result);
  };
  return (
    <React.Fragment>
      {trainerInfo === null ? (
        <div className="media-body media-body text-right">
          <div className="mr-2 mt-4">
            <X
              onClick={onClose}
              className="close"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ) : (
        <div
          className={`${
            (trainerInfo.isCategory &&
              !trainerDetails.select_trainer &&
              "media-body media-body text-right") ||
            (!trainerInfo.isCategory && "media-body media-body text-right")
          }`}
        >
          <div className="mt-4">
            {!trainerInfo.isCategory ? (
              <X
                onClick={onClose}
                className="close"
                style={{ cursor: "pointer" }}
              />
            ) : !trainerDetails.select_trainer ? (
              <X onClick={onClose} style={{ cursor: "pointer" }} />
            ) : (
              <ArrowLeft
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setTrainerDetails((prev) => ({
                    ...prev,
                    _id: null,
                    select_trainer: false,
                    fullname: null,
                  }));
                }}
              />
            )}
          </div>
        </div>
      )}
      <div>
        {trainerDetails.select_trainer ? (
          <TrainerInfo
            accordionData={accordionData}
            activeAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
            element={renderTable()}
            datePicker={renderBookingTable()}
            getTraineeSlots={getTraineeSlots}
            trainerDetails={trainerDetails}
            setAccordionsData={setAccordionsData}
            trainerInfo={trainerInfo}
          />
        ) : (
          <SelectedCategory
            getTraineeSlots={getTraineeSlots}
            trainerInfo={trainerInfo}
            setTrainerDetails={setTrainerDetails}
            selectTrainer={selectTrainer}
            searchQuery={searchQuery}
            setFilterParams={setFilterParams}
            filterParams={filterParams}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default TrainersDetails;

const TrainerInfo = ({
  accordionData,
  activeAccordion,
  setActiveAccordion,
  element,
  getTraineeSlots,
  trainerDetails,
  setAccordionsData,
  datePicker,
}) => {
  const [isTablet, setIsTablet] = useState(false);
  const findTrainerDetails = () => {
    const findByTrainerId = getTraineeSlots.find(
      (trainer) => trainer && trainer._id === trainerDetails._id
    );
    return findByTrainerId;
  };
  const trainer = findTrainerDetails();
  useEffect(() => {
    if (trainer && trainer.extraInfo) {
      setAccordionsData((prev) => ({
        prev,
        teaching_style: trainer.extraInfo.teaching_style,
        credentials_and_affiliations:
          trainer.extraInfo.credentials_and_affiliations,
        curriculum: trainer.extraInfo.curriculum,
      }));
    } else {
      setAccordionsData((prev) => ({
        prev,
        teaching_style: null,
        credentials_and_affiliations: null,
        curriculum: null,
      }));
    }
  }, [trainer]);
  const revampedMedia =
    trainer &&
    trainer.extraInfo &&
    trainer.extraInfo.media.map((data, index) => {
      const { url, description, title, type, thumbnail = "" } = data;
      return {
        original: url,
        thumbnail: thumbnail,
        description,
        title,
        type,
      };
    });

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsTablet(window.innerWidth >= 720 && window.innerWidth <= 1280);
    };
    window.addEventListener("resize", checkScreenWidth);
    checkScreenWidth();
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div
      className={`row px-20 py-10 m-25 ${
        isTablet ? "model-tablet-view" : "custom-trainer-details-scroll"
      }`}
    >
      <div className="col-5">
        <div className="row">
          <div className="col-3">
            <img
              src={
                trainer && trainer.profilePicture
                  ? trainer.profilePicture
                  : "/assets/images/avtar/statusMenuIcon.jpeg"
              }
              width={"136px"}
              height={"128px"}
              style={{ borderRadius: "15px" }}
              alt="profile-picture"
            />
          </div>
          <div className="col-8 trainer-details">
            <h2 className="ml-1 mt-1">
              {trainer && trainer ? trainer.fullname : null}
            </h2>
            <h3 className="mb-3 mt-3 ml-1">
              {" "}
              Hourly Rate: ${TRAINER_AMOUNT_USD}{" "}
            </h3>
            {showRatings(trainer && trainer.trainer_ratings, "mb-3 d-flex")}
          </div>
        </div>
        <div className="d-flex flex-row bd-highlight" />
        {trainer &&
        trainer.extraInfo &&
        trainer.extraInfo.social_media_links ? (
          <SocialMediaIcons
            social_media_links={
              trainer &&
              trainer.extraInfo &&
              trainer.extraInfo.social_media_links
            }
            isvisible={false}
          />
        ) : null}
        <p className="mt-3">
          {trainer && trainer.extraInfo && trainer.extraInfo.about}
        </p>
        {accordionData.length
          ? accordionData.map((data, index) => {
              return (
                <Accordion key={`accordion_${index}`} className="mb-5">
                  <Accordion.Item>
                    <Accordion.Header
                      index={index}
                      activeAccordion={activeAccordion}
                      onAClick={() => {
                        if (activeAccordion[index]) {
                          delete activeAccordion[index];
                        } else if (!activeAccordion[index]) {
                          activeAccordion[index] = true;
                        } else {
                          activeAccordion[index] = !activeAccordion[index];
                        }
                        setActiveAccordion(activeAccordion);
                      }}
                    >
                      {data.label}
                    </Accordion.Header>
                    <Accordion.Body>
                      {!data.value ? Message.notFound : data.value}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })
          : Message.notFound}
      </div>
      <div className="col-7">
        {/* <Carousel
          media={
            trainer &&
            trainer.extraInfo &&
            trainer.extraInfo.media &&
            trainer.extraInfo.media
          }
        /> */}
        <h2>Featured content</h2>
        {revampedMedia && revampedMedia.length ? (
          <ImageVideoThumbnailCarousel
            media={revampedMedia}
            originalMedia={
              trainer && trainer.extraInfo && trainer.extraInfo.media
            }
          />
        ) : (
          <div className="no-media-found">{Message.noMediaFound}</div>
        )}
        <h2>My Schedule</h2>
        {datePicker}
        <div className="mt-3">{element}</div>
      </div>
    </div>
  );
};

const showRatings = (ratings, extraClasses = "") => {
  const { ratingRatio, totalRating } = Utils.getRatings(ratings);
  return (
    <React.Fragment>
      <div className={extraClasses}>
        <Star color="#FFC436" size={28} className="star-container star-svg" />
        <p className="ml-1 mt-1 mr-1 font-weight-light">{ratingRatio || 0}</p>
        <p className="mt-1">({totalRating || 0})</p>
      </div>
    </React.Fragment>
  );
};

const SelectedCategory = ({
  getTraineeSlots,
  trainerInfo,
  setTrainerDetails,
  selectTrainer,
  searchQuery,
  setFilterParams,
  filterParams,
}) => {
  return (
    <div className="row m-0">
      <div className="col-2">
        <div className="d-flex justify-content-between">
          <h3>Filters</h3>
          <div>{/* <h5>Reset filters</h 5> */}</div>
        </div>
        <hr className="hr" />
        <div className="d-flex">
          <h4 className="border border-secondary rounded-pill p-10 d-flex justify-content-center align-items-center mb-4">
            {trainerInfo ? trainerInfo.name : searchQuery}
          </h4>
        </div>
        <p>Select as many filters as you would like.</p>
        <div>
          <b>Day of the week</b>
          <div>
            <div className="mt-2">
              <DatePicker
                placeholderText="Select Day"
                minDate={moment().toDate()}
                onChange={(date) => {
                  const day = new Date(date).getDay();
                  setFilterParams({
                    ...filterParams,
                    date,
                    day: weekDays[day - 1],
                  });
                }}
                selected={filterParams.date}
                // ref={null}
                customInput={<Input />}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mt-3">
            <b> Time of Day</b>
          </div>
          <div className="mt-3 pl-3">
            {FILTER_TIME.map((time, index) => {
              return (
                <div className="my-2" key={`time-of-day-${index}-${time.id}`}>
                  <Label check>
                    <Input
                      defaultChecked={time.id === FILTER_DEFAULT_CHECKED_ID}
                      onChange={(event) => {
                        console.log(`event --- `, event);
                        const pickedId = event.target.value;
                        const selectedLog = FILTER_TIME.find(
                          (time) => time.id === +pickedId
                        );

                        if (selectedLog && selectedLog.time) {
                          setFilterParams({
                            ...filterParams,
                            time: selectedLog.time,
                          });
                        }
                      }}
                      type="radio"
                      value={time.id}
                      defaultValue={1}
                      name="time-of-day"
                    />
                    <span>{time.label}</span>
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="col-10 px-5"
        style={{ height: "89vh", overflowX: "auto" }}
      >
        {!getTraineeSlots.length ? (
          <div
            className="text-center container mw-100 border border-secondary p-30 mb-4"
            style={{ borderRadius: "20px" }}
          >
            No trainer found
          </div>
        ) : (
          getTraineeSlots.map((data, index) => {
            const textTruncate = false;
            return (
              <div
                className="card custom-card mb-4"
                key={`trainers_${index}`}
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body" key={index}>
                  <div className="row">
                    <div className="col-1.3 ml-3">
                      <img
                        src={
                          data.profilePicture
                            ? data.profilePicture
                            : "/assets/images/avtar/statusMenuIcon.jpeg"
                        }
                        width={"136px"}
                        height={"128px"}
                        style={{ borderRadius: "15px" }}
                        alt="profile-picture"
                      />
                    </div>
                    <div className="col-8">
                      <h3
                        className="card-title pointer underline"
                        onClick={() => {
                          console.log(`data`);
                          setTrainerDetails((prev) => ({
                            ...prev,
                            _id: data && data._id,
                            select_trainer: true,
                          }));
                          selectTrainer(data && data._id);
                        }}
                      >
                        {data ? data.fullname : ""}
                      </h3>
                      <p
                        className="badge badge-pill badge-primary mb-2 p-2"
                        style={{ fontSize: "15px" }}
                      >
                        {`$${TRAINER_AMOUNT_USD}.00`}
                        {`/ ${TRAINER_MEETING_TIME}`}
                      </p>
                      <h4
                        className={`${textTruncate ? "text-truncate" : ""}`}
                        style={{ marginBottom: "0px" }}
                      >
                        {data && data.extraInfo
                          ? Utils.truncateText(data.extraInfo.about, 200)
                          : Message.notAvailableDescription}
                      </h4>
                      <React.Fragment>
                        {data &&
                        data.extraInfo &&
                        data.extraInfo.social_media_links ? (
                          <SocialMediaIcons
                            social_media_links={
                              data &&
                              data.extraInfo &&
                              data.extraInfo.social_media_links
                            }
                          />
                        ) : null}
                      </React.Fragment>
                    </div>
                    <div className="col-1.1">
                      {showRatings(
                        data.trainer_ratings,
                        "d-flex justify-content-end"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
