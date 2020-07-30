import React, { useEffect, useState } from "react";
import Header from "../sub-components/header";
import QuestionDisplayArea from "../sub-components/question-display";
import OptionLabel from "../sub-components/option-label";
const correct = {
  backgroundColor: "green",
};
const choosed = {
  backgroundColor: "red",
};
const QuestionDisplay = (props) => {
  return (
    <div>
      <QuestionDisplayArea index={props.index} question={props.question} />
      <div className="question-options">
        <ul>
          {props.options.map((q, i) => {
            const isAnswer = q.isAnswer;
            const chosen = q.option === props.answer;
            return (
              <li style={isAnswer ? correct : chosen ? choosed : null}>
                <OptionLabel i={i} />
                <div>{q.option}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
const Solutions = (props) => {
  const questionPaperId = props.location.state.question;
  const [questionPaper, setQuestionpaper] = useState([]);
  const getQuestionPaper = () => {
    const url = `http://localhost:3500/school/get/student/questionpaper?paper=${questionPaperId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestionpaper(data.questions.questions);
      });
  };
  useEffect(getQuestionPaper, []);
  return (
    <section>
      <Header />
      <div className="question-paper">
        {questionPaper.length
          ? questionPaper.map((paper, i) => {
              return (
                <QuestionDisplay
                  key={i}
                  index={i + 1}
                  question={paper.question}
                  options={paper.options}
                  answer={paper.answer}
                  answered={paper.answered}
                />
              );
            })
          : null}
      </div>
    </section>
  );
};
export default Solutions;
