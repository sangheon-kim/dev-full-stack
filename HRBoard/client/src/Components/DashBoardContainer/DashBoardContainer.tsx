import React from "react";
import "./DashBoardContainer.scss";

type Props = {
  size: string;
};

const DashBoardContainer: React.FC<Partial<Props>> = (props) => {
  const { size } = props;
  return (
    <div className={`DashBoardContainer ${size}`}>
      <span>123</span>
    </div>
  );
};

export default DashBoardContainer;
