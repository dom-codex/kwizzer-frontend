import React from "react";
import Jumbo from "./Jumbo";
import "../../css/quiz-editor.css";
const QuizEditor = (props) => {
  return (
    <div className="quiz-editor-cont">
      <div className="quiz-editor">
        <Jumbo title={"Question editor"} />
        <div className="question-tile">
          <div className="question">
            <label for="question">Question</label>
            <textarea rows="5" id="question">
              what is javascript?
            </textarea>
          </div>
          <div className="options">
            <p>options</p>
            <ul>
              <li>
                <input type="text" value="a library" />
              </li>
              <li>
                <input type="text" value="a language" />
              </li>
              <li>
                <input type="text" value="a framework" />
              </li>
            </ul>
          </div>
          <div className="editor-controls">
            <button onClick={props.closeEditor}>cancel</button>
            <button>save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizEditor;
