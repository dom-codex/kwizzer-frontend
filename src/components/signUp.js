import React from "react";
import "../css/signUp.css";
function SignUp() {
  return (
    <section className="signup">
      <div className="signup-body">
        <div className="signup-header">
          <h1>Learned</h1>
          <p>Promoting educational transparency</p>
          <p className="title">Sign-up Form</p>
        </div>
        <div className="signup-content">
          <div className="signUp-input">
            <label for="name">Name</label>
            <input id="name" type="text" maxLength="30" placeholder="name" />
          </div>
          <div className="signUp-input">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="email" />
          </div>
          <div className="signUp-input">
            <label for="phone">Phone</label>
            <input id="phone" type="phone" maxLength="20" placeholder="phone" />
          </div>
          <div className="signUp-input">
            <label for="password">password</label>
            <input
              id="password"
              type="password"
              minLength="5"
              placeholder="password"
            />
          </div>
          <div className="signUp-input">
            <label for="comfirm-password">comfirm password</label>
            <input
              id="comfirm-password"
              type="password"
              minLength="20"
              placeholder="comfirm password"
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
export default SignUp;
