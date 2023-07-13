import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export const DatePicker = ({ onChange, value }) => {
  return <Calendar onChange={onChange} value={value} />;
};
