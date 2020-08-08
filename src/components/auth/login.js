import React, { useState } from "react";
import UserLoginForm from "./component/loginform";
import AdminLoginForm from "./component/adminloginform";
import Toast from "../sub-components/toast";
import "../../css/login.css";
function Login(props) {
  const [showToast, setToast] = useState(true);
  const { search } = props.location;
  const adminLogin = search.split("=")[1];
  const redirect = (addr) => {
    props.history.push(addr);
  };
  return (
    <section className="login">
      <div className="login-body">
        <div className="login-header">
          <h1>Learned</h1>
          <p>Promoting educational transparency</p>
          <p className="title">{!adminLogin ? "User Login" : "Admin Login"}</p>
        </div>
        {!adminLogin ? (
          <UserLoginForm redirect={redirect} />
        ) : (
          <AdminLoginForm redirect={redirect} />
        )}
      </div>
    </section>
  );
}
export default Login;
