import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import ModeProvider from "./context/mode";
import Signup from "./components/auth/signUp";
import Login from "./components/auth/login";
import * as serviceWorker from "./serviceWorker";
import Layout from "./components/sub-components/layout";
import Student from "./screens/student";
process.env.CI = false;
const routing = (
  <Router>
    <ModeProvider>
      <Layout>
        <div className="routes">
          <Route component={Student} />
        </div>
      </Layout>
      <Route
        exact
        path="/signup"
        component={(props) => Signup({ ...props, admin: false })}
      />
      <Route
        exact
        path="/school/create"
        component={(props) => Signup({ ...props, admin: true })}
      />
      <Route
        exact
        path="/login"
        component={(props) => Login({ ...props, admin: false })}
      />
      <Route
        exact
        path="/school/login"
        component={(props) => Login({ ...props, admin: true })}
      />
    </ModeProvider>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
