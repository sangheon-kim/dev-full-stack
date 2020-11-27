import React from "react";
import dashBoardIcon from "../assets/Icons/dashboard.svg";

const MainContainer: React.FC = () => {
  return (
    <div className="">
      <object data={dashBoardIcon} type="image/svg+xml" aria-label="dashboard-icon" width="40" height="40"></object>
    </div>
  );
};

export default MainContainer;
