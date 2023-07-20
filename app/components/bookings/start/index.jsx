import React from 'react';
import {Link, Phone} from 'react-feather';
import {HandleVideoCall} from '../../video/video';

const StartMeeting = ({isClose}) => {
  return (
    <div>
      <div className="d-flex justify-content-end mr-3 full-height">
        <HandleVideoCall />
        <div className="call-action-buttons">
          <div
            className="icon-btn btn-danger button-effect btn-xl is-animating"
            onClick={() => {
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
