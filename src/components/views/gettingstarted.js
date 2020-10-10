import React from "react";
import Img from "../../assets/kwi-lo.jpg";
import "../../css/gettingstarted.css";
const gettingstarted = (props) => {
  return (
    <section className="gettingstarted">
      <div className="g-h">
        <div>
          <i className="material-icons">home</i>{" "}
        </div>
      </div>
      <div className="logo-showcase">
        <div className="logo">
          <img src={Img} alt="logo" />
        </div>
      </div>
      <div className="app-title">
        <p>KWIZZER</p>
      </div>
      <div className="path-text">
        <p>Choose your path:</p>
      </div>
      <div className="path-container">
        <a
          className="path examiner"
          href={`${process.env.REACT_APP_EXAMINER}/school/create`}
        >
          <div className="pathcard">
            <div className="path-icon">
              <img src={Img} />
            </div>
            <div className="p-text">
              <p>Examiner</p>
            </div>
          </div>
        </a>{" "}
        <div
          className="path student"
          onClick={() => {
            props.history.push("/signup");
          }}
        >
          <div className="pathcard">
            <div className="path-icon">
              <img src={Img} />
            </div>
            <div className="p-text">
              <p>Student</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default gettingstarted;
