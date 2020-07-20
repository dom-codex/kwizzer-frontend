import React, { useState } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import Menutile from "../sub-components/menu-tile";
import "../../css/dashboard.css";
import "../../css/quizCreationModal.css";
const NewQuizWindow = (props) => {
  return (
    <div className="new-quiz-window">
      <div className="new-quiz">
        <button onClick={props.close} className="quiz-close">
          X
        </button>
        <div className="new-quiz-header">
          <h1 className="app-title">Quizzer</h1>
          <h1 className="form-title">New Quiz </h1>
        </div>
        <div className="quiz-form">
          <div className="quiz-input">
            <label for="subject">Title</label>
            <input id="subject" type="text" placeholder="course" />
          </div>
          <div className="quiz-input">
            <label for="mark">Mark per Question</label>
            <input
              id="mark"
              step="0.01"
              type="number"
              placeholder="Mark(s) per question"
            />
          </div>
          <div className="quiz-input">
            <label for="mark">No of question to be answered</label>
            <input
              id="mark"
              step="0.01"
              type="number"
              placeholder="No of questions to be answered"
            />
          </div>
          <div className="quiz-input">
            <label for="total">Total Marks</label>
            <input id="total" type="number" placeholder="total quiz mark" />
          </div>
          <div className="quiz-radio">
            <label>Deliver result on submition</label>
            <div className="radio">
              <div className="radio1">
                <label for="yes">yes</label>
                <input id="yes" type="radio" name="choice" value="true" />
              </div>
              <div className="radio1">
                <label for="no">no</label>
                <input id="no" type="radio" name="choice" value="false" />
              </div>
            </div>
          </div>
        </div>
        <div className="create-btn">
          <button>create quiz</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = (props) => {
  const [quizModalIsOpen, setQuizModalIsOpen] = useState(false);
  const LinkTo = (route) => {
    props.history.push(route);
  };
  return (
    <section className="dashboard">
      {quizModalIsOpen ? (
        <NewQuizWindow close={() => setQuizModalIsOpen(false)} />
      ) : (
        ""
      )}
      <div className="dashboard-contents">
        <div className="showcase">
          <Header />
          <Jumbo
            title={"Crystal Academy"}
            desc={"Do something amazing today"}
          />
        </div>
        <div className="dash-options">
          <Menutile
            title={"New Quiz"}
            action={() => setQuizModalIsOpen(true)}
          />
          <Menutile
            title={"Quizzes"}
            action={() => LinkTo("/dashboard/quizzes")}
          />
          <Menutile
            title={"Candidates"}
            action={() => LinkTo("/dashboard/candidates")}
          />
          <Menutile
            title={"Scoreboard"}
            action={() => LinkTo("/dashboard/scoreboard")}
          />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
