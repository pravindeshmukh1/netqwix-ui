import { Regex } from "../pages/common/constants";

export class Utils {
  static isEmailValid = (email) => {
    return email.match(Regex.email);
  };
}
