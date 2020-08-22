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
    let url = `${process.env.REACT_APP_HEAD}/school/students/new/notifications?pref=${ref}`;
    if (!props.user) {
      ref = fetchData("school");
      url = `${process.env.REACT_APP_HEAD}/school/admin/new/notifications?sref=${ref}`;
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
  });
  useEffect(() => {
    const socket = Opensocket(`${process.env.REACT_APP_HEAD}?ref=${ref}`);
    socket.on("clear", () => {
      setNotifications(0);
    });
    socket.on("notify", () => {
      setNotifications((prev) => prev + 1);
    });
  }, []);
  return (
    <div className="showcase-nav">
      <div
        className="menu-icon"
        onClick={() => {
          const sidepane = document.querySelector(".side-panel-cont");
          sidepane.classList.add("side-panel-slide");
        }}
      >
        <i className="material-icons">menu</i>
      </div>
      <div className="heading">{props.heading}</div>
      <div className="showcase-nav2">
        <a
          href={props.user ? "/menu/notifications" : "/admin/notifications"}
          className="notifications"
        >
          <span style={notifications ? { backgroundColor: "orangered" } : {}}>
            {notifications}
          </span>
          <i
            style={{ fontSize: "3.2em", color: "#ccc" }}
            className="material-icons"
          >
            campaign
          </i>
        </a>
      </div>
    </div>
  );
}
export default Header;
