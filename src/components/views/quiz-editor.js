import React, { useState, useReducer, useEffect } from "react";
import Jumbo from "../sub-components/Jumbo";
import "../../css/quiz-editor.css";
import {
  inputReducer,
  textHandler,
  save,
  saveEdited,
} from "../../utils/editorFunctions";
const generateOptions = (inputState, option, dispatch) => {
  const options = [];
  for (let i = 0; i < option; i++) {
    options.push(
      <li key={i}>
        <input
          type="text"
          onInput={(e) =>
            textHandler(e, `option${i + 1}`, "option", dispatch, "newOption")
          }
          value={inputState.options[`option${i + 1}`]}
        />
      </li>
    );
  }
  return options;
};
const generateAnswer = (option) => {
  const answersOptions = [];
  for (let i = 0; i < option; i++) {
    answersOptions.push(
      <option key={i} value={`option${i + 1}`}>{`option${i + 1}`}</option>
    );
  }
  return answersOptions;
};
const QuizEditor = (props) => {
  const { match } = props;
  const { search } = props.location;
  //const isNew = search.split("new=")[1];
  const isNew = search.split("new=")[1].split("&")[0];

  const quid =
    isNew == "true"
      ? search.split("quid=")[1].split("&")[0]
      : search.split("qu=")[1].split("&")[0];

  const [option, setoptions] = useState(0);
  let [inputState, dispatch] = useReducer(inputReducer, {
    question: "",
    options: {},
    answer: null,
  });
  const addOptions = () => {
    setoptions((prevstate) => {
      if (prevstate >= 5) return 5;
      return (prevstate += 1);
    });
  };
  const fetchQuestion = () => {
    const url = `http://localhost:3500/school/class/get/question?qu=${quid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { question } = data;
        const options = question.options;

        let optionObj = {};
        let answer;
        //format the options structure
        options.forEach((option, index) => {
          if (option.isAnswer) {
            answer = `option${index + 1}`;
          }
          const opt = {
            [`option${index + 1}`]: option.option,
          };
          optionObj = {
            ...optionObj,
            ...opt,
          };
        });
        setoptions(question.options.length);
        dispatch({
          type: "edit",
          question: question.question,
          options: optionObj,
          answer: answer,
        });
      });
  };
  useEffect(() => {
    if (isNew != "true") {
      fetchQuestion();
    }
  }, []);
  return (
    <div className="quiz-editor-cont">
      <div className="quiz-editor">
        <Jumbo title={"Question editor"} />
        <div className="question-tile">
          <div className="question">
            <label for="question">Question</label>
            <textarea
              onInput={(e) =>
                textHandler(e, "", "question", dispatch, "addQuestion")
              }
              rows="5"
              id="question"
              value={inputState.question}
            ></textarea>
          </div>
          <div className="options">
            <p>options</p>
            {isNew === "true" ? (
              <div>
                <ul className="options-list">
                  {generateOptions(inputState, option, dispatch)}
                </ul>
                <button onClick={addOptions} className="add-option">
                  add option
                </button>
              </div>
            ) : (
              <ul>{generateOptions(inputState, option, dispatch)}</ul>
            )}
            <ul className="options-list">
              <li>
                <label>Answer</label>
                <select
                  value={inputState.answer}
                  onChange={(e) =>
                    textHandler(e, "", "answer", dispatch, "answer")
                  }
                >
                  <option value={null}>none</option>
                  {generateAnswer(option)}
                </select>
              </li>
            </ul>
          </div>
          <hr />
          <div className="editor-controls">
            <button>cancel</button>
            <button
              onClick={
                isNew === "true"
                  ? () => save(inputState, quid, props.history)
                  : () =>
                      saveEdited(
                        inputState,
                        quid,
                        props.history,
                        match.params.quiz
                      )
              }
            >
              {isNew === "true" ? "Create" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizEditor;
