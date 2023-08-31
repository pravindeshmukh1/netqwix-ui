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

export const scheduleInstantMeetingMockDate = [
  {
    id: 1,
    name: "Phil Auerbach",
    email: "philauerbach@gmail.com",
  },
  {
    id: 2,
    name: "John Doe",
    email: "johndoe@gmail.com",
  },
];
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

export const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];
export const routingPaths = {
  landing: "/landing",
  dashboard: "/dashboard",
  signUp: "/auth/signUp",
  signIn: "/auth/signIn",
  forgetPassword: "/auth/forgetPassword",
  verifiedForgetPassword: "/auth/verified-forget-password",
};

export const params = {
  search: "",
};
export const STATUS = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};
export const BookedSession = {
  confirm: "confirm",
  confirmed: "confirmed",
  booked: "booked",
  canceled: "canceled",
  completed: "completed",
};
export const BookedSessionMessage = {
  canceled: "This Booked Schedule Training Canceled",
  confirmed: "This Booked Schedule Training Confirmed",
};
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

export const timeFormat = "h:mm";

export const timeFormatInDb = "h:mm:ss";

export const FormateDate = {
  YYYY_MM_DD: "YYYY-MM-DD",
};

export const FormateHours = {
  HH_MM: "HH:mm",
};

export const SHAPES = {
  FREE_HAND: null,
  LINE: "line",
  CIRCLE: "circle",
  SQUARE: "square",
  OVAL: "oval",
  RECTANGLE: "rectangle",
  TRIANGLE: "triangle",
  ARROW_RIGHT: "arrow_right",
  TWO_SIDE_ARROW: "two_side_arrow",
};

export const TRAINER_AMOUNT_USD = 10;
export const TRAINER_MEETING_TIME = "Hour";

export const Message = {
  notFound: "No data available",
  noMediaFound: "No media found!",
  noSlotsAvailable: "No slots found",
  notAvailableDescription: "Description not available",
  errorMessage: {
    wip: "work in progress",
    timeConflicts: "These slots are already booked.",
    invalidTime: "Please select valid time",
  },
  successMessage: {
    rating: "Providing a Rating",
  },
  info: {
    categoryWip: "You selected category which is in progress...",
  },
};

export const meetingRatingTimeout = {
  has24passed: "has24passed",
};

export const validationMessage = {
  rating: {
    howWasYourSession: "This field is required",
    rateAudioVideo: "This field is required",
    stronglyWouldYouLikeRecommend: "This field is required",
    title: "This field is required",
    addRemark: "This field is required",
  },
  edit_trainer_profile: {
    about: "This field is required ",
    teaching_style: "This field is required ",
    credentials_and_affiliations: "This field is required ",
    curriculum: "This field is required ",
  },
  social_media: {
    field_required: "This field is required",
  },
};

export const trainerReview = {
  review: "5.0",
  totalReviews: "2 reviews",
};

export const mediaData = [
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3274&q=80",
    type: "image",
  },
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3374&q=80",
    type: "image",
  },
  // {
  //   url: "https://youtu.be/mUxzKVrSAjs?si=v6oqi-0-rG7BJ5sk",
  //   type: "video",
  // },
];

export const trainerFilterOptions = [
  {
    id: 1,
    label: "Offres free 15 miutes trial",
    value: "Offres free 15 miutes trial",
    isCheck: false,
  },
  {
    id: 2,
    label: "Teaches kids",
    value: "Teaches kids",
    isCheck: false,
  },
  {
    id: 3,
    label: "Accepting new students",
    value: "Accepting new students",
    isCheck: false,
  },
];

export const truncateText = {
  maxLength: 200,
};
