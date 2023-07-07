import React, { Fragment } from "react";
import LeftSide from "../../containers/leftSidebar";

const Dashboard = ({}) => {
  return (
    <Fragment>
      <div className="chitchat-container sidebar-toggle ">
        <LeftSide />
      </div>
    </Fragment>
  );
};

export default Dashboard;
