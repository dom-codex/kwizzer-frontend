import React from "react";
import Icon from "../../icon.svg";
import "../../css/menu-tile.css";

const Menutile = (props) => {
  return (
    <div className="tile">
      {props.subtile}
      <div className="tile-icon">
        <img src={Icon} style={{ height: 100 }} />
      </div>
      <div className="tile-desc">
        <p>{props.title}</p>
      </div>
    </div>
  );
};
export default Menutile;
