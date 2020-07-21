import React from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import ScoreboardHeader from "../sub-components/scoreboard-header";
import Table from "../sub-components/table";
import "../../css/result.css";

const Result = (props) => {
  const tableConfig = {
    head: {
      first: "No",
      second: "Name",
    },
  };
  return (
    <section className="result">
      <div className="showcase">
        <Header />
        <Jumbo title={"Results"} />
      </div>
      <ScoreboardHeader title={"System architecture"} forStud={true} />
      <div className="stud-result-table">
        <Table config={tableConfig} />
      </div>
    </section>
  );
};
export default Result;
