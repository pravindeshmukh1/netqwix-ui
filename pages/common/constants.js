export const signUpSteps = [{ title: "Basic Info" }, { title: "Details" }];

export const LIST_OF_ACCOUNT_TYPE = [
  {
    id: 1,
    label: "Choose account type",
    value: 1,
  },
  {
    id: 2,
    label: "Trainee",
    value: 2,
  },
  {
    id: 3,
    label: "Trainer",
    value: 3,
  },
];

export const Errors = {
  signUp: {
    basicInfo: "All fields are mandatory",
    detailsTab: "Please select one account type",
  },
  invalidEmail: "Please enter valid email",
};

export const Regex = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
};
