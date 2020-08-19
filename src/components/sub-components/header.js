import React, { useState, useEffect } from "react";
import "../../css/header.css";
import Image from "../../assets/notification.svg";
import { fetchData } from "../../utils/storage";
import Opensocket from "socket.io-client";

let ref;
function Header(props) {
  const [notifications, setNotifications] = useState(0);
  const fetchNewNotifications = () => {
    ref = fetchData("person");
    let url = `http://localhost:3500/school/students/new/notifications?pref=${ref}`;
    if (!props.user) {
      ref = fetchData("school");
      url = `http://localhost:3500/school/admin/new/notifications?sref=${ref}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setNotifications(data.notifications);
        } else {
          setNotifications(0);
        }
      });
  };
  useEffect(() => {
    fetchNewNotifications();
    if (props.user) {
      ref = fetchData("person");
    } else {
      ref = fetchData("school");
    }
    const socket = Opensocket(`http://localhost:3500?ref=${ref}`);
    socket.on("clear", () => {
      setNotifications(0);
    });
  }, []);
  return (
    <div className="showcase-nav">
      <div className="logo">
        <p>Q</p>
      </div>
      <div className="showcase-nav2">
        <a
          href={props.user ? "/menu/notifications" : "/admin/notifications"}
          className="notifications"
        >
          <span style={notifications ? { backgroundColor: "orangered" } : {}}>
            {notifications}
          </span>
          <img src={Image} style={{ height: "50px" }} />
        </a>
      </div>
    </div>
  );
}
export default Header;
