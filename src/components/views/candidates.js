import React from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import LongTable from "../sub-components/longtable";
import "../../css/candidate.css";
const Candidates = (props) => {
  return (
    <section className="candidates">
      <div className="showcase">
        <Header />
        <Jumbo title={"Candidates"} />
      </div>
      <div className="quiz-registered-title">
        <h2>System architecture</h2>
        <p className="amt-reg">Total:100</p>
      </div>
      <hr />
      <div className="candidates-table">
        <LongTable />
      </div>
    </section>
  );
};
export default Candidates;
