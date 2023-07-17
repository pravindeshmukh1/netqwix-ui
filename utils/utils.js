import {Regex, weekDays} from '../app/common/constants';
import moment from 'moment';
export class Utils {
  static isEmailValid = email => {
    return email.match (Regex.email);
  };
  static formateDate = value => {
    const date = moment (value);
    const startDate = date.startOf ('week').format ('MMM D');
    const endDate = date.endOf ('week').format ('D,YYYY');
    const formattedDateRange = `${startDate}-${endDate}`;
    return formattedDateRange;
  };

  static getCurrentWeekByDate (date) {
    // Copy the input date to avoid modifying it
    const currentDate = new Date (date);

    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = currentDate.getDay ();

    // Calculate the start date (Sunday) of the current week
    const startDate = new Date (currentDate);
    startDate.setDate (currentDate.getDate () - currentDayOfWeek);

    // Create an array to store the dates of the current week
    const weekDateFormatted = [];
    const weekDates = [];

    // Iterate from Sunday to Saturday and add each date to the array
    for (let i = 1; i < 6; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDateFormatted.push(`${weekDays[i - 1]} ${date.getMonth() + 1}`+'/'+`${date.getDate()}`);
    }

    for (let i = 1; i < 6; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push(date);
    }

    return {weekDates, weekDateFormatted};
  }

  static getDateInFormat = (date = '') => {
    const newDate = date && date.length ? date  : new Date();
    return moment(newDate).format('YYYY-MM-DD');
  }

}
