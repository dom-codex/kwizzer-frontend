import React, { useState, useReducer, useEffect } from "react";
import Toast from "../sub-components/toast";
import "../../css/quiz-editor.css";
import { inputReducer, save, saveEdited } from "../../utils/editorFunctions";
import { validateQuestion } from "../../validators/question";
const generateOptions = (inputState, option, dispatch, setoption) => {
  const options = [];
  for (let i = 0; i < inputState.opts.length; i++) {
    options.push(
      <li key={i} className="design-2">
        <div className="opt">
          <label>{`option ${i + 1}`}</label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({
                type: "opt",
                value: e.target.value,
                key: `option${i + 1}`,
                i: i,
                id: inputState.opts[i].id ? inputState.opts[i].id : 0,
              })
            }
            value={inputState.opts[i].value}
          />
          <button
            onClick={() => {
              dispatch({
                type: "delete",
                i: i,
                id: inputState.existing.length > i ? inputState.opts[i].id : 0,
              });
            }}
          >
            del
          </button>
        </div>
      </li>
    );
  }
  return options;
};
const generateAnswer = (option, data) => {
  const answersOptions = [];
  for (let i = 0; i < data.length; i++) {
    answersOptions.push(
      <option key={i} value={data[i] ? data[i].value : null}>
        {`option${i + 1}`}
      </option>
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
    isNew === "true"
      ? search.split("quid=")[1].split("&")[0]
      : search.split("qu=")[1].split("&")[0];

  const [option, setoptions] = useState(0);
  let [inputState, dispatch] = useReducer(inputReducer, {
    question: "",
    answer: "",
    message: "",
    showToast: false,
    isEdit: false,
    opts: [],
    existing: [],
    todelete: [],
  });
  const addOptions = () => {
    if (inputState.opts.length > 4) {
      return dispatch({
        type: "toast",
        message: "no of input field exceeded!!!",
      });
    }
    dispatch({
      type: "newopt",
      data: {
        name: `option${inputState.opts.length + 1}`,
        value: "",
        id: 0,
      },
    });
  };
  const fetchQuestion = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/class/get/question?qu=${quid}&quiz=${match.params.quiz}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { question } = data;
        const options = question.options;
        let answer = "";
        const opts = [];
        const existing = [];
        //format the options structure
        options.forEach((option, index) => {
          if (option.isAnswer) {
            answer = option.option;
          }
          opts.push({
            name: `option${index + 1}`,
            value: option.option,
            id: option.id,
            i: index,
          });
          existing.push(option.id);
        });
        setoptions(question.options.length);
        dispatch({
          type: "edit",
          question: question.question,
          opts: opts,
          answer: answer,
          existing: existing,
        });
      });
  };
  const canCreate = validateQuestion(
    inputState.opts,
    inputState.answer,
    inputState.question
  );
  useEffect(() => {
    if (isNew != "true") {
      fetchQuestion();
    }
  }, []);
  return (
    <div className="quiz-editor-cont">
      <Toast
        isOpen={inputState.showToast}
        action={() => dispatch({ type: "toast" })}
        text={inputState.message}
        styles={{}}
        animate={"showToast-top"}
        main={"toast-top"}
        top={{ top: "25px" }}
      />
      <div className="quiz-editor">
        <div className="quiz-editor-heading">Question editor</div>
        <div className="question-tile">
          <div className="question design-2">
            <label htmlFor="question">Question</label>
            <textarea
              onChange={(e) =>
                dispatch({ type: "addQuestion", value: e.target.value })
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
                  {generateOptions(inputState, option, dispatch, setoptions)}
                </ul>
                <button onClick={addOptions} className="add-option">
                  add option
                </button>
              </div>
            ) : (
              <div>
                <ul>
                  {generateOptions(inputState, option, dispatch, setoptions)}
                </ul>
                <div>
                  <button onClick={addOptions} className="add-option">
                    add option
                  </button>
                </div>
              </div>
            )}
            <ul className="options-list">
              <li className="ans design-2">
                <label>Answer</label>&nbsp;
                <select
                  value={inputState.answer}
                  onChange={(e) =>
                    dispatch({ type: "ans", answer: e.target.value })
                  }
                >
                  <option value={""}>none</option>
                  {generateAnswer(option, inputState.opts)}
                </select>
              </li>
            </ul>
          </div>
          <hr />
          <div className="editor-controls">
            <button onClick={() => props.history.goBack()}>cancel</button>
            {canCreate ? (
              <button
                onClick={
                  isNew === "true"
                    ? () =>
                        save(
                          inputState,
                          quid,
                          props.history,
                          props.school,
                          dispatch,
                          setoptions
                        )
                    : () =>
                        saveEdited(
                          inputState,
                          quid,
                          props.history,
                          match.params.quiz,
                          props.school
                        )
                }
              >
                {isNew === "true" ? "Create" : "Save changes"}
              </button>
            ) : (
              <button style={{ backgroundColor: "grey" }}>
                {" "}
                {isNew === "true" ? "Create" : "Save changes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizEditor;
