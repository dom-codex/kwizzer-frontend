import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import QuizTile from "../sub-components/quiz-tile";
import Toast from "../sub-components/toast";
import "../../css/quizzes.css";
let sref;
const QuizList = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isToast, setToast] = useState(false);
  const [toastTEXT, setTEXT] = useState("");
  const { user } = props;
  sref = props.location.state.sref;
  //retrieve id(sch ref)
  const { search } = props.location;
  const id = search.split("=")[1];
  const fetchAllQuiz = () => {
    const url = `http://localhost:3500/school/class/quiz/all?sid=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const quizzes = res.quizzes;
        setQuizzes(quizzes);
      });
  };
  useEffect(() => {
    fetchAllQuiz();
  }, []);
  const publish = (id) => {
    const url = `http://localhost:3500/school/quiz/publish`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res.code === 400) {
          setTEXT(res.message);
          setToast(true);
          return;
        }
        setTEXT(res.message);
        setToast(true);
      });
  };
  const deleteQuiz = (quid) => {
    const url = `http://localhost:3500/school/quiz/delete?quid=${quid}&sid=${id}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.code === 201) {
          setTEXT(data.message);
          setToast(true);
          setQuizzes((prev) => {
            const quizzes = prev.filter((quiz) => quiz.id !== quid);
            return quizzes;
          });
        }
      });
  };
  return (
    <section className="quizzes">
      {isToast && <Toast isOpen={isToast} text={toastTEXT} action={setToast} />}
      <div className="showcase">
        <Header />
        <Jumbo title={"Quizzes"} />
      </div>
      <div className="quizzes-list">
        <div className="title">
          <h2>List</h2>
          {!quizzes.length ? (
            <h1>NO quiz</h1>
          ) : (
            quizzes.map((quiz) => {
              return (
                <QuizTile
                  key={quiz.id}
                  school={id}
                  history={props.history}
                  quiz={quiz}
                  user={user}
                  showOverview={props.showOverView}
                  publish={() => publish(quiz.id)}
                  delete={() => {
                    deleteQuiz(quiz.id);
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
export default QuizList;
