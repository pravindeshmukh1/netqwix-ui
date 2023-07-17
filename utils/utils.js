import { Regex } from "../app/common/constants";
import moment from "moment";
export class Utils {
  static isEmailValid = (email) => {
    return email.match(Regex.email);
  };
  static formateDate = (value) => {
    const date = moment(value);
    const startDate = date.startOf("week").format("MMM D");
    const endDate = date.endOf("week").format("D,YYYY");
    const formattedDateRange = `${startDate}-${endDate}`;
    return formattedDateRange;
  };
}
