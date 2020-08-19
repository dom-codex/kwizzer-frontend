import React from "react";
import Header from "../sub-components/header";

import "../../css/layout.css";
const Layout = (props) => {
  return (
    <div>
      <Header user={props.user} />
      <div className="side-panel">
        <div className="side-panel-logo">Q</div>
        <ul>
          <li className="glass">
            <a href={props.user ? "/menu" : "/dashboard"}>Home</a>
          </li>
          <li>
            <a
              href={props.user ? "/menu/notifications" : "/admin/notifications"}
            >
              Notification
            </a>
          </li>
          <li>
            <a href="/settings">settings</a>
          </li>
        </ul>
      </div>
      <div className="body">{props.children}</div>
    </div>
  );
};

export default Layout;
