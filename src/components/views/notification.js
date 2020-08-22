import React, { useEffect, useState, useContext } from "react";
import Opensocket from "socket.io-client";
import { modeContext } from "../../context/mode";
import "../../css/notification.css";
import { fetchData } from "../../utils/storage";
const person = fetchData("person");
const Notification = (props) => {
  const { switchMode, setHeading } = useContext(modeContext);
  const [notification, setNotification] = useState([]);
  //  const pref = props.location.state.pid;
  const fetchNotifcations = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/get/notifications?student=${person}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setNotification(data.notifications);
      });
  };
  useEffect(() => {
    setHeading("Notifications");
    switchMode(true);
    fetchNotifcations();
    const socket = Opensocket(`${process.env.REACT_APP_HEAD}?ref=${person}`);
    socket.on("notify", (data) => {
      setNotification((prev) => {
        const details = {
          message: data.message,
          schoolName: data.schoolName,
          time: data.time,
        };
        return [details, ...prev];
      });
      socket.emit("studreceived", data.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="notification">
      {notification.length ? (
        notification.map((noti) => {
          return (
            <div className="notification-card">
              <div className="n-card-title">
                <h3>From {noti.schoolName}:</h3>
                <p>{noti.time}</p>
              </div>
              <div className="n-card-body">
                <p className="n-card-text">
                  {noti.message}
                  &nbsp; <a href="/menu">check it out</a>
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <h1>you don't have any notification</h1>
      )}
    </section>
  );
};
export default Notification;
