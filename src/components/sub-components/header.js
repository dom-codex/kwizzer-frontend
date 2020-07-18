import React from "react";
import "../../css/header.css";
function Header(props) {
  return (
    <div className="showcase-nav">
      <div className="showcase-nav1">
        <button>menu</button>
      </div>
      <div className="showcase-nav2">
        <p className="app-name">Learned</p>
      </div>
    </div>
  );
}
export default Header;
