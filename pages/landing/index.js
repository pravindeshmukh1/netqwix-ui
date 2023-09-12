import React, { useEffect, useState } from "react";
import Slider from "./sliderSection";
import Header from "../common/header";
import AboutApp from "./aboutApp";
import AboutChitChat from "./aboutChitChat";
import TeamWork from "./teamWork";
import Collaboration from "./collaboration";
import TeamExpert from "./teamExpert";
import SecureApp from "./secureApp";
import PricePlan from "./pricePlan";
import Subscribe from "./subscribe";
import Footer from "../common/footer";
import TapTop from "../common/tapTop";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  getMasterDataAsync,
  masterState,
} from "../../app/components/master/master.slice";
import LandingHeader from "./landingHeader";
import { Container } from "reactstrap";
import Category from "./category";
import { divide } from "lodash";
import Course from "./course";

const Landing = () => {
  const masterRecords = useAppSelector(masterState).master;
  const dispatch = useAppDispatch();
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getMasterDataAsync());
  }, []);

  useEffect(() => {
    setData(masterRecords.masterData);
  }, [masterRecords]);

  return (
    // <div>
    //   <Header />
    //   <Slider />
    //   <AboutApp />
    //   <AboutChitChat />
    //   <TeamWork />
    //   <SecureApp />
    //   <Collaboration />
    //   <TeamExpert />
    //   <PricePlan />
    //   <Subscribe />
    //   <Footer />
    //   <TapTop />
    //       </div>

    <>
      <LandingHeader masterRecords={data} />
      <div class="dropdown-divider"></div>
      <div class="container">
        <Category masterRecords={data} />
      </div>
      <Course />
    </>
  );
};

export default Landing;
