import React, { useState, useEffect } from "react";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";

const DashboardContainer = () => {
  const [accountType, setAccountType] = useState("");
  useEffect(() => {
    setAccountType(localStorage.getItem(LOCAL_STORAGE_KEYS.ACC_TYPE));
  });
  return (
    <div className="container m-25">
      <h2>Welcome </h2>
      <h4>{accountType}</h4>
    </div>
  );
};

export default DashboardContainer;
