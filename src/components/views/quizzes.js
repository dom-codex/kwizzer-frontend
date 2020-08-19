import React, { useState, useEffect } from "react";
import Layout from "../sub-components/layout";
import QuizTile from "../sub-components/quiz-tile";
import Toast from "../sub-components/toast";
import "../../css/quizzes.css";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const QuizList = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isToast, setToast] = useState(false);
  const [toastTEXT, setTEXT] = useState("");
  const { user } = props;
  //sref = props.location.state.sref;
  //retrieve id(sch ref)
  //const { search } = props.location;
  //const id = search.split("=")[1];
  const fetchAllQuiz = () => {
    const url = `http://localhost:3500/school/class/quiz/all?sid=${school}`;
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
  const publish = (ref) => {
    const url = `http://localhost:3500/school/quiz/publish`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: ref }),
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
    const url = `http://localhost:3500/school/quiz/delete?quid=${quid}&sid=${school}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.code === 403) {
          setTEXT(data.message);
          setToast(true);
          return;
        }
        if (data.code === 201) {
          setTEXT(data.message);
          setToast(true);
          setQuizzes((prev) => {
            const quizzes = prev.filter((quiz) => quiz.ref !== quid);
            return quizzes;
          });
        }
      });
  };
  return (
    <Layout>
      <section className="quizzes">
        {isToast && (
          <Toast
            isOpen={isToast}
            text={toastTEXT}
            action={setToast}
            animate={"showToast"}
            main={"toast"}
            top={{ bottom: "25px" }}
          />
        )}
        <div className="quizzes-list">
          <div className="quizzes-title">
            <h2>Quizzes</h2>
            <hr />
            <div className="quizzes-heading">
              <p>s/n</p>
              <p>name</p>
              <p>questions</p>
              <p>published</p>
            </div>
            {!quizzes.length ? (
              <h1>NO quiz</h1>
            ) : (
              <ul>
                {quizzes.map((quiz) => {
                  return (
                    <QuizTile
                      key={quiz.ref}
                      school={school}
                      history={props.history}
                      quiz={quiz}
                      user={user}
                      showOverview={props.showOverView}
                      publish={() => publish(quiz.ref)}
                      delete={() => {
                        deleteQuiz(quiz.ref);
                      }}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default QuizList;
