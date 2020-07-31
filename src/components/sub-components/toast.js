import React from "react";
import "../../css/toast.css";
const Toast = (props) => {
  if (props.isOpen) {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      props.action(false);
    }, 2800);
  }
  return (
    <div className="toast">
      <div className="toast-content">
        <p className="toast-text">{props.text}</p>
      </div>
    </div>
  );
};

export default Toast;
