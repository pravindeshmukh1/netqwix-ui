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

export const LIST_OF_CATEGORY = [
  {
    id: 1,
    label: "Golf",
    value: 1,
  },
  {
    id: 2,
    label: "Baseball",
    value: 2,
  },
  {
    id: 3,
    label: "Tennis",
    value: 3,
  },
  {
    id: 4,
    label: "Skiing",

    value: 4,
  },
  {
    id: 5,
    label: "Personal Training",
    value: 5,
  },
  {
    id: 6,
    label: "Yoga",
    value: 6,
  },
  {
    id: 7,
    label: "Physical Therapy",
    value: 7,
  },
  {
    id: 8,
    label: "Acting",
    value: 8,
  },
  {
    id: 9,
    label: "Music",
    value: 9,
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
