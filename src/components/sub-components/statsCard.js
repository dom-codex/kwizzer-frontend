import React from "react";
import "../../css/showcase.css";
const statsCard = (props) => {
  return (
    <div className={`${props.class} stat`}>
      <div>
        <p>{props.title}</p>
      </div>
      <div className="stats-value">{props.value}</div>
      {props.children}
    </div>
  );
};

export default statsCard;
