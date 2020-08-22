import React from "react";
import "../../css/signUp.css";
import UserSignup from "./component/signupform";
import AdminSignup from "./component/adminsignupform";
function SignUp(props) {
  const redirect = (addr) => {
    props.history.push(addr);
  };
  //retrieve query param
  const { search } = props.location;
  const adminSignUp = search.split("=")[1];
  return (
    <section className="signup">
      <div className="signup-body">
        <div className="signup-header">
          <h1>Kwizzer</h1>
          <p>Promoting educational transparency</p>
          <p className="title">
            {!adminSignUp ? "Signup form" : "Admin Signup"}
          </p>
        </div>
        <div className="signup-content">
          {!adminSignUp ? (
            <UserSignup redirect={redirect} />
          ) : (
            <AdminSignup routes={props} redirect={redirect} />
          )}
        </div>
      </div>
    </section>
  );
}
export default SignUp;
