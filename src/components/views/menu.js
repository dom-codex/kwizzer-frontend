import React, { useEffect, useState, useContext } from "react";
import Jumbo from "../sub-components/Jumbo";
import Submenu from "../sub-components/submenu";
import { modeContext } from "../../context/mode";
import "../../css/showcase.css";
import { fetchData } from "../../utils/storage";
const stateData = fetchData("person");
function Menu(props) {
  const { switchMode, setHeading } = useContext(modeContext);
  //retrieve user details from state
  const [detailLoaded, setDetailsLoaded] = useState(false);
  const [user, setUser] = useState({});
  //const { location } = props.routes;
  const LoadInfo = () => {
    //  const query = location.search.split("=")[1];
    const url = `${process.env.REACT_APP_HEAD}/user/find?ref=${stateData}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        /*if (data.code == 400) {
          return props.routes.history.push("/login");
        }*/
        setUser(data.user);
        setDetailsLoaded(true);
      });
  };
  useEffect(() => {
    setHeading("Home");
    switchMode(true);
    LoadInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="menu">
      <Jumbo title={detailLoaded ? `${"Hi " + user.name}` : "Loading..."} />
      {detailLoaded && <Submenu user={user} routes={props.routes} />}
    </section>
  );
}
export default Menu;
