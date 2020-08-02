import React, { useEffect, useState } from "react";
import Header from "../sub-components/header";
import Tile from "../sub-components/tiles";
import Toast from "../sub-components/toast";
import styles from "../../css/examrecords.css";
const ExamRecords = (props) => {
  const sref = props.location.state.sref;
  const [exams, setExams] = useState([]);
  const [showToast, setToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const fetchExams = () => {
    const url = `http://localhost:3500/school/get/exams?sch=${sref}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExams(data.exams);
      });
  };
  const LinkTo = (eid) => {
    props.history.push("/dashboard/edit/exam", { sref: sref, exam: eid });
  };
  const deleteExam = (id) => {
    const url = `http://localhost:3500/school/exam/delete?sch=${sref}&exam=${id}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((res) => {
        if (res.code === 200) {
          setToastText(res.message);
          setToast(true);
          setExams((oldExams) => {
            const newExams = oldExams.filter((exam) => exam.id !== id);
            return newExams;
          });
        }
      });
  };
  useEffect(fetchExams, []);
  return (
    <section>
      {showToast && (
        <Toast isOpen={showToast} action={setToast} text={toastText} />
      )}
      <Header />
      <div className="title">
        <h1>Exam Records</h1>
      </div>
      <hr />
      <div>
        <ul className="quizzes-list list-ul">
          {exams.length &&
            exams.map((exam) => {
              return (
                <Tile title={exam.name} styles={styles}>
                  <button onClick={() => LinkTo(exam.id)}>edit</button>
                  <button>reg link</button>
                  <button>see candidate list</button>
                  <button
                    onClick={() => {
                      deleteExam(exam.id);
                    }}
                  >
                    delete
                  </button>
                </Tile>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default ExamRecords;
