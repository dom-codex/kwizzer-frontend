import React from "react";
import { Route } from "react-router-dom";
import Result from "../components/views/result";
import Notification from "../components/views/notification";
import StudentExamList from "../components/views/studentQuizlist";
import MyExams from "../components/views/studentExams";
import Examination from "../components/views/examination";
import ExamSolution from "../components/views/solutions";
import App from "../App";
const Student = (props) => {
  return (
    <section style={{ width: "100%" }}>
      <Route exact path="/menu" component={App} />
      <Route exact path="/menu/notifications" component={Notification} />
      <Route exact path="/menu/quiz" component={StudentExamList} />
      <Route exact path="/menu/results" component={Result} />
      <Route exact path="/menu/examination" component={Examination} />
      <Route exact path="/quiz/solutions" component={ExamSolution} />
      <Route exact path="/menu/myexams" component={MyExams} />
    </section>
  );
};

export default Student;
