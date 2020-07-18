import React from "react";
const AdminLoginForm = (props) => {
  return (
    <div className="login-content">
      <div className="login-input">
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="email" />
      </div>
      <div className="login-input">
        <label for="password">password</label>
        <input
          id="password"
          type="password"
          minLength="5"
          placeholder="password"
        />
      </div>
      <div className="btn-cont">
        <button class="submit-btn" onClick={props.redirect}>
          submit
        </button>
      </div>
    </div>
  );
};
export default AdminLoginForm;
