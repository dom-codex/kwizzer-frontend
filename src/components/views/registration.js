import React, { useState } from "react";
import Header from "../sub-components/header";
import "../../css/registration.css";
const Registration = (props) => {
  const [email, setEmail] = useState();
  //get url params
  const { match } = props;
  const { sch, quiz } = match.params;
  const register = (email) => {
    const url = `http://localhost:3500/school/quiz/register?sid=${sch}&quid=${quiz}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 201) {
          alert("sucessfully  registered");
        }
      });
  };
  return (
    <section className="reg-page">
      <Header />
      <div className="reg-content">
        <div className="reg-header">
          <h1>Quiz</h1>
          <h2>Application</h2>
        </div>
        <div className="reg-body">
          <div className="quiz-name">
            <h4>Name:</h4>
            <span>cloud computing</span>
          </div>
          <div className="quiz-name">
            <h4>Total Questions:</h4>
            <span>20</span>
          </div>
          <div className="quiz-name">
            <h4>Total Marks</h4>
            <span>100</span>
          </div>
          <div className="quiz-name">
            <h4>Time</h4>
            <span>2hrs 30mins</span>
          </div>
          <hr />
          <div className="candidate-email">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              placeholder="enter your email address"
            />
          </div>
          <div className="reg-btn">
            <button onClick={() => register(email)}>Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Registration;
