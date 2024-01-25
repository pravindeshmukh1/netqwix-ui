import React, { useState, useEffect } from "react";
import { Utils } from "../../../../utils/utils";
import { getRecentStudent } from "../../NavHomePage/navHomePage.api";
import { LOCAL_STORAGE_KEYS } from "../../../common/constants";

const StudentDetail = ({ videoClips, data }) => {
  useEffect(() => {
    console.log("Received Data in StudentDetail:", data);
    // Additional code...
  }, [data]);


  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>This is your {data?.fullname} clips</h3>
      <div style={{ display: "flex", flexWrap: "wrap", margin: '20px 20px', overflow: 'auto', justifyContent: 'space-between' }}>
        {videoClips?.map((clp, index) => (
          <div key={`video_clip_${index}`}>
            <video controls width="200" height="100">
              <source src={Utils?.generateVideoURL(clp)} type="video/mp4" />

            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetail;
