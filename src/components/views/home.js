import React, { useEffect } from "react";
import Img from "../../assets/kwi-lo.jpg";
import "../../css/home.css";
const showLoginOptions = () => {
  const loginOptions = document.querySelector(".login-options");
  loginOptions.classList.add("showLoginOptions");
};
const hideLoginOptions = () => {
  const loginOptions = document.querySelector(".login-options");
  loginOptions.classList.remove("showLoginOptions");
};
export default (props) => {
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.matches(".hm-l-b")) {
        hideLoginOptions();
      }
    });
  }, []);
  return (
    <section className="home">
      <div className="bg">
        <div className="hm-header">
          <div className="hm-login">
            <div className="login-options">
              <ul>
                <li>
                  <a href={`${process.env.REACT_APP_EXAMINER}/school/login`}>
                    As Examiner
                  </a>
                </li>
                <hr />
                <li>
                  <a href="/login">As Student</a>
                </li>
              </ul>
            </div>
            <button className="hm-l-b" onClick={showLoginOptions}>
              LOGIN
            </button>
          </div>
        </div>
        <div className="t">
          <h1>KWIZZER</h1>
          <p>simple online quiz manager</p>
          <a href="/getstarted" className="g-b">
            Get Started
          </a>
        </div>
      </div>
      <section className="sub-section">
        <div className="about">
          <div className="about-icon"></div>
          <div className="about-cont">
            <div className="h3-cont">
              <h3>ABOUT</h3>
            </div>
            <p>
              <span className="app-name">KWIZZER</span>
              is an online quiz manager, which let's you create quizzes for your
              choice candidates and publish this quizzes for them to be taken by
              your candidates.
            </p>
          </div>
        </div>
        <hr className="hm-hr" />
        <div className="hm-features">
          <div className="features-icon"></div>
          <div className="features-cont">
            <div className="f-h">
              <h3>Some Features</h3>
            </div>
            <div className="features-grid">
              <div>
                <p>Equation Builder</p>

                <p>
                  Kwizzer let's you build from simple math/chemistry equations
                  to complex ones you using her advanced equation editor
                </p>
              </div>{" "}
              <div>
                <p>Exam Management</p>

                <p>
                  Kwizzer gives you the full flexibility to create,edit,and
                  Delete exams with few clicks
                </p>
              </div>
              <div>
                <p>Registration Management</p>

                <p>Publish and revoke registration link at will</p>
              </div>
              <div>
                <p>Result delivery management</p>

                <p>
                  {" "}
                  Configure result delivery to be on submition or manually
                  approve delivery of result
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div>
          <p>&copy;2020 kwizzer</p>
        </div>
      </footer>
    </section>
  );
};
