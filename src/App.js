import React from "react";
//import logo from "./logo.svg";
import Menu from "./components/views/menu";
import { withRouter } from "react-router-dom";

import "./App.css";
function App(props) {
  return (
    <div className="App">
      <Menu routes={props} />
    </div>
  );
}
export default withRouter(App);
