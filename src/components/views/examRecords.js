import React, { useEffect, useState } from "react";
import Layout from "../sub-components/layout.js";
import Tile from "../sub-components/tiles";
import Toast from "../sub-components/toast";
import Dialog from "../sub-components/dialog";
import styles from "../../css/examrecords.css";
import Styles from "../../css/tile.module.css";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const ExamRecords = (props) => {
  const [exams, setExams] = useState([]);
  const [showToast, setToast] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [examId, setExamId] = useState("");
  const [toastText, setToastText] = useState("");
  const fetchExams = () => {
    const url = `http://localhost:3500/school/get/exams?sch=${school}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExams(data.exams);
      });
  };
  const LinkTo = (eid) => {
    props.history.push("/dashboard/edit/exam", { exam: eid });
  };
  const deleteExam = () => {
    const url = `http://localhost:3500/school/exam/delete?sch=${school}&exam=${examId}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((res) => {
        setDialog(false);
        if (res.code === 200) {
          setToastText(res.message);
          setToast(true);
          setExams((oldExams) => {
            const newExams = oldExams.filter((exam) => exam.ref !== examId);
            return newExams;
          });
        }
      });
  };
  useEffect(fetchExams, []);
  return (
    <Layout>
      <section className="exam-records">
        {showDialog && (
          <Dialog
            title={"Are you sure?"}
            text={"you want to delete this exam"}
            showCancel={true}
            auxAction={() => setDialog(false)}
            action={deleteExam}
          />
        )}
        {showToast && (
          <Toast isOpen={showToast} action={setToast} text={toastText} />
        )}

        <div className="title">
          <h1>Exam Records</h1>
        </div>
        <hr />
        <div>
          <ul className="exams-list-ul">
            {exams.length ? (
              exams.map((exam) => {
                return (
                  <Tile
                    title={exam.name}
                    styles={styles}
                    Styles={Styles}
                    action={{}}
                  >
                    <div>
                      {" "}
                      <button onClick={() => LinkTo(exam.ref)}>edit</button>
                      <button>reg link</button>
                      <button
                        onClick={() => {
                          setExamId(exam.ref);
                          setDialog(true);
                        }}
                      >
                        delete
                      </button>
                    </div>
                    <div>
                      <div>
                        <i>icon</i>
                        time
                      </div>
                      <div>
                        <i>icon</i>
                        Quizzes
                      </div>
                      <div>
                        <i>icon</i>
                        marks
                      </div>
                    </div>
                  </Tile>
                );
              })
            ) : (
              <h1>you haven't created any exam</h1>
            )}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default ExamRecords;
