import React, { useEffect, useState, useContext } from "react";
import { modeContext } from "../../context/mode";
import Tile from "../sub-components/tiles";
import Toast from "../sub-components/toast";
import Dialog from "../sub-components/dialog";
import Styles from "../../css/tile.module.css";
import styles from "../../css/examrecords.css";
import Img from "../../assets/icon.svg";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const ExamRecords = (props) => {
  const { switchMode, setHeading } = useContext(modeContext);
  const [exams, setExams] = useState([]);
  const [showToast, setToast] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [examId, setExamId] = useState("");
  const [btnText, setBtnText] = useState("revoke");
  const [btnText2, setBtnText2] = useState("authorize");
  const [toastText, setToastText] = useState("");
  const fetchExams = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/get/records?sch=${school}`;
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
  const setRegStatus = (ref) => {
    const url = `${process.env.REACT_APP_HEAD}/school/exam/set/regstatus?exam=${ref}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setToastText(res.message);
        setBtnText(res.text);
        setToast(true);
      });
  };
  const authorize = (ref) => {
    const url = `${process.env.REACT_APP_HEAD}/school/exam/canstart?exam=${ref}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setToastText(res.message);
        setBtnText2(res.text);
        setToast(true);
      });
  };
  const deleteExam = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/exam/delete?sch=${school}&exam=${examId}`;
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

  const CopyLink = (e) => {
    const link = e.target.parentNode.children[1];
    console.log(link);
    //const link = link;
    link.focus();
    link.select();
    link.setSelectionRange(0, 99999);
    /* Copy the text inside the text field */
    document.execCommand("copy");
  };
  useEffect(() => {
    setHeading("Records");
    switchMode(false);
    fetchExams();
  }, []);
  return (
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
      <Toast
        isOpen={showToast}
        action={setToast}
        text={toastText}
        styles={{}}
        animate={"showToast"}
        main={"toast"}
        top={{ bottom: "28px" }}
      />
      <hr />
      <div>
        <ul className="exams-list-ul">
          {exams.length ? (
            exams.map((exam) => {
              return (
                <Tile
                  key={exam.ref}
                  title={exam.name}
                  styles={styles}
                  Styles={Styles}
                  action={{}}
                >
                  <div className="control-btns">
                    <div className="more-btn">...</div>
                    <div className="records-more">
                      <button onClick={() => LinkTo(exam.ref)}>edit</button>
                      <button onClick={() => authorize(exam.ref)}>
                        {btnText2}
                      </button>
                      <button onClick={() => setRegStatus(exam.ref)}>
                        {exam.canReg ? btnText : "activate"}
                      </button>
                      <div className="reg-link">
                        <button onClick={(e) => CopyLink(e)}>copy link</button>

                        <input
                          onChange={() => {}}
                          className="link"
                          value={`${window.location.origin}/exam/register/${school}/${exam.ref}`}
                        />
                      </div>
                      <button
                        onClick={() => {
                          setExamId(exam.ref);
                          setDialog(true);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                  <div className="exam-info">
                    <div>
                      <i className="material-icons">access_time</i>
                      <div>
                        {exam.hours > 0 ? `${exam.hours}h  ` : ""}
                        {exam.minutes > 0 ? ` ${exam.minutes}m` : ""}
                        {exam.seconds > 0 ? ` ${exam.seconds}` : ""}
                      </div>
                    </div>
                    <div>
                      <i className="material-icons">list</i>
                      <div>{exam.nQuiz}</div>
                    </div>
                    <div>
                      <i className="material-icons">assignment_turned_in</i>
                      <div>{exam.TotalMarks}</div>
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
  );
};

export default ExamRecords;
