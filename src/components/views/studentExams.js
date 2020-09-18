import React, { useState, useEffect, useContext } from "react";
import { modeContext } from "../../context/mode";
import QuizTile from "../sub-components/studentQuizTile";
import QuizOverView from "../sub-components/quizOverview";
import Toast from "../sub-components/toast";
import Loading from "../sub-components/Loading";
import "../../css/examlist.css";
import { fetchData } from "../../utils/storage";
const StudentExams = (props) => {
  const person = fetchData("person");
  const { setHeading } = useContext(modeContext);
  //const userIdentity = props.location.state;
  const [exams, setExams] = useState([]);
  const [showOverView, setOverView] = useState(false);
  const [overviewDATA, setOverviewData] = useState({});
  const [text, setText] = useState("Loading...");
  const [showToast, setToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const getExams = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/get/myexams?pid=${person}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 403) {
          setText("Candidate not found");
          return setLoading(false);
        }
        if (!data.exams.length) {
          setText("You haven't applied for any examination");
          setLoading(false);
        }
        setLoading(false);

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
  useEffect(() => {
    setHeading("Exams");
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="examinations">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Toast
            isOpen={showToast}
            action={setToast}
            text={"cannot start exam now"}
            styles={{}}
            animate={"showToast"}
            main={"toast"}
            top={{ bottom: "28px" }}
          />
          {showOverView && (
            <QuizOverView
              data={overviewDATA}
              isExam={true}
              heading={"Exam"}
              type={"Quiz"}
              linkTo={linkTo}
              route={"/menu/examination"}
              closeOverview={() => setOverView(false)}
            />
          )}
          <div className="content">
            <ul>
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
                      canStart={exam.canStart}
                      completed={myexam.completed}
                      canRetake={myexam.canRetake}
                    >
                      <div>created by : {myexam.school.name}</div>
                      <div>Total Quiz: {exam.nQuiz}</div>
                    </QuizTile>
                  );
                })
              ) : (
                <h1>{text}</h1>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentExams;
