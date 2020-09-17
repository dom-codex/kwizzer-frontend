import React, { useContext } from "react";
import Header from "../sub-components/header";
import { modeContext } from "../../context/mode";
import Logo1 from "../../assets/kwi-lo.jpg";
import "../../css/layout.css";
const Layout = (props) => {
  const { heading } = useContext(modeContext);
  return (
    <div>
      <Header heading={heading} />
      <div
        className="side-panel-cont"
        onClick={() => {
          const sidepane = document.querySelector(".side-panel-cont");
          sidepane.classList.remove("side-panel-slide");
        }}
      >
        <div className="side-panel">
          <div className="side-panel-logo">
            <img src={Logo1} alt="logo" />
          </div>
          <ul className="side-link">
            <li>
              <a href={"/menu"}>
                <i className="material-icons">home</i> <div>Home</div>
              </a>
            </li>
            <li>
              <a href={"/menu/notifications"}>
                <i className="material-icons">notifications</i>
                <div>Notifications</div>
              </a>
            </li>
            <li>
              <a href={"/menu/myexams"}>
                <i className="material-icons">list_alt</i>
                <div>My exams</div>
              </a>
            </li>
            <li>
              <a href={"/menu/results"}>
                <i className="material-icons">wysiwyg</i>
                <div>results</div>
              </a>
            </li>
            {/*<li style={{ zIndex: 90 }}>
              <a href="/settings">
                {" "}
                <i className="material-icons">settings</i>
                <div>settings</div>
              </a>
            </li>/*/}
          </ul>
        </div>
      </div>
      <div className="layout-body">{props.children}</div>
    </div>
  );
};

export default Layout;
