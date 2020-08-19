import React, { useEffect, useState } from "react";
import Opensocket from "socket.io-client";
import Layout from "../sub-components/layout";
import Jumbo from "../sub-components/Jumbo";
import "../../css/notification.css";
import { fetchData } from "../../utils/storage";
const person = fetchData("person");
const Notification = (props) => {
  const [notification, setNotification] = useState([]);
  //  const pref = props.location.state.pid;
  const fetchNotifcations = () => {
    const url = `http://localhost:3500/school/get/notifications?student=${person}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setNotification(data.notifications);
      });
  };
  useEffect(() => {
    fetchNotifcations();
    const socket = Opensocket(`http://localhost:3500?ref=${person}`);
    socket.on("notify", (data) => {
      setNotification((prev) => {
        const details = {
          message: data.message,
          schoolName: data.schoolName,
          time: "3.44pm",
        };
        return [details, ...prev];
      });
    });
  }, []);
  return (
    <Layout>
      <section className="notification">
        <div className="showcase">
          <Jumbo title="Notifications" />
          <hr />
        </div>
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
    </Layout>
  );
};
export default Notification;
