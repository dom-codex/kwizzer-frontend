import React, { useState } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import Menutile from "../sub-components/menu-tile";
import NewQuizWindow from "../views/newQuiz";
import "../../css/dashboard.css";
import "../../css/quizCreationModal.css";

const Dashboard = (props) => {
  const [quizModalIsOpen, setQuizModalIsOpen] = useState(false);
  const { search } = props.location;
  const id = search.split("=")[1]; //sch ref
  //const schId = props.location.state.sch;
  const schRef = props.location.state.ref;
  const LinkTo = (route, id = "") => {
    props.history.push(route, { sref: id });
  };
  //get examiners id
  return (
    <section className="dashboard">
      {quizModalIsOpen ? (
        <NewQuizWindow sid={id} close={() => setQuizModalIsOpen(false)} />
      ) : (
        ""
      )}
      <div className="dashboard-contents">
        <div className="showcase">
          <Header />
          <Jumbo
            title={"Crystal Academy"}
            desc={"Do something amazing today"}
          />
        </div>
        <div className="dash-options">
          <Menutile
            title={"New Quiz"}
            action={() => LinkTo(`/dashboard/create/quiz`, schRef)}
          />
          <Menutile
            title={"Notifications"}
            action={() => LinkTo(`/admin/notifications`, schRef)}
          />
          <Menutile
            title={"Quizzes"}
            action={() => LinkTo(`/dashboard/quizzes?id=${id}`, schRef)}
          />
          <Menutile
            title={"Candidates"}
            action={() => LinkTo("/dashboard/candidates")}
          />
          <Menutile
            title={"Scoreboard"}
            action={() => LinkTo("/dashboard/scoreboard", schRef)}
          />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
