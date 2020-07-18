import React from "react";
const AdminSignup = (props) => {
  return (
    <div>
      <div className="signUp-input">
        <label for="name">Display Name</label>
        <input
          id="name"
          type="text"
          maxLength="30"
          placeholder="E.g Crystal academy"
        />
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
        <button onClick={props.redirect} class="submit-btn">
          submit
        </button>
      </div>
    </div>
  );
};
export default AdminSignup;
