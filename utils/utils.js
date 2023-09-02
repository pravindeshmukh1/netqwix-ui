import {
  LOCAL_STORAGE_KEYS,
  Regex,
  weekDays,
  timeFormat,
  TRAINER_AMOUNT_USD,
  FormateDate,
  FormateHours,
  meetingRatingTimeout,
} from "../app/common/constants";
import moment from "moment";

export class Utils {
  static isEmailValid = (email) => {
    return email.match(Regex.email);
  };

  static getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  };

  static getFormattedTime = (time) => {
    return moment(time, timeFormat);
  };

  static getFormattedDateDb = (value) => {
    return moment(value.format("h:mm A"), "'hh:mm A'").format("HH:mm:ss");
  };

  static formateDate = (value) => {
    const date = moment(value);
    const startDate = date.startOf("week").format("MMM D");
    const endDate = date.endOf("week").format("D,YYYY");
    const formattedDateRange = `${startDate}-${endDate}`;
    return formattedDateRange;
  };

  static getCurrentWeekByDate(date) {
    // Copy the input date to avoid modifying it
    const currentDate = new Date(date);

    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = currentDate.getDay();

    // Calculate the start date (Sunday) of the current week
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDayOfWeek);

    // Create an array to store the dates of the current week
    const weekDateFormatted = [];
    const weekDates = [];

    // Iterate from Sunday to Saturday and add each date to the array
    for (let i = 1; i < 6; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDateFormatted.push(
        `${weekDays[i - 1]} ${date.getMonth() + 1}` + "/" + `${date.getDate()}`
      );
    }

    for (let i = 1; i < 6; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push(date);
    }

    const result = this.getNext7WorkingDays(date);
    console.log(`before --- `, { weekDates, weekDateFormatted });
    return { weekDates, weekDateFormatted };
  }

  static getNext7WorkingDays(date) {
    console.log(`date --- `, date);
    const today = new Date(date);
    const weekDates = [];
    const weekDateFormatted = [];
    if (weekDays[today.getDay() - 1]) {
      weekDateFormatted.push(
        `${weekDays[today.getDay() - 1]} ${
          today.getMonth() + 1
        }/${today.getDate()}`
      );
      // weekDates.push(today);
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate());
      weekDates.push(currentDate);
    }
    while (weekDateFormatted.length < 5) {
      today.setDate(today.getDate() + 1); // Move to the next day

      const dayOfWeek = weekDays[today.getDay() - 1];

      if (dayOfWeek) {
        // Exclude weekends
        const formattedDate = `${dayOfWeek} ${
          today.getMonth() + 1
        }/${today.getDate()}`;
        weekDateFormatted.push(formattedDate);
        // weekDates.push(today);
        const date = new Date(today);
        date.setDate(today.getDate());
        weekDates.push(date);
      }
    }
    console.log(`after ---- `, weekDates, weekDateFormatted);

    return { weekDates, weekDateFormatted };
  }

  static getDateInFormat = (date = "") => {
    const newDate = date && date.length ? date : new Date();
    return moment(newDate).format("YYYY-MM-DD");
  };

  static convertToAmPm = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let formattedHours = parseInt(hours, 10);

    const period = formattedHours >= 12 ? "PM" : "AM";

    if (formattedHours > 12) {
      formattedHours -= 12;
    }

    return `${formattedHours.toString().padStart(2, "0")}:${minutes} ${period}`;
  };

  static capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  static getMinutesFromHourMM = (
    startTime,
    endTime,
    chargingRate = TRAINER_AMOUNT_USD
  ) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
    const finalPrice = (totalMinutes / 60) * chargingRate;

    return finalPrice;
  };

  static checkTimeConflicts = (values) => {
    let isTimeConflicts = false;
    // TODO: will remove when validation needs to do
    // for (const dayData of values) {
    //   for (const slot of dayData.slots) {
    //     const { start_time, end_time } = slot;
    //     if (start_time && end_time) {
    //       if (end_time >= start_time) {
    //         isTimeConflicts = false;
    //       } else {
    //         isTimeConflicts = true;
    //       }
    //     }
    //   }
    // }
    return isTimeConflicts;
  };

  static has24HoursPassed = (scheduledMeetingDetails) => {
    const has24HoursPassed = scheduledMeetingDetails.map((booking) => {
      const { booked_date, session_end_time } = booking;
      const currentDate = moment().format(FormateDate.YYYY_MM_DD);
      const currentTime = moment().format(FormateHours.HH_MM);
      const currentFormattedTime = this.convertToAmPm(currentTime);
      const bookedDate = this.getDateInFormat(booked_date);
      const sessionEndTime = this.convertToAmPm(session_end_time);
      const bookingDateTime = moment(
        `${bookedDate} ${sessionEndTime}`,
        `${FormateDate.YYYY_MM_DD} ${FormateHours.HH_MM}`
      );
      const currentDateTime = moment(
        `${currentDate} ${currentFormattedTime}`,
        `${FormateDate.YYYY_MM_DD} ${FormateHours.HH_MM}`
      );
      const hoursDifference = currentDateTime.diff(bookingDateTime, "hours");
      const hasPassed = hoursDifference >= 24;
      return hasPassed;
    });
    return has24HoursPassed;
  };

  static checkMeetingAvailability = (scheduledMeetingDetails) => {
    const currentTime = moment().format(FormateHours.HH_MM);
    const currentFormattedTime = this.convertToAmPm(currentTime);
    const availabilityStatus = scheduledMeetingDetails.map((booking) => {
      const { booked_date, session_start_time, session_end_time } = booking;
      const currentFormattedSessionStartTime =
        this.convertToAmPm(session_start_time);
      const currentFormattedSessionEndTime =
        this.convertToAmPm(session_end_time);
      const currentDate = moment().format(FormateDate.YYYY_MM_DD);
      const bookedDate = this.getDateInFormat(booked_date);
      if (currentDate === bookedDate) {
        if (
          currentFormattedTime >= currentFormattedSessionStartTime &&
          currentFormattedTime <= currentFormattedSessionEndTime
        ) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    });
    return availabilityStatus;
  };

  static truncateText(aboutText, maxLength) {
    if (aboutText && aboutText.length > maxLength) {
      return aboutText.slice(0, maxLength) + "…";
    } else {
      return aboutText;
    }
  }

  static getRatings = (ratings) => {
    let availableRatings = { totalRating: ratings.length, ratingRatio: 0 };
    let totalRatings = 0;
    ratings.forEach(({ ratings }) => {
      if (ratings && ratings.trainee) {
        totalRatings += ratings?.trainee?.sessionRating || 0;
      }
    });

    availableRatings.ratingRatio = (totalRatings / ratings.length).toFixed(1);
    return availableRatings;
  };

  static removeApiEndpoint = (url) => {
    const originalUrl = url.replace(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
      ""
    );
    return originalUrl;
  };

  static imagePreview = (url) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`;
  };
}
