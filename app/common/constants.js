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
  landing: "/landing",
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
  notAvailableDescription: "Description not available",
  errorMessage: {
    wip: "work in progress",
    timeConflicts: "These slots are already booked.",
    invalidTime: "Please select valid time",
    invalidFile: "Please select an image file under 2 MB",
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

export const CourseData = [
  {
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Learn Figma - UI/UX Design Essential Training",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-user",
        name: "Student",
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
    img: "https://images.unsplash.com/photo-1618335829737-2228915674e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Python for Beginners - Learn Programming from scratch",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-user",
        name: "Student",
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
    img: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Acoustic Guitar and Electric Guitar Started",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-user",
        name: "Student",
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
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Mobile App Development with Flutter & Dart (iOS and Android)",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-user",
        name: "Student",
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
    img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Ionic React: Mobile Development with Ionic 5 Started",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-user",
        name: "Student",
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
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Sports Management: The Essentials Course",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "6",
      },
      {
        icon: "fa fa-user",
        name: "Student",
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
    img: "https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFya2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    name: "How to Market Yourself as a Consultant",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-user",
        name: "Student",
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
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    name: "Become a Product Manager | Learn the Skills & Get the Job",
    courseDetails: [
      {
        icon: "fa fa-book",
        name: "Lesson",
        enroll: "21",
      },
      {
        icon: "fa fa-user",
        name: "Student",
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
    label: 'What we offer'
  },
  {
    id: 1,
    label: 'Careers'
  },
  {
    id: 1,
    label: 'Leadership'
  },
  {
    id: 1,
    label: 'About'
  },
  {
    id: 1,
    label: 'Catalog'
  },
  {
    id: 1,
    label: 'Degrees'
  },
  {
    id: 1,
    label: 'For Enterprise'
  },
  {
    id: 1,
    label: 'For Government'
  },
  {
    id: 1,
    label: 'For Campus'
  },
  {
    id: 1,
    label: 'Become a partner'
  },
  {
    id: 1,
    label: 'Terms'
  },
  {
    id: 1,
    label: 'Accessibility'
  }
]
export const NEW_COMMENTS = [
  {
    id: 1,
    label: 'Alex',
    comment: 'How nice it does look...'
  },
  {
    id: 1,
    label: 'John',
    comment: 'You were stunning today...'
  },
  {
    id: 1,
    label: 'Martin',
    comment: 'It was great training session today...'
  }
]

export const WHY_CHOOSE_US = [
  {
    id: 1,
    icon: '🚀',
    content: 'Seamless Trainer Booking: Discover a diverse community of experienced trainers spanning various fields. Browse profiles, read reviews, and select the perfect trainer to help you achieve your goals.'
  },
  {
    id: 2,
    icon: '🎯',
    content: 'Tailored Learning Plans: Say goodbye to one-size-fits-all approaches. Our trainers create personalized learning plans that cater to your unique needs and aspirations.'
  },
  {
    id: 3,
    icon: '📅',
    content: "Flexible Scheduling: Life can be hectic, but learning shouldn't be. Choose session times that fit your schedule, whether it's early morning or late at night."
  },
  {
    id: 4,
    icon: '🖌️',
    content:" Interactive Learning Tools: Immerse yourself in engaging sessions with our unique interactive features. Draw freehand, create shapes, and annotate live video feeds to enhance your understanding and retention."
  },
  {
    id: 5,
    icon: '📹',
    content: "Clip Share: Capture the moments of your sessions and easily share them with your trainer. Make feedback and progress tracking a breeze."
  },
  {
    id: 6,
    icon: '🌐',
    content: "Connect from Anywhere: Whether you're at home, in the office, or on the go, LearnConnect's web application allows you to connect with your trainer seamlessly, anytime, anywhere."
  }
]