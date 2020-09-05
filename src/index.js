import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import ModeProvider from "./context/mode";
import Signup from "./components/auth/signUp";
import Login from "./components/auth/login";
import * as serviceWorker from "./serviceWorker";
import QuestionEditor from "./components/views/quiz-editor";
import Registration from "./components/views/registration";
import Layout from "./components/sub-components/layout";
import Examiner from "./screens/examiner";
import Student from "./screens/student";
process.env.CI = false;
const routing = (
  <Router>
    <ModeProvider>
      <Layout>
        <div className="routes">
          <Route component={Examiner} />
          <Route component={Student} />
        </div>
      </Layout>
      {/*<Layout>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route
          exact
          path="/dashboard/create/quiz"
          component={QuizCreationWindow}
        />
        <Route
          exact
          path="/admin/notifications"
          component={AdminNotifications}
        />
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
        <Route exact path="/dashboard/set/exam" component={NewExam} />
        <Route exact path="/dashboard/exam/records" component={ExamRecords} />
        <Route exact path="/dashboard/edit/exam" component={EditExam} />
        {/*student routes*
        <Route exact path="/menu" component={App} />
        <Route
          exact
          path="/exam/register/:sch/:quiz"
          component={Registration}
        />
        <Route exact path="/menu/results" component={Result} />
        <Route exact path="/menu/notifications" component={Notification} />

        <Route exact path="/menu/quiz" component={StudentQuizList} />
        <Route exact path="/menu/questions" component={Question} />
        <Route exact path="/quiz/solutions" component={QuizSolution} />
        <Route exact path="/menu/myexams" component={MyExams} />
      </Layout>
        <Route exact path="/menu/examination" component={Examination} />*/}
      <Route exact path="/exam/register/:sch/:quiz" component={Registration} />
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
      <Route
        exact
        path="/dashboard/question/:quiz"
        component={QuestionEditor}
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
