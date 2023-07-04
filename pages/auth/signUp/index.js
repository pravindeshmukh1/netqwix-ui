import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Stepper from "react-stepper-horizontal";
import { signUpSteps } from "../../common/constants";
import BasicInfo from "./basicInfo";
import Details from "./details";

const Auth_SignUp = (props) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const [basicInfo, setBasicInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [details, setDetails] = useState({
    phoneNo: "",
    accountType: ""
  });


  const handleChangeBasicInfo = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
  }

  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    setDetails({ ...basicInfo, [name]: value });
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleSubmit = () => {
    router.push("/auth/signIn");
  }

  

  const signUpStep = () => {
    switch (activeStep + 1) {
      case 1:
        return <BasicInfo values={basicInfo} handleChange={handleChangeBasicInfo} />;
      case 2:
        return <Details values={details} handleChange={handleChangeDetails}/>;
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
                      <img
                        className="image-fluid"
                        src="/assets/images/logo/landing-logo.png"
                        alt="images"
                      />
                    </Link>
                  </div>
                  <h3>Hello Everyone , We are Chitchat</h3>
                  <h4>Welcome to chitchat please Register to your account.</h4>
                  <div>
                    <Stepper steps={signUpSteps} activeStep={activeStep} />
                  </div>
                  <div className="my-4">
                  {signUpStep()}
                  </div>
                  <div className="form-group">
                    <div className="buttons">
                      {activeStep != 0 && (
                        <Link
                          className="btn btn-primary button-effect"
                          href="#"
                          onClick={handleBack}
                        >
                          Back
                        </Link>
                      )}
                      {activeStep === signUpSteps.length - 1 ? (
                        <Link
                        className="btn button-effect btn-signup"
                          href="#"
                          onClick={() => handleSubmit()}
                        >
                          Submit
                        </Link>
                      ) : (
                        <Link
                        className="btn btn-primary button-effect"
                        href="#"
                        onClick={() => handleNext()}
                      >
                        Next
                      </Link>
                      )}
                    </div>
                  </div>
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
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="cross"></div>
                    <div className="cross1"></div>
                    <div className="cross2"></div>
                    <div className="dot"></div>
                    <div className="dot1"></div>
                    <div className="maincircle"></div>
                    <div className="top-circle"></div>
                    <div className="center-circle"></div>
                    <div className="bottom-circle"></div>
                    <div className="bottom-circle1"></div>
                    <div className="right-circle"></div>
                    <div className="right-circle1"></div>
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
