import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Signup from "./components/auth/signUp";
import Login from "./components/auth/login";
import * as serviceWorker from "./serviceWorker";
import Dashboard from "./components/views/dashboard";
import ScoreBoard from "./components/views/scoreboard";
import Quizzes from "./components/views/quizzes";
import QuizList from "./components/views/quizlist";
import QuestionEditor from "./components/views/quiz-editor";
import Candidates from "./components/views/candidates";
import Result from "./components/views/result";
import Notification from "./components/views/notification";
import StudentQuizList from "./components/views/studentQuizlist";
import Question from "./components/views/Questions";
import Registration from "./components/views/registration";
import CandidatesResult from "./components/views/candidatesResult";
import CandidatesResults from "./components/views/candidatesResult";
const routing = (
  <Router>
    <div>
      <Route exact path="/menu" component={App} />
      <Route exact path="/quiz/register/:sch/:quiz" component={Registration} />
      <Route exact path="/menu/results" component={Result} />
      <Route exact path="/menu/notifications" component={Notification} />
      <Route exact path="/menu/quiz" component={StudentQuizList} />
      <Route exact path="/menu/questions" component={Question} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/admin/auth" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/auth" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/scoreboard" component={ScoreBoard} />
      <Route exact path="/dashboard/quizzes" component={Quizzes} />
      <Route exact path="/dashboard/quizzes/list" component={QuizList} />
      <Route
        exact
        path="/dashboard/question/:quiz"
        component={QuestionEditor}
      />
      <Route exact path="/dashboard/candidates" component={Candidates} />
      <Route
        exact
        path="/dashboard/mycandidates/result"
        component={CandidatesResults}
      />
    </div>
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
