import React, { useState } from "react";
const QuizTile = (props) => {
  const [showMore, setShowMore] = useState(false);
  const quiz = props.quiz;
  const LinkTo = () => {
    props.history.push(
      `/dashboard/quizzes/list?sid=${props.school}&quid=${quiz.ref}`
    );
  };
  return (
    <li>
      <div>1</div>
      <div className="quiz-name">{quiz.title || quiz.name}</div>
      <div>{quiz.totalQuestions}</div>
      <div>{quiz.published ? "true" : "false"}</div>
      <div onClick={() => setShowMore((prev) => !prev)}>
        ...
        <div
          style={{
            position: "absolute",
            display: `${showMore ? "flex" : "none"}`,
            flexDirection: `column `,
            backgroundColor: "#fff",
            border: "thin solid #ccc",
            height: "80px",
            left: "-8px",
            bottom: "-90px",
          }}
        >
          {" "}
          <button onClick={LinkTo}>edit</button>
          <button onClick={props.publish}>publish</button>
          <button onClick={props.delete}>delete</button>
        </div>
      </div>
      {/* <button onClick={props.publish}>pub</button>
      <button onClick={LinkTo}>edit</button>
    <button onClick={props.delete}>delete</button>*/}
    </li>
  );
};
export default QuizTile;
