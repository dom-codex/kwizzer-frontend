import React, { useEffect, useState } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import Submenu from "../sub-components/submenu";
import "../../css/showcase.css";
import { fetchData } from "../../utils/storage";
const stateData = fetchData("person");
let user;
function Menu(props) {
  //retrieve user details from state
  const [detailLoaded, setDetailsLoaded] = useState(false);
  //const { location } = props.routes;
  const LoadInfo = () => {
    //  const query = location.search.split("=")[1];
    const url = `http://localhost:3500/user/find?ref=${stateData}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 400) {
          return props.routes.history.push("/login");
        }
        user = data.user;
        setDetailsLoaded(true);
      });
  };
  useEffect(() => {
    LoadInfo();
  }, []);
  return (
    <section>
      <section className="menu">
        <div className="showcase">
          <Header />
          <Jumbo title={detailLoaded ? `${"Hi " + user.name}` : "Loading..."} />
        </div>
      </section>
      {detailLoaded && <Submenu user={user} routes={props.routes} />}
    </section>
  );
}
export default Menu;
