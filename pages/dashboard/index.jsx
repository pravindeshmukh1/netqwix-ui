import React, { Fragment, useState, useEffect } from "react";
import LeftSide from "../../containers/leftSidebar";
import { LOCAL_STORAGE_KEYS } from "../../app/common/constants";

const Dashboard = ({}) => {
  const [accountType, setAccountType] = useState("")

  useEffect(() => {
   setAccountType(localStorage.getItem( LOCAL_STORAGE_KEYS.ACC_TYPE))
  })
  
  return (
    <Fragment>
      <div className="chitchat-container sidebar-toggle ">
        <LeftSide />
        <div className="chitchat-main small-sidebar" id="content" style={{  textAlign: 'center', top: "300px"}}>
          <h1>Welcome {accountType}</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
