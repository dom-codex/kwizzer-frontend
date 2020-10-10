import React, { useEffect, useState, useContext } from "react";
import Jumbo from "../sub-components/Jumbo";
import Submenu from "../sub-components/submenu";
import Loading from "../sub-components/Loading";
import StatsCard from "../sub-components/statsCard";
import { modeContext } from "../../context/mode";
import "../../css/showcase.css";
import { fetchData } from "../../utils/storage";
const LoadInfo = (setUser, setDetailsLoaded, stateData) => {
  const url = `${process.env.REACT_APP_HEAD}/user/find?ref=${stateData}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 201) {
        setUser(data.user);
      }
      setDetailsLoaded(false);
    });
};
const fetchStatistics = (ref, setStats) => {
  const url = `${process.env.REACT_APP_HEAD}/user/stats?ref=${ref}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setStats(data);
      console.log(data);
    });
};
function Menu(props) {
  const stateData = fetchData("person");

  const { switchMode, setHeading } = useContext(modeContext);
  //retrieve user details from state
  const [detailLoaded, setDetailsLoaded] = useState(true);
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({});
  useEffect(() => {
    setHeading("Home");
    switchMode(true);
    LoadInfo(setUser, setDetailsLoaded, stateData);
    fetchStatistics(stateData, setStats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="menu">
      {detailLoaded ? (
        <Loading />
      ) : (
        <div>
          <Jumbo title={`${"Welcome " + user.name}`} />
          <div className="stats-container">
            <StatsCard
              title={"Exams Taken"}
              value={stats.completedQuestions}
              class="first-stat"
            />
            <StatsCard
              title={"Registered Exams"}
              value={stats.registeredExam}
            />
            <StatsCard
              title={"Highest Score"}
              value={
                stats.highestScore ? stats.highestScore.score.$numberDecimal : 0
              }
              class="last-stat"
            >
              <div className="stat-details">
                <div>
                  <div className="label">sch:</div>
                  <p className="schName">
                    {stats.highestScore ? stats.highestScore.schoolName : "N/A"}
                  </p>
                </div>
                <div>
                  <div className="label">exam:</div>
                  <p class="examName">
                    {stats.examNames ? stats.examNames : "N/A"}
                  </p>
                </div>
              </div>
            </StatsCard>
          </div>
          {<Submenu user={user} routes={props.routes} />}
        </div>
      )}
    </section>
  );
}
export default Menu;
