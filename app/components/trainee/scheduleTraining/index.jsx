import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../scheduleTraining/index.css";
import { Popover } from "react-tiny-popover";
import {
  BookedSession,
  Message,
  TRAINER_AMOUNT_USD,
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
import { createPaymentIntent } from "../trainee.api";
import { toast } from "react-toastify";
import SearchableDropdown from "../helper/searchableDropdown";
import { masterState } from "../../master/master.slice";
import TrainerDetails from "../../trainer/trainerDetails";

const ScheduleTraining = () => {
  const dispatch = useAppDispatch();
  const { getTraineeSlots, transaction } = useAppSelector(traineeState);
  const { master } = useAppSelector(masterState);
  const [startDate, setStartDate] = useState(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const [getParams, setParams] = useState(params);
  const [categoryList, setCategoryList] = useState([]);
  const [bookingColumns, setBookingColumns] = useState([]);
  const [listOfTrainers, setListOfTrainers] = useState([]);
  const [bookingTableData, setBookingTableData] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [isOpenInstantScheduleMeeting, setInstantScheduleMeeting] =
    useState(false);
  const [trainerInfo, setTrainerInfo] = useState({
    userInfo: null,
  });
  const [bookSessionPayload, setBookSessionPayload] = useState({});
  const toggle = () => setInstantScheduleMeeting(!isOpenInstantScheduleMeeting);

  useEffect(() => {
    dispatch(getTraineeWithSlotsAsync(getParams));
  }, [getParams]);

  useEffect(() => {
    const todaySDate = Utils.getDateInFormat(new Date());
    const { weekDates, weekDateFormatted } =
      Utils.getCurrentWeekByDate(todaySDate);
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
      title: "Available Trainers",
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
    <div>
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
    </div>
  );

  const renderSlotsByDay = ({ slot, date, trainer_info }) => {
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
                        content.end_time
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
                          createPaymentIntentAsync({ amount: amountPayable })
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
          className="rounded-pill bg-primary text-white text-center p-1 mb-1 pointer"
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
        trainerInfo.userInfo ? "table-responsive-width" : "table-responsive"
      }`}
    >
      <table className="table rc-table ml-30 mr-30">
        <thead className="justify-center align-center">
          <tr>
            {bookingColumns.map((columns, index) => {
              return (
                <th scope="col" key={`booking-col-${index}`}>
                  {columns.title}
                </th>
              );
            })}
          </tr>
        </thead>
        {bookingTableData && bookingTableData.length ? (
          bookingTableData
            .filter(({ trainer_info }) => {
              return trainer_info._id === trainerInfo.userInfo.id;
            })
            .map(
              (
                { trainer_info, monday, tuesday, wednesday, thursday, friday },
                index
              ) => {
                return (
                  <tr key={`table-data-${index}`}>
                    <td key={index}>
                      <div
                        className="text-center"
                        onClick={() => {
                          // setIsPopoverOpen(trainer_info.fullname)
                        }}
                      >
                        <img
                          height={100}
                          width={100}
                          src={trainer_info.profilePicture}
                          className="rounded"
                        />
                        <p
                          htmlFor="exampleFormControlInput1"
                          className="form-label mt-2"
                        >
                          {trainer_info.fullname}
                        </p>
                      </div>
                    </td>
                    <td>{renderSlotsByDay(monday)}</td>
                    <td>{renderSlotsByDay(tuesday)}</td>
                    <td>{renderSlotsByDay(wednesday)}</td>
                    <td>{renderSlotsByDay(thursday)}</td>
                    <td>{renderSlotsByDay(friday)}</td>
                  </tr>
                );
              }
            )
        ) : (
          <tr key={"no-data"} className="no-data">
            <td colSpan="6">No trainers available.</td>
          </tr>
        )}
      </table>
    </div>
  );

  const renderPaymentContent = () => {
    return (
      <div>
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
    <div className="custom-search-menu">
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
        selectedVal={getParams.search}
        selectedOption={(option) => {
          // WIP: for category selection
          if (option.isCategory) {
            toast.warning(Message.info.categoryWip);
          } else {
            // showing trainer info
            setTrainerInfo((prev) => ({
              ...prev,
              userInfo: option,
            }));
          }
        }}
        handleChange={(value) => {
          setParams({ search: value });
        }}
      />
    </div>
  );

  const renderUserDetails = () => {
    return (
      <TrainerDetails
        isPopoverOpen={isPopoverOpen}
        key={`trainerDetails`}
        trainerInfo={trainerInfo.userInfo}
        onClose={() => {
          setTrainerInfo((prev) => ({
            ...prev,
            userInfo: null,
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

  const renderBookingTable = () => (
    <div className="row">
      <div className="col-sm-3">
        <div className="mt-3 datePicker ">
          <DatePicker
            minDate={moment().toDate()}
            onChange={(date) => {
              setStartDate(date);
              const todaySDate = Utils.getDateInFormat(date.toString());
              const { weekDateFormatted, weekDates } =
                Utils.getCurrentWeekByDate(todaySDate);
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
      <div className="col-sm-14 mb-5 ml-4">
        <div className="pt-3">
          {(getParams.search && getParams.search.length) ||
          !bookingColumns.length ? (
            renderTable()
          ) : (
            <TrainerSlider list={listOfTrainers} />
          )}
        </div>
        <Modal
          isOpen={showTransactionModal}
          element={renderStripePaymentContent()}
        />
      </div>
    </div>
  );

  return (
    <>
      <div>
        {/* <div className="m-25 header">
      <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
        Book Training Session
      </h3>
    </div>

    <div
      className={`form-inline search-form open mb-5`}
      style={{
        width: "92vw",
        height: "4rem",
        marginTop: "60px",
        marginLeft: "6rem",
      }}
    >
      <div className="form-group">
        <input
          className="form-control-plaintext"
          type="search"
          value={getParams.search}
          placeholder="Search..."
          onChange={(event) => {
            const { value } = event.target;
            setParams({ search: value });
          }}
        />
      </div>
      <div className="mt-3 ml-1 datePicker">
        <DatePicker
          minDate={moment().toDate()}
          onChange={(date) => {
            setStartDate(date);
            const todaySDate = Utils.getDateInFormat(date.toString());
            const { weekDateFormatted, weekDates } =
              Utils.getCurrentWeekByDate(todaySDate);
            setColumns(weekDateFormatted);
            setTableData(getTraineeSlots, weekDates);
            setColumns(weekDateFormatted);
          }}
          selected={startDate}
          // ref={null}
          customInput={<Input />}
        />
      </div>
    </div> */}
        {/* <div className="pt-5" style={{ marginTop: "7rem" }}>
      <div className="ml-4 ">
        {(getParams.search && getParams.search.length) ||
        !bookingColumns.length ? (
          renderTable()
        ) : (
          <TrainerSlider list={listOfTrainers} />
        )}
      </div>
    </div> */}
        {/* <Modal isOpen={showTransactionModal} element={renderStripePaymentContent()} /> */}
        {/* {renderSearchMenu()}
    <div className="trainer-slider p02">
      <h2>Available Trainers...</h2>
      <TrainerSlider list={listOfTrainers} />
    </div> */}

        {trainerInfo && trainerInfo.userInfo ? (
          renderUserDetails()
        ) : (
          <>
            <div>{renderSearchMenu()}</div>
            <div className="trainer-slider p02">
              <h2>Available Trainers...</h2>
              <TrainerSlider list={listOfTrainers} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ScheduleTraining;
