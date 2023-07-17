import { Regex, timeFormat } from "../app/common/constants";
import { LOCAL_STORAGE_KEYS } from "../app/common/constants";
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
}
