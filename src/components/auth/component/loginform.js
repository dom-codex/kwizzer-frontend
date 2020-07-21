import React, { useReducer } from "react";
import {
  textHandler,
  inputReducer,
  login,
} from "../../../utils/logincontrollers";
const LoginForm = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    email: "",
    password: "",
  });
  const url = "http://localhost:3500/user/login";

  return (
    <div className="login-content">
      <div className="login-input">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          onInput={(e) => textHandler(e, "email", dispatch)}
          value={inputState.email}
          placeholder="email"
        />
      </div>
      <div className="login-input">
        <label for="password">password</label>
        <input
          id="password"
          type="password"
          onInput={(e) => textHandler(e, "password", dispatch)}
          value={inputState.password}
          minLength="5"
          placeholder="password"
        />
      </div>
      <div className="btn-cont">
        <button
          class="submit-btn"
          onClick={() => login(url, inputState, props.redirect)}
        >
          submit
        </button>
      </div>
    </div>
  );
};
export default LoginForm;
