import React, { useReducer } from "react";
import * as SignupControllers from "../../../utils/signupcontroller";
const AdminSignup = (props) => {
  const [inputState, dispatch] = useReducer(SignupControllers.inputReducer, {
    name: "",
    email: "",
    phone: "",
    password: "",
    comfirm: "",
  });
  const url = "http://127.0.0.1:3500/school/create";
  const { search } = props.routes.location;
  const ref = search.split("user=")[1];
  return (
    <div>
      <div className="signUp-input">
        <label for="name">Display Name</label>
        <input
          id="name"
          type="text"
          onInput={(e) => SignupControllers.textHandler(e, "name", dispatch)}
          value={inputState.name}
          maxLength="30"
          placeholder="E.g Crystal academy"
        />
      </div>
      <div className="signUp-input">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          onInput={(e) => SignupControllers.textHandler(e, "email", dispatch)}
          value={inputState.email}
          placeholder="email"
        />
      </div>
      <div className="signUp-input">
        <label for="phone">Phone</label>
        <input
          id="phone"
          type="phone"
          onInput={(e) => SignupControllers.textHandler(e, "phone", dispatch)}
          value={inputState.phone}
          maxLength="20"
          placeholder="phone"
        />
      </div>
      <div className="signUp-input">
        <label for="password">password</label>
        <input
          id="password"
          type="password"
          onInput={(e) =>
            SignupControllers.textHandler(e, "password", dispatch)
          }
          value={inputState.password}
          minLength="5"
          placeholder="password"
        />
      </div>
      <div className="signUp-input">
        <label for="comfirm-password">comfirm password</label>
        <input
          id="comfirm-password"
          type="password"
          onInput={(e) => SignupControllers.textHandler(e, "comfirm", dispatch)}
          value={inputState.comfirm}
          minLength="20"
          placeholder="comfirm password"
        />
      </div>
      <div className="btn-cont">
        <button
          onClick={() =>
            SignupControllers.submitValue(url, inputState, props.redirect, ref)
          }
          class="submit-btn"
        >
          submit
        </button>
      </div>
    </div>
  );
};
export default AdminSignup;
