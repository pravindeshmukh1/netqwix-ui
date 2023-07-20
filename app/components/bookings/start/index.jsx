import React, { useContext } from 'react';
import {Link, Phone} from 'react-feather';
import {HandleVideoCall} from '../../video/video';
import { SocketContext } from '../../socket';
import { EVENTS } from '../../../../helpers/events';

const StartMeeting = ({isClose}) => {
  const socket = useContext(SocketContext);


  return (
    <div>
      <div className="d-flex justify-content-end mr-3 full-height">
        <HandleVideoCall />
        <div className="call-action-buttons z-50">
          <div
            className="icon-btn btn-danger button-effect btn-xl is-animating"
            onClick={() => {
              socket.emit(EVENTS.VIDEO_CALL.ON_CLOSE)
              isClose ();
            }}
          >
            <Phone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMeeting;
