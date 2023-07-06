import { Regex } from "../app/common/constants";

export class Utils {
  static isEmailValid = (email) => {
    return email.match(Regex.email);
  };
}
