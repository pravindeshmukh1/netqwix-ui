import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Stepper from "react-stepper-horizontal";
import {
  AccountType,
  Errors,
  SuccessMsgs,
  signUpSteps,
} from "../../../app/common/constants";
import BasicInfo from "../../../app/components/auth/signUp/basicInfo";
import Details from "../../../app/components/auth/signUp/details";
import { toast } from "react-toastify";
import { Utils } from "../../../utils/utils";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../../app/store";
import {
  authState,
  authAction,
  signUpAPI,
  signupAsync,
} from "../../../app/components/auth/auth.slice";

const Auth_SignUp = (props) => {
  const router = useRouter();
  const authSelector = useAppSelector(authState);
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    isGoogleRegister: false,
  });

  const [details, setDetails] = useState({
    mobile_no: "",
    account_type: "",
    category: null,
  });

  useEffect(() => {
    if (
      authSelector &&
      authSelector.showGoogleRegistrationForm &&
      authSelector.showGoogleRegistrationForm.isFromGoogle
    ) {
      setBasicInfo({
        ...basicInfo,
        email: authSelector.showGoogleRegistrationForm.email,
        password: "*****",
        isGoogleRegister: true,
      });
    }
  }, [authSelector.showGoogleRegistrationForm.isFromGoogle]);

  useEffect(() => {
    if (authSelector.status === "fulfilled") {
      dispatch(authAction.updateIsGoogleForm());
      setBasicInfo({ ...basicInfo, isGoogleRegister: false });
      console.log(`redirecting >>> `);
      router.push("/auth/signIn");
    }
  }, [authSelector.status]);

  const signUp = () => {
    const signUpObj = { ...basicInfo, ...details };
    if (signUpObj.account_type === "Trainee") {
      delete signUpObj.category;
    }
    dispatch(signupAsync(signUpObj));
  };

  const handleChangeBasicInfo = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
  };

  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkValidation = () => {
    switch (activeStep + 1) {
      case 1:
        if (basicInfo.email && Utils.isEmailValid(basicInfo.email)) {
          return true;
        } else {
          return false;
        }
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (activeStep + 1) {
      case 1:
        const isBasicInfoNotEmpty = Object.values(basicInfo).every(
          (info) => info !== ""
        );
        if (isBasicInfoNotEmpty) {
          const isBasicInfoValid = checkValidation();
          if (isBasicInfoValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          } else {
            toast.error(Errors.invalidEmail);
          }
        } else {
          toast.error(Errors.signUp.basicInfo);
        }

        break;
      case 2:
        if (
          !details.account_type ||
          details.account_type === "Choose account type"
        ) {
          toast.error(Errors.signUp.detailsTab);
        } else if (
          details.account_type === AccountType.TRAINER &&
          !details.category
        ) {
          toast.error(Errors.signUp.detailsTabCategory);
        } else {
          signUp();
        }
        break;
      default:
        break;
    }
  };

  const signUpStep = () => {
    switch (activeStep + 1) {
      case 1:
        return (
          <BasicInfo
            isFromGoogle={authSelector.showGoogleRegistrationForm.isFromGoogle}
            values={basicInfo}
            handleChange={handleChangeBasicInfo}
          />
        );
      case 2:
        return <Details values={details} handleChange={handleChangeDetails} />;
    }
  };

  return (
    <div className="login-page1">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-12 p-0">
            <div className="login-contain-main">
              <div className="left-page">
                <div className="login-content">
                  <div className="login-content-header">
                    <Link href="/landing">
                      {/* <img
                        className="image-fluid"
                        src="/assets/images/logo/landing-logo.png"
                        alt="images"
                      /> */}
                      <img
                         src="/assets/images/netquix_logo.png"
                         alt="images"
                         style={{ width: "150px", height: "100px" }}
                      />
                    </Link>
                  </div>
                  {/* <h3>Hello Everyone , We are Chitchat</h3>
                  <h4>Welcome to chitchat please Register to your account.</h4> */}
                  <h3>Hello Everyone</h3>
                  <h4>Please register to your account.</h4>
                  <div>
                    <Stepper
                      steps={signUpSteps}
                      activeColor={"#000080"}
                      completeColor={"primary"}
                      activeStep={activeStep}
                    />
                  </div>
                  <form className="form1">
                    <div className="my-4">{signUpStep()}</div>
                    <div className="form-group">
                      <div className="buttons">
                        {activeStep != 0 && (
                          <div
                            className="btn btn-primary button-effect"
                            onClick={handleBack}
                          >
                            Back
                          </div>
                        )}
                        {activeStep === signUpSteps.length - 1 ? (
                          <div
                            className="btn button-effect btn-signup"
                            onClick={() => handleNext()}
                          >
                            Submit
                          </div>
                        ) : (
                          <div
                            className="btn btn-primary button-effect"
                            onClick={() => handleNext()}
                          >
                            Next
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                  <div className="termscondition">
                    <h4 className="mb-0">
                      <span>*</span>Terms and condition<b>&amp;</b>Privacy
                      policy
                    </h4>
                  </div>
                </div>
              </div>
              <div className="right-page">
                <div className="right-login animat-rate">
                  <div className="animation-block">
                    <div className="bg_circle">
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                    </div>
                    <div className="cross" />
                    <div className="cross1" />
                    <div className="cross2" />
                    <div className="dot" />
                    <div className="dot1" />
                    <div className="maincircle" />
                    <div className="top-circle" />
                    <div className="center-circle" />
                    <div className="bottom-circle" />
                    <div className="bottom-circle1" />
                    <div className="right-circle" />
                    <div className="right-circle1" />
                    <img
                      className="heart-logo"
                      src="/assets/images/login_signup/5.png"
                      alt="login logo"
                    />
                    <img
                      className="has-logo"
                      src="/assets/images/login_signup/4.png"
                      alt="login logo"
                    />
                    <img
                      className="login-img"
                      src="/assets/images/login_signup/1.png"
                      alt="login logo"
                    />
                    <img
                      className="boy-logo"
                      src="/assets/images/login_signup/6.png"
                      alt="login boy logo"
                    />
                    <img
                      className="girl-logo"
                      src="/assets/images/login_signup/7.png"
                      alt="girllogo"
                    />
                    <img
                      className="cloud-logo"
                      src="/assets/images/login_signup/2.png"
                      alt="login logo"
                    />
                    <img
                      className="cloud-logo1"
                      src="/assets/images/login_signup/2.png"
                      alt="login logo"
                    />
                    <img
                      className="cloud-logo2"
                      src="/assets/images/login_signup/2.png"
                      alt="login logo"
                    />
                    <img
                      className="cloud-logo3"
                      src="/assets/images/login_signup/2.png"
                      alt="login logo"
                    />
                    <img
                      className="cloud-logo4"
                      src="/assets/images/login_signup/2.png"
                      alt="login logo"
                    />
                    <img
                      className="has-logo1"
                      src="/assets/images/login_signup/4.png"
                      alt="login logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth_SignUp;
