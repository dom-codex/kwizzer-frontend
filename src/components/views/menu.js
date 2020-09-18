import React, { useEffect, useState, useContext } from "react";
import Jumbo from "../sub-components/Jumbo";
import Submenu from "../sub-components/submenu";
import Loading from "../sub-components/Loading";
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
function Menu(props) {
  const stateData = fetchData("person");

  const { switchMode, setHeading } = useContext(modeContext);
  //retrieve user details from state
  const [detailLoaded, setDetailsLoaded] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    setHeading("Home");
    switchMode(true);
    LoadInfo(setUser, setDetailsLoaded, stateData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="menu">
      {detailLoaded ? (
        <Loading />
      ) : (
        <div>
          <Jumbo title={`${"Welcome " + user.name}`} />
          {<Submenu user={user} routes={props.routes} />}
        </div>
      )}
    </section>
  );
}
export default Menu;
