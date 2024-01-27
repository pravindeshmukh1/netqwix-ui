import React, { useState, useEffect } from "react";
import { Utils } from "../../../../utils/utils";
import { getRecentStudent } from "../../NavHomePage/navHomePage.api";
import { LOCAL_STORAGE_KEYS } from "../../../common/constants";

const StudentDetail = ({ videoClips, data }) => {
  // useEffect(() => {
  //   console.log("Received Data in StudentDetail:", data);
  // }, [data]);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>This is your {data?.fullname} clips</h3>
      {videoClips?.length ?
        <div style={{ display: "flex", flexWrap: "wrap", margin: '20px 20px', overflow: 'auto', justifyContent: 'space-between' }}>
          {videoClips?.map((clp, index) => (
            <div key={`video_clip_${index}`}>
              <video controls style={{ width: "15vw", height: '30vh' }}>
                <source src={Utils?.generateVideoURL(clp)} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
        : <h5 style={{ margin: '40px 20px', textAlign: 'center' }}>No Clips Found.</h5>}
    </div>
  );
};

export default StudentDetail;
