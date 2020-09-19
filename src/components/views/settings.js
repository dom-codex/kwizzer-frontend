import React, { useContext, useState, useEffect } from "react";
import Loading from "../sub-components/Loading";
import Loader from "../sub-components/indeterminate_indicator";
import { modeContext } from "../../context/mode";
import "../../css/settings.css";
const revealPwdForm = (e) => {
  e.target.style.display = "none";
  document.querySelector(".pwdform").classList.add("showform");
};
const closePwdForm = () => {
  document.querySelector(".pwdform").classList.remove("showform");
  const timer = setTimeout(() => {
    document.querySelector(".change-pass button").style.display = "block";
    clearTimeout(timer);
  }, 505);
};
const Settings = () => {
  const { setHeading } = useContext(modeContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setHeading("Settings");
  }, []);
  return (
    <section className="settings-page">
      {loading ? (
        <Loading />
      ) : (
        <div className="setting-body">
          <div className="personalInfo">
            <div className="setting-heading">
              <h1>Personal info</h1>
            </div>
            <div className="candidate-name">
              <div>
                <span className="tag">Name: </span>&nbsp;
                <span>Dominic ibolo</span>
              </div>
            </div>
            <div className="candidate-email">
              <div>
                <span className="tag">Email: </span>&nbsp;
                <span>dominicwest7@gmail.com</span>
              </div>
            </div>
            <div className="candidate-phone">
              <div>
                <span className="tag">Phone: </span>&nbsp;
                <span>08101063084</span>
              </div>
            </div>
          </div>
          <div className="security">
            <div className="setting-heading">
              <h1>Security</h1>
            </div>
            <div>
              <div className="change-pass">
                <button onClick={revealPwdForm}>Change password</button>
              </div>
              <div className="pwd-form">
                <div class="pwdform">
                  <div className="old-pwd">
                    <span>
                      <label>Old password</label>
                    </span>
                    <div>
                      <input type="password" />
                    </div>
                  </div>
                  <div className="new-pwd">
                    <span>
                      <label>New password</label>
                    </span>
                    <div>
                      <input type="password" />
                    </div>
                  </div>
                  <div className="pass-btn">
                    <button>Submit</button>
                    <button onClick={closePwdForm}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="delete">
            <div className="horiz-ruler"></div>
            <div className="delete-btn">
              <button>Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Settings;
