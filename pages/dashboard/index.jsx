import React, { Fragment, useState, useEffect } from "react";
import LeftSide from "../../containers/leftSidebar";
import ChitChat from "../../containers/chatBoard";
import RightSide from "../../containers/rightSidebar";
import { useAppSelector } from "../../app/store";
import { authState } from "../../app/components/auth/auth.slice";
import DashboardContainer from "../../app/components/dashboard";

const Dashboard = () => {
  const { sidebarActiveTab } = useAppSelector(authState);
  return (
    <Fragment>
      <div className="chitchat-container sidebar-toggle ">
        <LeftSide />
        {sidebarActiveTab === "chats" && (
          <React.Fragment>
            <ChitChat />
            <RightSide />
          </React.Fragment>
        )}
        {sidebarActiveTab === "home" && <DashboardContainer />}
      </div>
    </Fragment>
  );
};

export default Dashboard;
