import React from "react";
import "../../css/dialog.css";
const Dialog = (props) => {
  return (
    <div className="dialog">
      <div className="dialog-content">
        <div className="dialog-title">
          <h2>{props.title}</h2>
        </div>
        <div className="dialog-body">
          <p className="dialog-text">{props.text}</p>
        </div>
        <div className="dialog-controls">
          <button onClick={props.action}>OK</button>
        </div>
      </div>
    </div>
  );
};
export default Dialog;
