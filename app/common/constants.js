import exp from "constants";

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
  "saturday",
  "sunday",
];

export const bookingButton = ["upcoming", "canceled", "completed"];
export const debouncedConfigs = {
  oneSec: 1000,
  towSec: 2000,
};
export const routingPaths = {
  landing: "/",
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
  start: "start",
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
  noMediaFound: "No media found",
  noSlotsAvailable: "No slots found",
  notAvailable: "Not available slot",
  timeConflicts: "Please Select a valid time",
  notAvailableDescription: "Description not available",
  errorMessage: {
    wip: "work in progress",
    timeConflicts: "These slots are already booked.",
    invalidTime: "Please select valid time",
    invalidFile: "Please select an image file under 2 MB",
    invalidPNG: "Please select an image",
  },
  successMessage: {
    rating: "Providing a Rating",
  },
  info: {
    selectFileType: "Select only image",
    categoryWip: "You selected category which is in progress...",
  },
};

export const meetingRatingTimeout = {
  has24passed: "has24passed",
};

export const FileFormates = {
  image: ".jpg, .jpeg, .png",
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
    title: "First side label",
    description: "This is the first image in the collection.",
    active: true,
  },
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3374&q=80",
    type: "image",
    title: "second side label",
    description: "This is the second image in the collection.",
  },
  {
    url: "https://www.youtube.com/watch?v=ixRanV-rdAQ",
    type: "video",
    title: "third side label",
    description: "This is a video link.",
  },
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

export const carouselItem = {
  image: "image",
  video: "video",
};

export const settingMenuFilterSection = ["account", "my-profile"];

export const MAX_FILE_SIZE_MB = 2;

export const allowedExtensions = ["image/png", "image/jpeg", "image/jpg"];

export const DUMMY_URLS = {
  YOUTUBE:
    "https://img.freepik.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg?w=2000",
};

export const FILTER_DEFAULT_CHECKED_ID = 1;

export const FILTER_TIME = [
  {
    id: 1,
    label: "Anytime",
    value: "Anytime",
    time: { from: "00:00", to: "23:59" },
  },
  {
    id: 2,
    label: "Morning",
    value: "Morning",
    time: { from: "09:00:00", to: "12:00:00" },
  },
  {
    id: 3,
    label: "Afternoon",
    value: "Afternoon",
    time: { from: "12:00:00", to: "18:00:00" },
  },
  {
    id: 4,
    label: "Evening",
    value: "Evening",
    time: { from: "18:00:00", to: "23:59:00" },
  },
];

export const Courses = [
  {
    img: "/assets/images/Almer.jpeg",
    name: "Almer",
    courseDetails: [
      {
        icon: "fa fa-star-o",
        name: "Review",
        enroll: "2",
      },
      {
        icon: "fa fa-list-alt",
        name: " Category",
        enroll: "21",
      },
      {
        icon: "fa fa-trophy",
        name: "Beginner",
        enroll: null,
      },
    ],
  },
  {
    img: "/assets/images/Edolie.jpeg",
    name: "Edolie",
    courseDetails: [
      {
        icon: "fa fa-star-o",
        name: "Review",
        enroll: "1",
      },
      {
        icon: "fa fa-list-alt",
        name: " Category",
        enroll: "21",
      },
      {
        icon: "fa fa-trophy",
        name: "Advanced",
        enroll: null,
      },
    ],
  },
  {
    img: "/assets/images/Clovis.jpeg",
    name: "Clovis",
    courseDetails: [
      {
        icon: "fa fa-star-o",
        name: "Review",
        enroll: "11",
      },
      {
        icon: "fa fa-list-alt",
        name: " Category",
        enroll: "21",
      },
      {
        icon: "fa fa-trophy",
        name: "Average",
        enroll: null,
      },
    ],
  },
  {
    img: "/assets/images/Daralis.jpeg",
    name: "Daralis",
    courseDetails: [
      {
        icon: "fa fa-star-o",
        name: "Review",
        enroll: "100",
      },
      {
        icon: "fa fa-list-alt",
        name: " Category",
        enroll: "21",
      },
      {
        icon: "fa fa-trophy",
        name: "Advanced",
        enroll: null,
      },
    ],
  },
  {
    img: "/assets/images/Ansley.jpeg",
    name: "Ansley",
    courseDetails: [
      {
        icon: "fa fa-star-o",
        name: "Review",
        enroll: "3",
      },
      {
        icon: "fa fa-list-alt",
        name: " Category",
        enroll: "21",
      },
      {
        icon: "fa fa-trophy",
        name: "Average",
        enroll: null,
      },
    ],
  },
  {
    img: "/assets/images/Benton.jpeg",
    name: "Benton",
    courseDetails: [
      {
        icon: "fa fa-star-o",
        name: "Review",
        enroll: "6",
      },
      {
        icon: "fa fa-list-alt",
        name: " Category",
        enroll: "198",
      },
      {
        icon: "fa fa-trophy",
        name: "Beginner",
        enroll: null,
      },
    ],
  },
  {
    img: "/assets/images/Dwennon.jpeg",
    name: "Dwennon",
    courseDetails: [
      {
        icon: "fa fa-star-o",
        name: "Review",
        enroll: "9",
      },
      {
        icon: "fa fa-list-alt",
        name: " Category",
        enroll: "99",
      },
      {
        icon: "fa fa-trophy",
        name: "Average",
        enroll: null,
      },
    ],
  },
  {
    img: "/assets/images/Edward.jpeg",
    name: "Edward",
    courseDetails: [
      {
        icon: "fa fa-star-o",
        name: "Review",
        enroll: "12",
      },
      {
        icon: "fa fa-list-alt",
        name: " Category",
        enroll: "21",
      },
      {
        icon: "fa fa-trophy",
        name: "Advanced",
        enroll: null,
      },
    ],
  },
];

export const CourseItems = [
  {
    name: "All Course",
    link: "",
  },
  {
    name: "Design",
    link: "",
  },
  {
    name: "Development",
    link: "",
  },
  {
    name: "Photography",
    link: "",
  },
  {
    name: "Music",
    link: "",
  },
];

export const QUICK_ACCESS = [
  {
    id: 1,
    label: "What we offer",
  },
  {
    id: 1,
    label: "Careers",
  },
  {
    id: 1,
    label: "Leadership",
  },
  {
    id: 1,
    label: "About",
  },
  {
    id: 1,
    label: "Catalog",
  },
  {
    id: 1,
    label: "Degrees",
  },
  {
    id: 1,
    label: "For Enterprise",
  },
  {
    id: 1,
    label: "For Government",
  },
  {
    id: 1,
    label: "For Campus",
  },
  {
    id: 1,
    label: "Become a partner",
  },
  {
    id: 1,
    label: "Terms",
  },
  {
    id: 1,
    label: "Accessibility",
  },
  {
    id: 1,
    label: "Privacy Policy",
  },
  {
    id: 1,
    label: "Terms & Conditions",
  },
];
export const NEW_COMMENTS = [
  {
    id: 1,
    label: "Alex",
    comment: "How nice it does look...",
  },
  {
    id: 1,
    label: "John",
    comment: "You were stunning today...",
  },
  {
    id: 1,
    label: "Martin",
    comment: "It was great training session today...",
  },
];

export const WHY_CHOOSE_US = [
  {
    id: 1,
    icon: "🚀",
    title: "Seamless Trainer Booking",
    content:
      "Discover a diverse community of experienced trainers spanning various fields. Browse profiles, read reviews, and select the perfect trainer to help you achieve your goals.",
  },
  {
    id: 2,
    icon: "🎯",
    title: "Tailored Learning Plans",
    content:
      "Say goodbye to one-size-fits-all approaches. Our trainers create personalized learning plans that cater to your unique needs and aspirations.",
  },
  {
    id: 3,
    icon: "📅",
    title: "Flexible Scheduling",
    content:
      "Life can be hectic, but learning shouldn't be. Choose session times that fit your schedule, whether it's early morning or late at night.",
  },
  {
    id: 4,
    icon: "🖌️",
    title: "Interactive Learning Tools",
    content:
      " Immerse yourself in engaging sessions with our unique interactive features. Draw freehand, create shapes, and annotate live video feeds to enhance your understanding and retention.",
  },
  {
    id: 5,
    icon: "📹",
    title: "Clip Share",
    content:
      "Capture the moments of your sessions and easily share them with your trainer. Make feedback and progress tracking a breeze.",
  },
  {
    id: 6,
    icon: "🌐",
    title: "Connect from Anywhere",
    content:
      "Whether you're at home, in the office, or on the go, LearnConnect's web application allows you to connect with your trainer seamlessly, anytime, anywhere.",
  },
];

export const HOW_IT_WORKS = [
  {
    id: 1,
    icon: "1",
    title: "Sign Up",
    content:
      "Create your account in a few simple steps. Tell us about your goals, interests, and preferences, so we can match you with the perfect trainer.",
  },
  {
    id: 2,
    icon: "2",
    title: "Browse Trainers",
    content:
      "Explore our diverse range of trainers. Filter by category, reviews, and availability to find your ideal mentor.",
  },
  {
    id: 3,
    icon: "3",
    title: "Book a Session",
    content:
      "Once you've found your perfect match, book a session at your convenience. Our flexible scheduling ensures you get the training you need, when you need it.",
  },
  {
    id: 4,
    icon: "4",
    title: "Interactive Learning",
    content:
      "Engage in interactive sessions like never before. Draw, highlight, and shape your learning experience directly on the live video feed. It's a hands-on approach to learning like you've never seen.",
  },
  {
    id: 5,
    icon: "5",
    title: "Clip and Share",
    content:
      "Capture important moments during your sessions and share them with your trainer for feedback and improvement.",
  },
  {
    id: 6,
    icon: "6",
    title: "Track Progress",
    content:
      "Monitor your progress and watch yourself grow with our progress tracking tools. Achieve your goals faster and more efficiently.",
  },
  {
    id: 7,
    icon: "7",
    title: "Connect and Learn",
    content:
      "Build a strong connection with your trainer and enhance your skills through personalized guidance and support.",
  },
];
export const YOURCOURSES = [
  {
    name: "Google Ads Training 2021:Profit with pay",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-book",
        name: "Student",
        enroll: "21",
      },
      {
        icon: "fa fa-trophy",
        name: "Advanced",
        enroll: null,
      },
    ],
    item: [
      {
        points: 75 / 100,
        Days: 56,
      },
    ],
  },
  {
    name: "Google Ads Training 2021:Profit with pay",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-book",
        name: "Student",
        enroll: "21",
      },
      {
        icon: "fa fa-trophy",
        name: "Advanced",
        enroll: null,
      },
    ],
    item: [
      {
        points: 75 / 100,
        Days: 56,
      },
    ],
  },
];

export const POSITION_FIXED_SIDEBAR_MENU = [
  "home",
  "notification",
  "file",
  "setting",
];

export const FIXED_ITEM = ["notification", "file", "setting"];

export const MOBILE_SIZE = 576;

export const TimeRange = { start: 0, end: 1440 };

export const DefaultTimeRange = { startTime: "00:00", endTime: "24:00" };

export const minimumMeetingDurationInMin = 50;

export const TimeZone = [
  {
    id: 1,
    offset: "-12:00",
    timezone: "(GMT -12:00) Eniwetok Kwajalein",
    value: "(GMT -12:00) Eniwetok Kwajalein",
  },
  {
    id: 2,
    offset: "-11:00",
    timezone: "(GMT -11:00) Midway Island, Samoa",
    value: "(GMT -11:00) Midway Island, Samoa",
  },
  {
    id: 3,
    offset: "-10:00",
    timezone: "(GMT -10:00) Hawaii",
    value: "(GMT -10:00) Hawaii",
  },
  {
    id: 4,
    offset: "-09:50",
    timezone: "(GMT -9:30) Taiohae",
    value: "(GMT -9:30) Taiohae",
  },
  {
    id: 5,
    offset: "-09:00",
    timezone: "(GMT -9:00) Alaska",
    value: "(GMT -9:00) Alaska",
  },
  {
    id: 5,
    offset: "-08:00",
    timezone: "(GMT -8:00) Pacific Time (US & Canada)",
    value: "(GMT -8:00) Pacific Time (US & Canada)",
  },
  {
    id: 6,
    offset: "-07:00",
    timezone: "(GMT -7:00) Mountain Time (US & Canada)",
    value: "(GMT -7:00) Mountain Time (US & Canada)",
  },
  {
    id: 7,
    offset: "-06:00",
    timezone: "(GMT -6:00) Central Time (US & Canada)",
    value: "(GMT -6:00) Central Time (US & Canada)",
  },
  {
    id: 8,
    offset: "-05:00",
    timezone: "(GMT -5:00) Eastern Time (US & Canada)",
    value: "(GMT -5:00) Eastern Time (US & Canada)",
  },
  {
    id: 9,
    offset: "-04:50",
    timezone: "(GMT -4:30) Caracas",
    value: "(GMT -4:30) Caracas",
  },
  {
    id: 10,
    offset: "-04:00",
    timezone: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
    value: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
  },
  {
    id: 11,
    offset: "-03:50",
    timezone: "(GMT -3:30) Newfoundland",
    value: "(GMT -3:30) Newfoundland",
  },
  {
    id: 12,
    offset: "-03:00",
    timezone: "(GMT -3:00) Brazil, Buenos Aires, Georgetown",
    value: "(GMT -3:00) Brazil, Buenos Aires, Georgetown",
  },
  {
    id: 13,
    offset: "-02:00",
    timezone: "(GMT -2:00) Mid-Atlantic",
    value: "(GMT -2:00) Mid-Atlantic",
  },
  {
    id: 14,
    offset: "-01:00",
    timezone: "(GMT -1:00) Azores",
    value: "(GMT -1:00) Azores",
  },
  {
    id: 15,
    offset: "+00:00",
    timezone: "(GMT) Western Europe Time",
    value: "(GMT) Western Europe Time",
  },
  {
    id: 16,
    offset: "+01:00",
    timezone: "(GMT +1:00) Brussels",
    value: "(GMT +1:00) Brussels",
  },
  {
    id: 17,
    offset: "+02:00",
    timezone: "(GMT +2:00) Kaliningrad",
    value: "(GMT +2:00) Kaliningrad",
  },
  {
    id: 18,
    offset: "+03:00",
    timezone: "(GMT +3:00) Baghdad",
    value: "(GMT +3:00) Baghdad",
  },
  {
    id: 19,
    offset: "+03:50",
    timezone: "(GMT +3:30) Tehran",
    value: "(GMT +3:30) Tehran",
  },
  {
    id: 20,

    offset: "+04:00",
    timezone: "(GMT +4:00) Abu Dhabi",
    value: "(GMT +4:00) Abu Dhabi",
  },
  {
    id: 21,
    offset: "+04:50",
    timezone: "(GMT +4:30) Kabul",
    value: "(GMT +4:30) Kabul",
  },
  {
    id: 22,
    offset: "+05:00",
    timezone: "(GMT +5:00) Ekaterinburg",
    value: "(GMT +5:00) Ekaterinburg",
  },
  {
    id: 23,
    offset: "+05:50",
    timezone: "(GMT +5:30) Bombay",
    value: "(GMT +5:30) Bombay",
  },
  {
    id: 24,
    offset: "+05:75",
    timezone: "(GMT +5:45) Kathmandu",
    value: "(GMT +5:45) Kathmandu",
  },
  {
    id: 25,
    offset: "+06:00",
    timezone: "(GMT +6:00) Almaty",
    value: "(GMT +6:00) Almaty",
  },
  {
    id: 26,
    offset: "+06:50",
    timezone: "(GMT +6:30) Yangon",
    value: "(GMT +6:30) Yangon",
  },
  {
    id: 27,
    offset: "+07:00",
    timezone: "(GMT +7:00) Bangkok",
    value: "(GMT +7:00) Bangkok",
  },
  {
    id: 28,
    offset: "+08:00",
    timezone: "(GMT +8:00) Beijing",
    value: "(GMT +8:00) Beijing",
  },
  {
    id: 29,
    offset: "+08:75",
    timezone: "(GMT +8:45) Eucla",
    value: "(GMT +8:45) Eucla",
  },
  {
    id: 30,
    offset: "+09:00",
    timezone: "(GMT +9:00) Tokyo",
    value: "(GMT +9:00) Tokyo",
  },
  {
    id: 31,
    offset: "+09:50",
    timezone: "(GMT +9:30) Adelaide",
    value: "(GMT +9:30) Adelaide",
  },
  {
    id: 32,
    offset: "+10:00",
    timezone: "(GMT +10:00) Eastern Australia",
    value: "(GMT +10:00) Eastern Australia",
  },
  {
    id: 33,
    offset: "+10:50",
    timezone: "(GMT +10:30) Lord Howe Island",
    value: "(GMT +10:30) Lord Howe Island",
  },
  {
    id: 34,
    offset: "+11:00",
    timezone: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
    value: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
  },
  {
    id: 35,
    offset: "+11:50",
    timezone: "(GMT +11:30) Norfolk Island",
    value: "(GMT +11:30) Norfolk Island",
  },
  {
    id: 36,
    offset: "+12:00",
    timezone: "(GMT +12:00) Auckland",
    value: "(GMT +12:00) Auckland",
  },
  {
    id: 37,
    offset: "+12:75",
    timezone: "(GMT +12:45) Chatham Islands",
    value: "(GMT +12:45) Chatham Islands",
  },
  {
    id: 38,
    offset: "+13:00",
    timezone: "(GMT +13:00) Apia, Nukualofa",
    value: "(GMT +13:00) Apia, Nukualofa",
  },
  {
    id: 39,
    offset: "+14:00",
    timezone: "(GMT +14:00) Line Islands, Tokelau",
    value: "(GMT +14:00) Line Islands, Tokelau",
  },
];

export const MINIMUM_RATE = 10;
export const MAXIMUM_RATE = 999;