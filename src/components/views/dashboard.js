import React, { useState } from "react";
import StatsCard from "../sub-components/stats.js";
import Jumbo from "../sub-components/Jumbo";
import Menutile from "../sub-components/menu-tile";
import NewQuizWindow from "../views/newQuiz";
import Layout from "../sub-components/layout";
import "../../css/dashboard.css";
import "../../css/quizCreationModal.css";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const Dashboard = (props) => {
  const [quizModalIsOpen, setQuizModalIsOpen] = useState(false);
  const { search } = props.location;
  const id = search.split("=")[1]; //sch ref
  //const schId = props.location.state.sch;
  //const schRef = props.location.state.ref;
  const LinkTo = (route, id = "") => {
    props.history.push(route, { sref: id });
  };
  //get examiners id
  return (
    <section className="dashboard">
      <Layout>
        {quizModalIsOpen ? (
          <NewQuizWindow sid={id} close={() => setQuizModalIsOpen(false)} />
        ) : (
          ""
        )}
        <div className="dashboard-contents">
          <div className="showcase">
            <Jumbo title={"Crystal Academy"} />
          </div>
          <div className="stats-cont">
            <h3>Stats</h3>
            <hr />
            <StatsCard label={"Exams"} value={"2"} />
            <StatsCard label={"Quizzes"} value={"2"} />
            <h3>options</h3>
          </div>
          <hr />
          <div className="dash-options">
            <Menutile
              title={"New Quiz"}
              action={() => LinkTo(`/dashboard/create/quiz`)}
            />
            <Menutile
              title={"Notifications"}
              action={() => LinkTo(`/admin/notifications`)}
            />
            <Menutile
              title={"Quizzes"}
              action={() => LinkTo(`/dashboard/quizzes`)}
            />
            <Menutile
              title={"Candidates"}
              action={() => LinkTo("/dashboard/candidates")}
            />
            <Menutile
              title={"Scoreboard"}
              action={() => LinkTo("/dashboard/scoreboard")}
            />
            <Menutile
              title={"set exam"}
              action={() => LinkTo("/dashboard/set/exam")}
            />
            <Menutile
              title={"Exam record"}
              action={() => LinkTo("/dashboard/exam/records")}
            />
          </div>
        </div>
      </Layout>
    </section>
  );
};
export default Dashboard;
