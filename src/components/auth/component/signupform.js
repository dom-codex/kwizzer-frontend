import React, { useReducer } from "react";
import * as SignupControllers from "../../../utils/signupcontroller";
const UserSignup = (props) => {
  const [inputState, dispatch] = useReducer(SignupControllers.inputReducer, {
    name: "",
    email: "",
    phone: "",
    password: "",
    comirm: "",
  });
  const url = "http://127.0.0.1:3500/user/create";
  return (
    <div>
      <div className="signUp-input">
        <label for="name">Name</label>
        <input
          id="name"
          value={inputState.name}
          onInput={(e) => SignupControllers.textHandler(e, "name", dispatch)}
          type="text"
          maxLength="30"
          placeholder="name"
        />
      </div>
      <div className="signUp-input">
        <label for="email">Email</label>
        <input
          id="email"
          value={inputState.email}
          onInput={(e) => SignupControllers.textHandler(e, "email", dispatch)}
          type="email"
          placeholder="email"
        />
      </div>
      <div className="signUp-input">
        <label for="phone">Phone</label>
        <input
          id="phone"
          value={inputState.phone}
          onInput={(e) => SignupControllers.textHandler(e, "phone", dispatch)}
          type="phone"
          maxLength="20"
          placeholder="phone"
        />
      </div>
      <div className="signUp-input">
        <label for="password">password</label>
        <input
          id="password"
          type="password"
          value={inputState.password}
          onInput={(e) =>
            SignupControllers.textHandler(e, "password", dispatch)
          }
          minLength="5"
          placeholder="password"
        />
      </div>
      <div className="signUp-input">
        <label for="comfirm-password">comfirm password</label>
        <input
          id="comfirm-password"
          type="password"
          value={inputState.comfirm}
          onInput={(e) => SignupControllers.textHandler(e, "comfirm", dispatch)}
          minLength="20"
          placeholder="comfirm password"
        />
      </div>
      <div className="btn-cont">
        <button
          onClick={() =>
            SignupControllers.submitValue(url, inputState, props.redirect)
          }
          className="submit-btn"
        >
          submit
        </button>
      </div>
    </div>
  );
};
export default UserSignup;
