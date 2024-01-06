import React from 'react';
import { Link, X } from "react-feather";

const PopupContent = ({ onClose, userInfo, Logout }) => (
  <div className="popup" style={{ position: 'absolute', top: '30px', right: '50px', zIndex: "10" }}>
    <div className="card rounded trainer-profile-card" style={{ width: "350px", height: "auto" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <img
              src={userInfo?.profile_picture}
              alt="trainer_image"
              className="rounded trainer-profile"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
            <div className="media-body media-body text-right" style={{ position: "absolute", top: '-20px', right: '-3px' }}>
              <div
                className="icon-btn btn-sm btn-outline-light close-apps pointer"
                onClick={onClose}
              >
                <X />
              </div>
            </div>
          </div>
          <div className="col-12 text-center mt-3">
            <h3>{userInfo?.fullname}</h3>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{
                width: "82px",
                padding: "11px",
                alignItems: "center",
                fontSize: "14px",
                color: "white",
                cursor: "pointer",
                marginTop: "10px"
              }}
              onClick={() => { Logout() }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default PopupContent;
