import React, { useState, useEffect, useContext } from "react";
import { modeContext } from "../../context/mode";
import QuizTile from "../sub-components/quiz-tile";
import Toast from "../sub-components/toast";
import Dialog from "../sub-components/dialog";
import "../../css/quizzes.css";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const QuizList = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isToast, setToast] = useState(false);
  const [toastTEXT, setTEXT] = useState("");
  const [showDialog, setDialog] = useState(false);
  const [quizRef, setQuizRef] = useState("");
  const { user } = props;
  //sref = props.location.state.sref;
  //retrieve id(sch ref)
  //const { search } = props.location;
  //const id = search.split("=")[1];
  const fetchAllQuiz = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/class/quiz/all?sid=${school}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const quizzes = res.quizzes;
        setQuizzes(quizzes);
      });
  };
  const { switchMode, setHeading } = useContext(modeContext);
  useEffect(() => {
    setHeading("Quizzes");
    switchMode(false);
    fetchAllQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const publish = (ref) => {
    const url = `${process.env.REACT_APP_HEAD}/school/quiz/publish`;
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
          fetchAllQuiz();
          return;
        }
        setTEXT(res.message);
        setToast(true);
      });
  };
  const deleteQuiz = (quid) => {
    const url = `${process.env.REACT_APP_HEAD}/school/quiz/delete?quid=${quid}&sid=${school}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.code === 403) {
          setTEXT(data.message);
          setDialog(false);
          setToast(true);
          return;
        }
        if (data.code === 201) {
          setTEXT(data.message);
          setToast(true);
          setDialog(false);
          setQuizzes((prev) => {
            const quizzes = prev.filter((quiz) => quiz.ref !== quid);
            return quizzes;
          });
        }
      });
  };
  return (
    <section className="quizzes">
      {showDialog && (
        <Dialog
          title={"Are you sure?"}
          text={"you want to delete this quiz"}
          showCancel={true}
          auxAction={() => setDialog(false)}
          action={() => deleteQuiz(quizRef)}
        />
      )}
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
              {quizzes.map((quiz, i) => {
                return (
                  <QuizTile
                    key={quiz.ref}
                    sn={i + 1}
                    school={school}
                    history={props.history}
                    quiz={quiz}
                    user={user}
                    showOverview={props.showOverView}
                    publish={() => publish(quiz.ref)}
                    delete={() => {
                      setQuizRef(quiz.ref);
                      setDialog(true);
                    }}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
export default QuizList;
