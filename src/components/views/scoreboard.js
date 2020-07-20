import React from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import ScoreBoardHeader from "../sub-components/scoreboard-header";
import Table from "../sub-components/table";
import "../../css/scoreboard.css";
const ScoreBoard = (props) => {
  return (
    <section className="scoreboard">
      <div className="showcase">
        <Header />
        <Jumbo title={"ScoreBoard"} />
      </div>
      <div className="score-table">
        <ScoreBoardHeader title={"System architecture"} />
        <Table />
      </div>
    </section>
  );
};
export default ScoreBoard;
