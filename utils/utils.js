import {
  LOCAL_STORAGE_KEYS,
  Regex,
  weekDays,
  timeFormat,
  TRAINER_AMOUNT_USD,
  FormateDate,
  FormateHours,
  meetingRatingTimeout,
  MAX_FILE_SIZE_MB,
  allowedExtensions,
  minimumMeetingDurationInMin,
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
    if (time) {
      return moment(time, timeFormat);
    }
  };


  static getFormattedDateDb = (value) => {
    return moment(value.format("h:mm A"), "'hh:mm A'").format("HH:mm:ss");
  };

  static formateDate = (value) => {
    const date = moment(value);
    const formattedDate = date.format("dddd DD-MM-YYYY");
    return formattedDate;
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
    return {
      weekDates,
      weekDateFormatted,
    };
  }

  static getNext7WorkingDays(date) {
    const today = new Date(date);
    const weekDates = [];
    const weekDateFormatted = [];
    if (weekDays[today.getDay() - 1]) {
      weekDateFormatted.push(
        `${weekDays[today.getDay() - 1]} ${today.getMonth() + 1
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
        const formattedDate = `${dayOfWeek} ${today.getMonth() + 1
          }/${today.getDate()}`;
        weekDateFormatted.push(formattedDate);
        // weekDates.push(today);
        const date = new Date(today);
        date.setDate(today.getDate());
        weekDates.push(date);
      }
    }

    return {
      weekDates,
      weekDateFormatted,
    };
  }

  static getDateInFormat = (date = "") => {
    const newDate = date ? date : new Date();
    return moment(newDate).format("YYYY-MM-DD");
  };

  static convertDate = (inputDate) => {
    const parsedDate = moment(inputDate);
    const outputFormat = "DD-MMM-YYYY";
    return parsedDate.format(outputFormat);
  };

  static convertToAmPm = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let formattedHours = parseInt(hours, 10);
    let period = "AM";

    if (formattedHours === 0) {
      formattedHours = 12; // Set to 12 for midnight
    } else if (formattedHours >= 12) {
      period = "PM";
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    }

    return `${formattedHours.toString().padStart(1, "0")}:${minutes} ${period}`;
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

    return +finalPrice.toFixed(2);
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

  static isCurrentDateBefore = (dateToCompare) => {
    const currentDate = moment();
    const dateToCompareMoment = moment(dateToCompare);
    return currentDate.isBefore(dateToCompareMoment);
  };

  static isStartButtonEnabled = (
    bookedDate,
    currentDate,
    currentFormattedTime,
    sessionStartTime,
    sessionEndTime
  ) => {
    return (
      currentDate === bookedDate &&
      Date.parse(`01/01/2023 ${currentFormattedTime}`) >= Date.parse(`01/01/2023 ${sessionStartTime}`) &&
      Date.parse(`01/01/2023 ${currentFormattedTime}`) <= Date.parse(`01/01/2023 ${sessionEndTime}`)
    );
  };

  static isUpcomingSession = (bookedDate, sessionStartTime, sessionEndTime) => {
    const currentDate = moment();
    const bookedDateMoment = moment(bookedDate);
    const sessionStartTimeMoment = moment(sessionStartTime, "h:mm A");
    return (
      bookedDateMoment.isSame(currentDate, "day") &&
      currentDate.isBefore(sessionStartTimeMoment)
    );
  };

  static has24HoursPassedSinceBooking = (
    bookedDate,
    currentDate,
    currentFormattedTime,
    sessionEndTime
  ) => {
    const { YYYY_MM_DD } = FormateDate;
    const { HH_MM } = FormateHours;
    const bookingEndTime = moment(
      `${bookedDate} ${sessionEndTime}`,
      `${YYYY_MM_DD} ${HH_MM}`
    );
    const currentDateTime = moment(
      `${currentDate} ${currentFormattedTime}`,
      `${YYYY_MM_DD} ${HH_MM}`
    );
    const hoursElapsed = currentDateTime.diff(bookingEndTime, "hours");
    const hasPassed = hoursElapsed >= 24;
    return hasPassed;
  };

  static meetingAvailability = (
    booked_date,
    session_start_time,
    session_end_time
  ) => {
    const bookedDate = this.getDateInFormat(booked_date);
    const sessionStartTime = this.convertToAmPm(session_start_time);
    const sessionEndTime = this.convertToAmPm(session_end_time);
    const currentDate = moment().format(FormateDate.YYYY_MM_DD);
    const currentTime = moment().format(FormateHours.HH_MM);
    const currentFormattedTime = this.convertToAmPm(currentTime);
    const isCurrentDateBefore = this.isCurrentDateBefore(bookedDate);
    const isStartButtonEnabled = this.isStartButtonEnabled(
      bookedDate,
      currentDate,
      currentFormattedTime,
      sessionStartTime,
      sessionEndTime
    );
    const has24HoursPassedSinceBooking = this.has24HoursPassedSinceBooking(
      bookedDate,
      currentDate,
      currentFormattedTime,
      sessionEndTime
    );
    const isUpcomingSession = this.isUpcomingSession(
      bookedDate,
      sessionStartTime,
      sessionEndTime
    );
    return {
      isStartButtonEnabled,
      has24HoursPassedSinceBooking,
      isCurrentDateBefore,
      isUpcomingSession,
    };
  };

  static truncateText(aboutText, maxLength) {
    if (aboutText && aboutText.length > maxLength) {
      return aboutText.slice(0, maxLength) + "…";
    } else {
      return aboutText;
    }
  }

  static getRatings = (ratings) => {
    const validRatings = ratings?.filter(
      (rating) =>
        rating &&
        rating.ratings &&
        rating.ratings.trainee &&
        rating.ratings.trainee.recommendRating
    );

    if (validRatings && validRatings.length) {
      let avgRatingNumber = 0;
      const ratingCount = validRatings.length || 0;

      validRatings.forEach((rating) => {
        avgRatingNumber += rating.ratings.trainee.recommendRating;
      });
      return {
        ratingRatio: (avgRatingNumber / ratingCount).toFixed(2) || 0,
        totalRating: ratingCount,
      };
    } else {
      return {
        ratingRatio: 0,
        totalRating: 0,
      };
    }
  };

  static fileSizeLessthan2Mb = (file) => {
    const fileSizeInBytes = file.size;
    const maxSizeInBytes = MAX_FILE_SIZE_MB * 1024 * 1024; // Convert MB to bytes
    return fileSizeInBytes <= maxSizeInBytes;
  };

  static isValidSelectedFileType = (file) => {
    return allowedExtensions.includes(file.type);
  };

  static isValidSelectedPNG = (file) => {
    return allowedExtensions.includes(file.type);
  };

  static disabledWeekendAndPastDates = (current) => {
    return (
      current < Date.now() ||
      new Date(current).getDay() === 0 ||
      new Date(current).getDay() === 6
    );
  };
  static getTimeFormate = (time) => {
    if (typeof time === "string") {
      return time.replace(":00", "");
    }
    return "";
  };

  static convertMinutesToHour(minutes) {
    const hours = Math.floor(minutes / 60);
    const minutesPart = minutes % 60;
    const formattedHour = `${hours.toString().padStart(2, "0")}:${minutesPart
      .toString()
      .padStart(2, "0")}`;
    return formattedHour;
  }
  static convertHoursToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  };

  static isTimeRangeAvailable = (timeRanges, start_time, end_time, originalDate = null, rangeBarBtn = false) => {


    if (rangeBarBtn) {
      // let date = new Date().toISOString().split("T")[0];
      // let dateArr = date?.split("-");
      // let status = true;
      // if (timeRanges?.length) {
      //   let start_time_date = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), Number(start_time.split(":")[0]), Number(start_time.split(":")[1]), 0, 0)
      //   let end_time_date = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), Number(end_time.split(":")[0]), Number(end_time.split(":")[1]), 0, 0)

      //   const filteredData = timeRanges.find(item => {
      //     return (new Date(item.start_time) <= start_time_date && start_time_date >= new Date(item?.end_time)) &&
      //       (new Date(item.start_time) <= end_time_date && end_time_date >= new Date(item?.end_time))
      //   });

      //   console.log("filteredData", start_time, end_time);

      //   if (filteredData?.start_time) status = false

      //   return status

      let status = false;

      const selectedStartTime = moment(originalDate)?.set({
        hour: parseInt(start_time?.split(':')[0]),
        minute: parseInt(start_time?.split(':')[1]),
        second: 0, // Optional, depending on your requirements
        millisecond: 0 // Optional, depending on your requirements
      });
      const selectedEndTime = moment(originalDate)?.set({
        hour: parseInt(end_time?.split(':')[0]),
        minute: parseInt(end_time?.split(':')[1]),
        second: 0, // Optional, depending on your requirements
        millisecond: 0 // Optional, depending on your requirements
      });
      // Check for overlap
      for (const session of timeRanges) {
        const sessionStartTime = moment(session.start_time);
        const sessionEndTime = moment(session.end_time);

        if (
          selectedStartTime?.isBetween(
            sessionStartTime,
            sessionEndTime,
            null,
            "[]"
          ) ||
          selectedEndTime?.isBetween(
            sessionStartTime,
            sessionEndTime,
            null,
            "[]"
          ) ||
          (selectedStartTime?.isSameOrBefore(sessionStartTime) && selectedEndTime?.isSameOrAfter(sessionEndTime))
        ) {
          if (selectedStartTime?.isSame(sessionEndTime) || selectedEndTime?.isSame(sessionStartTime)) {
          } else {
            status = true;
            break; // Exit the loop if overlap is detected
          }
        }
      }
      if (status) {
        console.log("error not booked you")
      }
      else {
        console.log("booking succeusjfuly")
      }
      return status;


    } else {
      for (const range of timeRanges) {
        const rangeStartTime = new Date(`2000-01-01T${range.start_time}:00`);
        const rangeEndTime = new Date(`2000-01-01T${range.end_time}:00`);
        const inputStartTime = new Date(`2000-01-01T${start_time}:00`);
        const inputEndTime = new Date(`2000-01-01T${end_time}:00`);

        // Check if the input start time is within the range
        if (inputStartTime >= rangeStartTime && inputStartTime < rangeEndTime) {
          return false; // Time conflict
        }

        // Check if the input end time is within the range
        if (inputEndTime > rangeStartTime && inputEndTime <= rangeEndTime) {
          return false; // Time conflict
        }

        if (inputStartTime < rangeEndTime && inputEndTime > rangeStartTime) {
          return false; // Time conflict
        }
      }

      return true; // No time conflict
    }






    // var start_time_date = new Date();
    // start_time_date.setHours(Number(start_time.split(":")[0]));
    // start_time_date.setMinutes(Number(start_time.split(":")[1]));
    // start_time_date = start_time_date?.getTime()

    // var end_time_date = new Date();
    // end_time_date.setHours(Number(end_time.split(":")[0]));
    // end_time_date.setMinutes(Number(end_time.split(":")[1]));
    // end_time_date = end_time_date?.getTime()

  };

  static getMinutesFromTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  static getMinutesFromISOString(isoTimeString) {
    const isoTime = new Date(isoTimeString);
    return isoTime.getHours() * 60 + isoTime.getMinutes();
  }

  static getPercentageForSlot = (startTime, endTime, fromTime, toTime) => {
    // const [startHour, startMinute] = startTime.split(":").map(Number);
    // const [endHour, endMinute] = endTime.split(":").map(Number);
    // const startTimeInMinutes = startHour * 60 + startMinute;
    // const endTimeInMinutes = endHour * 60 + endMinute;

    // const [rangeStartHour, rangeStartMinute] = fromTime.split(":").map(Number);
    // const [rangeEndHour, rangeEndMinute] = toTime.split(":").map(Number);
    // const rangeStartInMinutes = rangeStartHour * 60 + rangeStartMinute;
    // const rangeEndInMinutes = rangeEndHour * 60 + rangeEndMinute;

    // // Calculate the duration in minutes
    // const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
    // const startPos =
    //   ((startTimeInMinutes - rangeStartInMinutes) /
    //     (rangeEndInMinutes - rangeStartInMinutes)) *
    //   100;
    // const endPos =
    //   ((endTimeInMinutes - rangeStartInMinutes) /
    //     (rangeEndInMinutes - rangeStartInMinutes)) *
    //   100;
    // const v2 =
    //   ((endTimeInMinutes - rangeStartInMinutes) /
    //     (rangeEndInMinutes - rangeStartInMinutes)) *
    //   100 +
    //   ((startTimeInMinutes - rangeStartInMinutes) /
    //     (rangeEndInMinutes - rangeStartInMinutes)) *
    //   100;

    // // Calculate the percentage
    // const percentage =
    //   (durationInMinutes / (rangeEndInMinutes - rangeStartInMinutes)) * 100;
    // return {
    //   startPos,
    //   endPos,
    //   percentage,
    // };
    const start = new Date(startTime);
    const end = new Date(endTime);
    const totalRange = 24 * 60; // Total minutes in a 24-hour range

    const startPos = (start.getHours() * 60 + start.getMinutes()) / totalRange * 100;
    const endPos = (end.getHours() * 60 + end.getMinutes()) / totalRange * 100;

    return { startPos, endPos };
  };

  static isValidTimeDuration = (fromTime, toTime, minTimeRequired) => {
    const [rangeStartHour, rangeStartMinute] = fromTime.split(":").map(Number);
    const [rangeEndHour, rangeEndMinute] = toTime.split(":").map(Number);
    const rangeStartInMinutes = rangeStartHour * 60 + rangeStartMinute;
    const rangeEndInMinutes = rangeEndHour * 60 + rangeEndMinute;
    return rangeEndInMinutes - rangeStartInMinutes > minTimeRequired;
  };

  static hasTimeConflicts = (start_time, end_time) => {
    const parseTime = (time) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 60 + minutes + seconds / 60;
    };
    const startTimeInMinutes = parseTime(start_time);
    const endTimeInMinutes = parseTime(end_time);
    if (startTimeInMinutes >= endTimeInMinutes) {
      return true;
    }
    if (endTimeInMinutes <= startTimeInMinutes) {
      return true;
    }
    return false;
  };

  static isInRange = (targetDate, startTime, endTime) => {
    const formateDate = moment(targetDate).format(FormateDate.YYYY_MM_DD);
    const currentTime = moment();
    const targetDateTime = moment(
      `${formateDate} ${startTime}`,
      "YYYY-MM-DD HH:mm"
    );
    const endDateTime = moment(`${formateDate} ${endTime}`, "YYYY-MM-DD HH:mm");

    return (
      currentTime.isBetween(targetDateTime, endDateTime, null, "[]") ||
      currentTime.isSameOrAfter(endDateTime) // Check if current time is after the end time
    );
  };


  static dynamicImageURL = (url) => {
    let updatedURL = url?.toString()?.split("public")[1]
    if (updatedURL === undefined) {
      return url
    }
    updatedURL = process?.env?.NEXT_PUBLIC_API_BASE_URL + "/public" + url?.toString()?.split("public")[1]
    return updatedURL
  }
}
