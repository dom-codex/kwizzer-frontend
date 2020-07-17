import React from "react";
import "../../css/login.css";
function login() {
  return (
    <section className="login">
      <div className="login-body">
        <div className="login-header">
          <h1>Learned</h1>
          <p>Promoting educational transparency</p>
          <p className="title">Login</p>
        </div>
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
            <button class="submit-btn">submit</button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default login;
