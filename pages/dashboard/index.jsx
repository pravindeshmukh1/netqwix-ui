import React, {Fragment, useState, useEffect} from 'react';
import LeftSide from '../../containers/leftSidebar';
import ChitChat from '../../containers/chatBoard';
import RightSide from '../../containers/rightSidebar';
import {useAppSelector} from '../../app/store';
import {authState} from '../../app/components/auth/auth.slice';
import {
  AccountType,
  LOCAL_STORAGE_KEYS,
  leftSideBarOptions,
} from '../../app/common/constants';
import TraineeDashboardContainer from '../../app/components/trainee/dashboard';
import TrainerDashboardContainer from '../../app/components/trainer/dashboard';
import ScheduleInventory from '../../app/components/trainer/scheduleInventory';
import Bookings from '../../app/components/bookings';
import {SocketContext, getSocket} from '../../app/components/socket';
const Dashboard = () => {
  const {sidebarActiveTab} = useAppSelector (authState);
  const [accountType, setAccountType] = useState ('');

  useEffect (() => {
    setAccountType (localStorage.getItem (LOCAL_STORAGE_KEYS.ACC_TYPE));
  }, []);

  const getDashboard = () => {
    switch (accountType) {
      case AccountType.TRAINEE:
        return <TraineeDashboardContainer />;
      case AccountType.TRAINER:
        return <TrainerDashboardContainer accountType={accountType} />;
    }
  };

  const getScheduledInventory = () => {
    return accountType === AccountType.TRAINEE
      ? <Bookings accountType={accountType} />
      : <ScheduleInventory />;
  };
  const getActiveTabs = () => {
    switch (sidebarActiveTab) {
      case leftSideBarOptions.CHATS:
        return (
          <React.Fragment>
            <ChitChat />
            <RightSide />
          </React.Fragment>
        );
      case leftSideBarOptions.HOME:
        return getDashboard ();

      case leftSideBarOptions.SCHEDULE_TRAINING:
        return getScheduledInventory ();
      default:
        break;
    }
  };

  return (
    // TODO: move socket to root folder
    <SocketContext.Provider value={getSocket ()}>
      <Fragment>
        <div className="chitchat-container sidebar-toggle ">
          <LeftSide />
          {getActiveTabs ()}
        </div>
      </Fragment>
    </SocketContext.Provider>
  );
};

export default Dashboard;
