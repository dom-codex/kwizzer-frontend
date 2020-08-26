import React, { useState } from "react";
import UserLoginForm from "./component/loginform";
import AdminLoginForm from "./component/adminloginform";
import Preloader from "../sub-components/indeterminate_indicator";
import "../../css/login.css";
function Login(props) {
  const [loader, showLoader] = useState(false);
  const redirect = (addr) => {
    props.history.replace(addr);
  };
  const adminLogin = props.admin;
  return (
    <section className="login">
      <div className="login-body">
        {loader ? <Preloader /> : ""}
        <div className="login-header">
          <h1>Kwizzer</h1>
          <p>Promoting educational transparency</p>
          <p className="title">{!adminLogin ? "User Login" : "School Login"}</p>
        </div>
        {!adminLogin ? (
          <UserLoginForm showLoader={showLoader} redirect={redirect} />
        ) : (
          <AdminLoginForm showLoader={showLoader} redirect={redirect} />
        )}
      </div>
    </section>
  );
}
export default Login;
