import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../scheduleTraining/index.scss";
import { Popover } from "react-tiny-popover";
import {
  BookedSession,
  Message,
  TRAINER_AMOUNT_USD,
  TimeRange,
  debouncedConfigs,
  params,
  weekDays,
} from "../../../common/constants";
import { Utils } from "../../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  bookSessionAsync,
  createPaymentIntentAsync,
  getTraineeWithSlotsAsync,
  traineeState,
} from "../trainee.slice";
import { Nav, NavItem, NavLink } from "reactstrap";
import TrainerSlider from "./trainerSlider";
import Modal from "../../../common/modal";
import { X } from "react-feather";
import StripeCard from "../../../common/stripe";
import { toast } from "react-toastify";
import SearchableDropdown from "../helper/searchableDropdown";
import { masterState } from "../../master/master.slice";
import { TrainerDetails } from "../../trainer/trainerDetails";
import { bookingsAction, bookingsState } from "../../common/common.slice";
import { debounce } from "lodash";
import { checkSlotAsync, commonState } from "../../../common/common.slice";
import MultiRangeSlider from "../../../common/timeRangeSlider";
const { isMobileFriendly, isSidebarToggleEnabled } = bookingsAction;

const ScheduleTraining = () => {
  const dispatch = useAppDispatch();
  const { getTraineeSlots, transaction } = useAppSelector(traineeState);
  const { configs } = useAppSelector(bookingsState);
  const { isSlotAvailable } = useAppSelector(commonState);
  const { selectedTrainerId } = useAppSelector(bookingsState);
  const { master } = useAppSelector(masterState);
  const [startDate, setStartDate] = useState(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const [getParams, setParams] = useState(params);
  const [categoryList, setCategoryList] = useState([]);
  const [bookingColumns, setBookingColumns] = useState([]);
  const [listOfTrainers, setListOfTrainers] = useState([]);
  const [bookingTableData, setBookingTableData] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState({ id: null });
  const [query, setQuery] = useState("");
  const [timeRange, setTimeRange] = useState({
    booked_date: "",
    trainer_id: "",
    slotTime: { from: "", to: "" },
  });
  const [isOpenInstantScheduleMeeting, setInstantScheduleMeeting] =
    useState(false);
  const [trainerInfo, setTrainerInfo] = useState({
    userInfo: null,
    selected_category: null,
  });
  const [bookSessionPayload, setBookSessionPayload] = useState({});
  const toggle = () => setInstantScheduleMeeting(!isOpenInstantScheduleMeeting);

  useEffect(() => {
    dispatch(getTraineeWithSlotsAsync(getParams));
  }, [getParams]);

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

  useEffect(() => {
    const { masterData } = master;
    setCategoryList([]);
    if (masterData && masterData.category && masterData.category.length) {
      const payload = masterData.category.map((category) => {
        return { id: category, name: category, isCategory: true };
      });
      setCategoryList(payload);
    }
  }, [master]);

  useEffect(() => {
    if (transaction && transaction.intent && transaction.intent.client_secret) {
      setShowTransactionModal(true);
    }
  }, [transaction]);

  useEffect(() => {
    setTrainerInfo((prev) => ({
      ...prev,
      userInfo: null,
    }));
  }, []);

  useEffect(() => {
    setTrainerInfo((prev) => ({
      ...prev,
      userInfo: undefined,
      selected_category: undefined,
    }));
  }, []);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setTableData = (data = [], selectedDate) => {
    const result = data.map(
      ({
        available_slots,
        category,
        email,
        fullname,
        profilePicture,
        trainer_id,
        extraInfo,
        _id,
      }) => {
        const trainer_info = {
          category,
          email,
          fullname,
          profilePicture,
          trainer_id,
          extraInfo,
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

  const renderSlotsByDay = ({ slot, date, trainer_info }) => {
    console.log(`trainer_info --- `, trainer_info);
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
                      const amountPayable = Utils.getMinutesFromHourMM(
                        content.start_time,
                        content.end_time,
                        trainer_info?.extraInfo?.hourly_rate
                      );
                      if (amountPayable > 0) {
                        const payload = {
                          charging_price: amountPayable,
                          trainer_id: trainer_info.trainer_id,
                          trainer_info,
                          status: BookedSession.booked,
                          booked_date: date,
                          session_start_time: content.start_time,
                          session_end_time: content.end_time,
                        };
                        setBookSessionPayload(payload);
                        dispatch(
                          createPaymentIntentAsync({
                            amount: +amountPayable.toFixed(2),
                          })
                        );
                      } else {
                        toast.error("Invalid slot timing...");
                      }
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

  const renderTable = () => {
    return (
      <div
        className={`${
          trainerInfo.userInfo
            ? "table-responsive-width"
            : "table-responsive-width"
        }`}
      >
        <table
          className={`${
            screenWidth <= 767 ? "table-responsive overflow-x-auto" : "table"
          } custom-trainer-slots-booking-table`}
        >
          <thead
            className="justify-center align-center table-thead"
            style={{
              borderBottom: screenWidth <= 767 ? "1px solid" : null,
            }}
          >
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
                    trainer_info._id === trainerInfo.userInfo?.id ||
                    trainer_info._id === selectedTrainer.id
                  );
                })
                .map(
                  ({ monday, tuesday, wednesday, thursday, friday }, index) => {
                    return (
                      <tr key={`table-data-${index}`}>
                        <td key={index}>
                          {monday.slot.length ? (
                            <div
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                            >
                              {renderSlotsByDay(monday)}
                            </div>
                          ) : (
                            <div
                              key={`slot-${index}-content`}
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                              className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                            >
                              {Message.noSlotsAvailable}
                            </div>
                          )}
                        </td>
                        <td>
                          {tuesday.slot.length ? (
                            <div
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                            >
                              {renderSlotsByDay(tuesday)}
                            </div>
                          ) : (
                            <div
                              key={`slot-${index}-content`}
                              className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                            >
                              {Message.noSlotsAvailable}
                            </div>
                          )}
                        </td>
                        <td>
                          {wednesday.slot.length ? (
                            <div
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                            >
                              {renderSlotsByDay(wednesday)}
                            </div>
                          ) : (
                            <div
                              key={`slot-${index}-content`}
                              className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                            >
                              {Message.noSlotsAvailable}
                            </div>
                          )}
                        </td>
                        <td>
                          {thursday.slot.length ? (
                            <div
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                            >
                              {renderSlotsByDay(thursday)}
                            </div>
                          ) : (
                            <div
                              key={`slot-${index}-content`}
                              className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                            >
                              {Message.noSlotsAvailable}
                            </div>
                          )}
                        </td>
                        <td>
                          {friday.slot.length ? (
                            <div
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
                            >
                              {renderSlotsByDay(friday)}
                            </div>
                          ) : (
                            <div
                              key={`slot-${index}-content`}
                              className="rounded-pill border border-dark text-dark text-center p-1 mb-1 font-weight-bold"
                              style={{
                                width: screenWidth <= 767 ? "50vw" : null,
                              }}
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
  };

  const renderPaymentContent = () => {
    return (
      <div>
        <h3>
          {" "}
          Trainer: {bookSessionPayload.trainer_info.fullname} (Price per hour $
          {bookSessionPayload?.trainer_info?.extraInfo?.hourly_rate ||
            TRAINER_AMOUNT_USD}
          ){" "}
        </h3>
        <h4 className="mt-3 mb-3">
          Booking time: {moment(bookSessionPayload.booked_date).format("ll")} |
          From: {bookSessionPayload.session_start_time} To:{" "}
          {bookSessionPayload.session_end_time}
        </h4>
        <h4 className="mb-3">
          Price: <b>${bookSessionPayload.charging_price}</b>
        </h4>
      </div>
    );
  };

  const renderStripePaymentContent = () =>
    transaction && transaction.intent ? (
      <div>
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
        <div>
          {/* <h5>To book a slot, please pay {TRAINER_AMOUNT_USD}$.</h5> */}
          <div>
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
          </div>
        </div>
      </div>
    ) : (
      <></>
    );

  const renderSearchMenu = () => (
    <div
      onScroll={() => {
        if (configs.sidebar.isMobileMode) {
          dispatch(isSidebarToggleEnabled(true));
        }
        return;
      }}
      className="bookings custom-scroll custom-trainee-dashboard"
    >
      <div
        id="dashboard"
        className="d-flex justify-content-center align-items-center dashboard-search-trainer"
        style={{
          height: "94%",
        }}
      >
        <SearchableDropdown
          placeholder="Search Trainers..."
          options={[...listOfTrainers, ...categoryList]}
          label="name"
          id="id"
          customClasses={{
            searchBar: "search-bar-trainee",
            searchButton: "search-button-trainee",
            dropdown: "custom-dropdown-width",
          }}
          onSearchClick={(query) => {
            if (query) {
              setTrainerInfo((prev) => ({
                ...prev,
                userInfo: null,
                selected_category: query,
              }));
            }
            setQuery(query);
          }}
          searchValue={(value) => {
            setParams({ search: value });
          }}
          selectedOption={(option) => {
            console.log(`option --- `, option);
            if (option && option.isCategory) {
              setTrainerInfo((prev) => ({
                ...prev,
                userInfo: option,
                selected_category: option.name,
              }));
            } else {
              setTrainerInfo((prev) => ({
                ...prev,
                userInfo: option,
                selected_category: null,
              }));
            }
          }}
          handleChange={(value) => {
            setParams({ search: value });
          }}
        />
      </div>
      <div className="trainer-recommended">
        <h2>Recommended</h2>
        <TrainerSlider list={listOfTrainers} />
      </div>
      <div style={{ height: "11vh" }} />
    </div>
  );

  const renderUserDetails = () => {
    return (
      <TrainerDetails
        selectOption={trainerInfo}
        isPopoverOpen={isPopoverOpen}
        categoryList={categoryList}
        key={`trainerDetails`}
        searchQuery={query}
        trainerInfo={trainerInfo.userInfo}
        selectTrainer={(_id) => {
          if (_id) {
            setSelectedTrainer({ ...selectedTrainer, id: _id });
          }
        }}
        onClose={() => {
          setTrainerInfo((prev) => ({
            ...prev,
            userInfo: undefined,
            selected_category: undefined,
          }));
          setParams((prev) => ({
            ...prev,
            search: null,
          }));
        }}
        element={renderBookingTable()}
      />
    );
  };

  const renderCategoryTrainerDetails = () => {
    return <CategoryTrainerDetails />;
  };

  const renderBookingTable = () => {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-6 col-xs-2 col-sm-2 col-md-2 col-xs-2 date-picker mb-3">
              <DatePicker
                className="border border-dark"
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
                customInput={<Input />}
              />
            </div>
            <div className="col-12">
              {(getParams.search && getParams.search.length) ||
              !bookingColumns.length ? (
                <div>
                  <div className="ml-4">
                    <div className="row">
                      <div className="col-8 mt-2 mb-5">
                        {JSON.stringify(trainerInfo.userInfo.trainer_id)}
                        <MultiRangeSlider
                          isSlotAvailable={isSlotAvailable}
                          onChange={(time) => {
                            const { startTime, endTime } = time;
                            setTimeRange({
                              ...timeRange,
                              booked_date: startDate,
                              slotTime: { from: startTime, to: endTime },
                              trainer_id:""
                            });
                          }}
                          startTime={Utils.getTimeFormate(
                            trainerInfo?.userInfo?.extraInfo?.working_hours
                              ?.from || TimeRange.start
                          )}
                          endTime={Utils.getTimeFormate(
                            trainerInfo?.userInfo?.extraInfo?.working_hours
                              ?.to || TimeRange.end
                          )}
                          key={"time-range-slider"}
                        />
                      </div>
                    </div>
                  </div>
                  {renderTable()}
                </div>
              ) : (
                <TrainerSlider list={listOfTrainers} />
              )}
            </div>
          </div>
        </div>
        {/* <div className="row">
        <div className="mt-4 col-1.4 datePicker">
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
        <div className="col-8 pt-3">
          {(getParams.search && getParams.search.length) ||
          !bookingColumns.length ? (
            renderTable()
          ) : (
            <TrainerSlider list={listOfTrainers} />
          )}
        </div>
      </div> */}
        <Modal
          isOpen={showTransactionModal}
          element={renderStripePaymentContent()}
        />
      </React.Fragment>
    );
  };

  return (
    // <div>
    //   {/* <div className="m-25 header">
    //   <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
    //     Book Training Session
    //   </h3>
    // </div>

    // <div
    //   className={`form-inline search-form open mb-5`}
    //   style={{
    //     width: "92vw",
    //     height: "4rem",
    //     marginTop: "60px",
    //     marginLeft: "6rem",
    //   }}
    // >
    //   <div className="form-group">
    //     <input
    //       className="form-control-plaintext"
    //       type="search"
    //       value={getParams.search}
    //       placeholder="Search..."
    //       onChange={(event) => {
    //         const { value } = event.target;
    //         setParams({ search: value });
    //       }}
    //     />
    //   </div>
    //   <div className="mt-3 ml-1 datePicker">
    //     <DatePicker
    //       minDate={moment().toDate()}
    //       onChange={(date) => {
    //         setStartDate(date);
    //         const todaySDate = Utils.getDateInFormat(date.toString());
    //         const { weekDateFormatted, weekDates } =
    //           Utils.getNext7WorkingDays(todaySDate);
    //         setColumns(weekDateFormatted);
    //         setTableData(getTraineeSlots, weekDates);
    //         setColumns(weekDateFormatted);
    //       }}
    //       selected={startDate}
    //       // ref={null}
    //       customInput={<Input />}
    //     />
    //   </div>
    // </div> */}
    //   {/* <div className="pt-5" style={{ marginTop: "7rem" }}>
    //   <div className="ml-4 ">
    //     {(getParams.search && getParams.search.length) ||
    //     !bookingColumns.length ? (
    //       renderTable()
    //     ) : (
    //       <TrainerSlider list={listOfTrainers} />
    //     )}
    //   </div>
    // </div> */}
    //   {/* <Modal isOpen={showTransactionModal} element={renderStripePaymentContent()} /> */}
    //   {/* {renderSearchMenu()}
    // <div className="trainer-slider p02">
    //   <h2>Available Trainers...</h2>
    //   <TrainerSlider list={listOfTrainers} />
    // </div> */}
    //   {trainerInfo && trainerInfo.userInfo ? (
    //     renderUserDetails()
    //   ) : (
    //     <div>
    //       {renderSearchMenu()}
    //       <div className="trainer-slider p02">
    //         <h2>Recommended</h2>
    //         <TrainerSlider list={listOfTrainers} />
    //       </div>
    //     </div>
    //   )}
    // </div>
    <React.Fragment>
      {trainerInfo.userInfo === null ||
      (trainerInfo && trainerInfo.userInfo) ? (
        <div className="custom-scroll">{renderUserDetails()}</div>
      ) : (
        <div className="custom-scroll trainee-dashboard">
          {renderSearchMenu()}
        </div>
      )}
    </React.Fragment>
  );
};

export default ScheduleTraining;
