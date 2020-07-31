import React from "react";
import "../../css/toggle.css";

const Switch = (props) => {
  const { toggle } = props;
  return (
    <div className="switch">
      <input
        type="checkbox"
        id="switch"
        class="checkbox"
        checked={toggle ? true : false}
        onChange={() =>
          props.setToggle((prev) => {
            props.handleInput({ target: { value: !prev } }, "retry");
            return !prev;
          })
        }
      />
      <label for="switch" class="toggle"></label>
    </div>
  );
};

export default Switch;
