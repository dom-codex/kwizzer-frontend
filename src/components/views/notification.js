import React from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import "../../css/notification.css";
const Notification = (props) => {
  return (
    <section className="notification">
      <div className="showcase">
        <Header />
        <Jumbo title="Notifications" />
      </div>
      <div className="notification-card">
        <div className="n-card-title">
          <h3>From crystal academy:</h3>
          <p>3:44pm</p>
        </div>
        <div className="n-card-body">
          <p className="n-card-text">
            result for architecting with compute engine has been released.
            &nbsp; <a href="/menu">check it out</a>
          </p>
        </div>
      </div>
      <div className="notification-card">
        <div className="n-card-title">
          <h3>From crystal academy:</h3>
          <p>3:44pm</p>
        </div>
        <div className="n-card-body">
          <p className="n-card-text">
            result for architecting with compute engine has been released.
            &nbsp; <a href="/menu">check it out</a>
          </p>
        </div>
      </div>
      <div className="notification-card">
        <div className="n-card-title">
          <h3>From crystal academy:</h3>
          <p>3:44pm</p>
        </div>
        <div className="n-card-body">
          <p className="n-card-text">
            result for architecting with compute engine has been released.
            &nbsp; <a href="/menu">check it out</a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Notification;
