import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import svg from "../assets/kwi.svg";
import "../private/privateroute.css";
import { fetchData } from "../utils/storage";
const validatePerson = (pid, isAuthenticated, isLoading) => {
  const url = `${process.env.REACT_APP_HEAD}/validate/student?ref=${pid}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      if (result.isAuthenticated) {
        isAuthenticated(true);
        isLoading(false);
      } else {
        isAuthenticated(false);
        isLoading(false);
      }
    });
};
export default (props) => {
  const person = fetchData("person");
  const [authenticated, isAuthenticated] = useState(false);
  const [loading, isLoading] = useState(true);
  const ComponentToRender = props.component;
  useEffect(() => {
    validatePerson(person, isAuthenticated, isLoading);
  }, []);
  const componentToShow = authenticated ? (
    <ComponentToRender />
  ) : loading ? (
    <section className="auth-load">
      <img src={svg} alt="app-logo" />
    </section>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
  return componentToShow;
};
