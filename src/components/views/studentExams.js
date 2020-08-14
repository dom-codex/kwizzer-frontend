import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import QuizTile from "../sub-components/studentQuizTile";
import QuizOverView from "../sub-components/quizOverview";
import { fetchData } from "../../utils/storage";
const person = fetchData("person");
const StudentExams = (props) => {
  //const userIdentity = props.location.state;
  const [exams, setExams] = useState([]);
  const [showOverView, setOverView] = useState(false);
  const [overviewDATA, setOverviewData] = useState({});
  const [text, setText] = useState("Loading...!");
  const getExams = () => {
    const url = `http://localhost:3500/school/get/myexams?pid=${person}`;
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
      time: data.time,
      sheet: data.sheet,
      title: data.title,
      user: person,
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
                id={exam.ref}
                sheet={myexam.examsheet}
                title={exam.name}
                n={exam.nQuiz}
                isExam={true}
                showOverView={showOverview}
                completed={myexam.completed}
              >
                <li>created by : {exam.name}</li>
                <li>Total Quiz: {exam.nQuiz}</li>
              </QuizTile>
            );
          })
        ) : (
          <h1>{text}</h1>
        )}
      </div>
    </section>
  );
};

export default StudentExams;
