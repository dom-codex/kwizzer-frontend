import React from "react";
import { Route, Switch } from "react-router-dom";
import Result from "../components/views/result";
import Notification from "../components/views/notification";
import StudentExamList from "../components/views/studentQuizlist";
import MyExams from "../components/views/studentExams";
import Examination from "../components/views/examination";
import ExamSolution from "../components/views/solutions";
import Settings from "../components/views/settings";
import Page404 from "../components/views/404";
import Signup from "../components/auth/signUp";
import Login from "../components/auth/login";
import GetStarted from "../components/views/gettingstarted";
import Home from "../components/views/home";
import App from "../App";
const Student = (props) => {
  return (
    <section style={{ width: "100%" }}>
      <Switch>
        <Route exact path="/menu" component={App} />
        <Route exact path="/menu/notifications" component={Notification} />
        <Route exact path="/menu/quiz" component={StudentExamList} />
        <Route exact path="/menu/results" component={Result} />
        <Route exact path="/menu/examination" component={Examination} />
        <Route exact path="/myexam/solutions" component={ExamSolution} />
        <Route exact path="/menu/myexams" component={MyExams} />
        <Route exact path="/menu/settings" component={Settings} />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/signup"
          component={(props) => Signup({ ...props, admin: false })}
        />
        <Route
          exact
          path="/login"
          component={(props) => Login({ ...props, admin: false })}
        />
        <Route exact path="/getstarted" component={GetStarted} />
        <Route component={Page404} />
      </Switch>
    </section>
  );
};

export default Student;
