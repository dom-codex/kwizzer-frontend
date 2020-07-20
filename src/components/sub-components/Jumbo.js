import React from "react";
import "../../css/jumbo.css";
function Jumbo(props) {
  return (
    <div className="jumbo-greeting">
      <div class="user-name">
        <h1>{props.title}</h1>
        <p className="jumbo-info">{props.desc}</p>
      </div>
    </div>
  );
}
export default Jumbo;
