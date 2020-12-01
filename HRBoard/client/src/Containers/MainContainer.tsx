import DashBoardContainer from "Components/DashBoardContainer/DashBoardContainer";
import React from "react";
import "./MainContainer.scss";

const MainContainer: React.FC = () => {
  return (
    <div className="MainContainer">
      <DashBoardContainer size="medium"></DashBoardContainer>
      <DashBoardContainer size="medium"></DashBoardContainer>
      <DashBoardContainer size="large"></DashBoardContainer>
      <DashBoardContainer size="small"></DashBoardContainer>
      <DashBoardContainer size="small"></DashBoardContainer>
      <DashBoardContainer size="small"></DashBoardContainer>
    </div>
  );
};

export default MainContainer;
