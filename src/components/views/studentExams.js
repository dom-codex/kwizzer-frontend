import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import QuizTile from "../sub-components/studentQuizTile";
import QuizOverView from "../sub-components/quizOverview";
const StudentExams = (props) => {
  const userIdentity = props.location.state;
  const [exams, setExams] = useState([]);
  const [showOverView, setOverView] = useState(false);
  const [overviewDATA, setOverviewData] = useState({});
  const getExams = () => {
    const url = `http://localhost:3500/school/get/myexams?pid=${userIdentity.pid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExams(data.exams);
      });
  };
  const linkTo = (route, data) => {
    props.history.push(route, {
      quiz: data.quiz,
      sch: data.sch,
      time: data.time,
      title: data.title,
      user: userIdentity,
      retry: data.retry,
      isEmail: true,
    });
  };
  const showOverview = (choice, data) => {
    setOverviewData(data);
    setOverView(choice);
  };
  useEffect(getExams, []);
  return (
    <section className="examinations">
      {showOverView && (
        <QuizOverView
          data={overviewDATA}
          isExam={true}
          heading={"Exam time"}
          type={"Quiz"}
          linkTo={linkTo}
          route={"/menu/examination"}
          closeOverview={() => setOverView(false)}
        />
      )}
      <Header />
      <div className="content">
        {exams.length ? (
          exams.map((myexam, i) => {
            const { exam } = myexam;
            return (
              <QuizTile
                key={i}
                quiz={exam}
                id={myexam.examId}
                title={exam.name}
                n={exam.nQuiz}
                showOverView={showOverview}
              >
                <li>created by : {exam.name}</li>
                <li>Total Quiz: {exam.nQuiz}</li>
              </QuizTile>
            );
          })
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </section>
  );
};

export default StudentExams;
