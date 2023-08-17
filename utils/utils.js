import {
  LOCAL_STORAGE_KEYS,
  Regex,
  weekDays,
  timeFormat,
  TRAINER_AMOUNT_USD,
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

  static getMinutesFromHourMM =(startTime, endTime, chargingRate = TRAINER_AMOUNT_USD) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
    const finalPrice = (totalMinutes / 60) * chargingRate;
  
    return finalPrice;
  }
}
