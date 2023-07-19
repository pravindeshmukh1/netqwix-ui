import React from "react";

const StartMeeting = ({ isClose }) => {
  return (
    <div>
      <div className="d-flex justify-content-end mr-3">
        <h2
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={isClose}
        >
          &times;
        </h2>
      </div>
    </div>
  );
};

export default StartMeeting;
