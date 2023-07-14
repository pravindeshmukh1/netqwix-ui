export const signUpSteps = [{ title: "Basic Info" }, { title: "Details" }];
export const LIST_OF_ACCOUNT_TYPE = [
  {
    id: 1,
    label: "Trainee",
    value: 1,
  },
  {
    id: 2,
    label: "Trainer",
    value: 2,
  },
];

export const Errors = {
  signUp: {
    basicInfo: "All fields are mandatory",
    detailsTab: "Please select one account type",
    detailsTabCategory: "Please select category for trainer",
  },
  invalidEmail: "Please enter valid email",
};

export const SuccessMsgs = {
  signUp: {
    success: "You have successfully signed up",
  },
};

export const Regex = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
};

export const googleOAuthLink =
  "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "token",
  ACC_TYPE: "acc_type",
};

export const AccountType = {
  TRAINER: "Trainer",
  TRAINEE: "Trainee",
};
export const bookTrainingSessionTableHeadingMockData = [
  {
    title: "Available Trainers",
    dataIndex: "Available Trainers",
    key: "Available Trainers",
    width: 70,
    render() {
      return (
        <div>
          <img
            src={"http://staging.aitacs.com:5000/uploadedFile/default.jpg"}
            className="rounded ml-4"
          />
          <p
            for="exampleFormControlInput1"
            className="form-label mt-2 fs-2 fw-bold ml-4"
          >
            Phil Auerbach
          </p>
        </div>
      );
    },
  },
  {
    title: "Mon 7/10",
    dataIndex: "Mon 7/10",
    key: "Mon 7/10",
    width: 100,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center text-center">
          7:00am-9:30am
        </div>
      );
    },
  },
  {
    title: "Tue 7/11",
    dataIndex: "Tue 7/11",
    key: "Tue 7/11",
    width: 100,
    render() {
      return (
        <div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            9:00am-11:30am
          </div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            1:00pm-3:30pm
          </div>
        </div>
      );
    },
  },
  {
    title: "Wed 7/12",
    dataIndex: "Wed 7/12",
    key: "Wed 7/12",
    width: 100,
    render() {
      return (
        <div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            5:00pm-7:30pm
          </div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            3:00pm-5:30pm
          </div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            8:00am-9:30pm
          </div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            2:00pm-6:30pm
          </div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            10:00am-11:30am
          </div>
        </div>
      );
    },
  },
  {
    title: "Thu 7/13",
    dataIndex: "Thu 7/13",
    key: "Thu 7/13",
    width: 100,
    render() {
      return (
        <div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            1:00am-11:30am
          </div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            1:00am-11:30am
          </div>
        </div>
      );
    },
  },
  {
    title: "Fri 7/14",
    dataIndex: "Fri 7/14",
    key: "Fri 7/14",
    width: 100,
    render() {
      return (
        <>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            1:00am-11:30am
          </div>
          <div className="rounded-pill bg-primary text-white text-center mb-1">
            1:00am-11:30am
          </div>
        </>
      );
    },
  },
];
export const bookTrainingSessionDayTableHeadingMockData = [
  {
    title: "Available Trainers",
    dataIndex: "Available Trainers",
    key: "Available Trainers",
    width: 100,
    render() {
      return (
        <div>
          <img
            src={"http://staging.aitacs.com:5000/uploadedFile/default.jpg"}
            className="rounded ml-4"
          />
          <p
            for="exampleFormControlInput1"
            className="form-label mt-2 fs-2 fw-bold ml-4"
          >
            Phil Auerbach
          </p>
        </div>
      );
    },
  },
  {
    title: "8am",
    dataIndex: "8am",
    key: "8am",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          8:00am-8:30am
        </div>
      );
    },
  },
  {
    title: "9am",
    dataIndex: "9am",
    key: "9am",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          9:00am-9:30am
        </div>
      );
    },
  },
  {
    title: "10am",
    dataIndex: "10am",
    key: "10am",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          10:00am-10:30am
        </div>
      );
    },
  },
  {
    title: "11am",
    dataIndex: "11am",
    key: "11am",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          11:00am-11:30am
        </div>
      );
    },
  },
  {
    title: "12pm",
    dataIndex: "12pm",
    key: "12pm",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          12:00pm-12:30pm
        </div>
      );
    },
  },
  {
    title: "1pm",
    dataIndex: "1pm",
    key: "1pm",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          1:00pm-1:30pm
        </div>
      );
    },
  },
  {
    title: "2pm",
    dataIndex: "2pm",
    key: "2pm",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          2:00pm-2:30pm
        </div>
      );
    },
  },
  {
    title: "3pm",
    dataIndex: "3pm",
    key: "3pm",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          3:00pm-3:30pm
        </div>
      );
    },
  },
  {
    title: "4pm",
    dataIndex: "4pm",
    key: "4pm",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          4:00pm-4:30pm
        </div>
      );
    },
  },
  {
    title: "5pm",
    dataIndex: "5pm",
    key: "5pm",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          5:00pm-5:30pm
        </div>
      );
    },
  },
  {
    title: "6pm",
    dataIndex: "6pm",
    key: "6pm",
    width: 70,
    render() {
      return (
        <div className="rounded-pill bg-primary text-white text-center mb-1">
          6:00pm-6:30am
        </div>
      );
    },
  },
];
export const bookTrainingSessionTableMockData = [
  {
    "Available Trainers": "Phil Auerbach",
    "Mon 7/10": "1:00am-11:30am",
    "Tue 7/11": "11:00am-11:30am",
    "Wed 7/12": "12:00am-11:30am",
    "Thu 7/13": "9:00am-11:30am",
    "Fri 7/14": "8:00am-11:30am",
  },
  {
    "Available Trainers": "John Doe",
    "Mon 7/10": "2:00am-11:30am",
    "Tue 7/11": "11:00am-11:30am",
    "Wed 7/12": "12:00am-11:30am",
    "Thu 7/13": "9:00am-11:30am",
    "Fri 7/14": "8:00am-11:30am",
  },
  {
    "Available Trainers": "Rohit",
    "Mon 7/10": "2:00am-11:30am",
    "Tue 7/11": "11:00am-11:30am",
    "Wed 7/12": "12:00am-11:30am",
    "Thu 7/13": "9:00am-11:30am",
    "Fri 7/14": "8:00am-11:30am",
  },
  {
    "Available Trainers": "trainer",
    "Mon 7/10": "2:00am-11:30am",
    "Tue 7/11": "11:00am-11:30am",
    "Wed 7/12": "12:00am-11:30am",
    "Thu 7/13": "9:00am-11:30am",
    "Fri 7/14": "8:00am-11:30am",
  },
];
export const bookTrainingSessionDayTableMockData = [
  {
    "Available Trainers": "Phil Auerbach",
    "8am": "1:00am-11:30am",
    "9am": "11:00am-11:30am",
    "10am": "12:00am-11:30am",
    "11am": "9:00am-11:30am",
    "12pm": "8:00am-11:30am",
    "1pm": "8:00am-11:30am",
    "2pm": "8:00am-11:30am",
    "3pm": "8:00am-11:30am",
    "4pm": "8:00am-11:30am",
    "5pm": "8:00am-11:30am",
    "6pm": "8:00am-11:30am",
  },
  {
    "Available Trainers": "John Doe",
    "8am": "1:00am-11:30am",
    "9am": "11:00am-11:30am",
    "10am": "12:00am-11:30am",
    "11am": "9:00am-11:30am",
    "12pm": "8:00am-11:30am",
    "1pm": "8:00am-11:30am",
    "2pm": "8:00am-11:30am",
    "3pm": "8:00am-11:30am",
    "4pm": "8:00am-11:30am",
    "5pm": "8:00am-11:30am",
    "6pm": "8:00am-11:30am",
  },
  {
    "Available Trainers": "Rohit",
    "8am": "1:00am-11:30am",
    "9am": "11:00am-11:30am",
    "10am": "12:00am-11:30am",
    "11am": "9:00am-11:30am",
    "12pm": "8:00am-11:30am",
    "1pm": "8:00am-11:30am",
    "2pm": "8:00am-11:30am",
    "3pm": "8:00am-11:30am",
    "4pm": "8:00am-11:30am",
    "5pm": "8:00am-11:30am",
    "6pm": "8:00am-11:30am",
  },
  {
    "Available Trainers": "trainer",
    "8am": "1:00am-11:30am",
    "9am": "11:00am-11:30am",
    "10am": "12:00am-11:30am",
    "11am": "9:00am-11:30am",
    "12pm": "8:00am-11:30am",
    "1pm": "8:00am-11:30am",
    "2pm": "8:00am-11:30am",
    "3pm": "8:00am-11:30am",
    "4pm": "8:00am-11:30am",
    "5pm": "8:00am-11:30am",
    "6pm": "8:00am-11:30am",
  },
];

export const trainers = [
  {
    id: 1,
    label: "Phil Auerbach",
    value: 1,
  },
  {
    id: 2,
    label: "Jhon Deo",
    value: 2,
  },
  {
    id: 3,
    label: "Rohit",
    value: 3,
  },
  {
    id: 4,
    label: "Trainer",
    value: 4,
  },
  {
    id: 5,
    label: "Trane",
    value: 5,
  },
];

export const week = [
  {
    id: 1,
    label: "Monday",
    value: 1,
  },
  {
    id: 2,
    label: "Tuesday",
    value: 2,
  },
  {
    id: 3,
    label: "Wednesday",
    value: 3,
  },
  {
    id: 4,
    label: "Thursday",
    value: 4,
  },
  {
    id: 5,
    label: "Friday",
    value: 5,
  },
];
export const leftSideBarOptions = {
  HOME: "home",
  STATUS: "status",
  SCHEDULE_TRAINING: "scheduleTraining",
  CHATS: "chats",
};
export const filterOption = {
  day: "Day",
  week: "Week",
};
