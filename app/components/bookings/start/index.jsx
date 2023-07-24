import React, {useContext, useEffect} from 'react';
import {HandleVideoCall} from '../../video/video';
import {SocketContext} from '../../socket';
import {EVENTS} from '../../../../helpers/events';
import { AccountType } from '../../../common/constants';

const StartMeeting = ({isClose, accountType, traineeInfo, trainerInfo}) => {
  const socket = useContext (SocketContext);

  socket.on (EVENTS.VIDEO_CALL.ON_CLOSE, () => {
    setTimeout (() => {
      // closing video call window in 5 sec
      isClose ();
    }, 3000);
  });

  return (
    <div>
      <div className="d-flex justify-content-end mr-3 full-height">
        <HandleVideoCall
        isClose={isClose}
          accountType={accountType}
          fromUser = {accountType === AccountType.TRAINEE ? traineeInfo: trainerInfo}
          toUser = {accountType === AccountType.TRAINEE ? trainerInfo: traineeInfo}
        />
      </div>
    </div>
  );
};

export default StartMeeting;
