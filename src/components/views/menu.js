import React, { useEffect, useState } from "react";
import Layout from "../sub-components/layout";
import Jumbo from "../sub-components/Jumbo";
import Submenu from "../sub-components/submenu";
import "../../css/showcase.css";
import { fetchData } from "../../utils/storage";
const stateData = fetchData("person");
function Menu(props) {
  //retrieve user details from state
  const [detailLoaded, setDetailsLoaded] = useState(false);
  const [user, setUser] = useState({});
  //const { location } = props.routes;
  const LoadInfo = () => {
    //  const query = location.search.split("=")[1];
    const url = `http://localhost:3500/user/find?ref=${stateData}`;
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
    LoadInfo();
  }, []);
  return (
    <Layout user={true}>
      <section className="menu">
        <Jumbo title={detailLoaded ? `${"Hi " + user.name}` : "Loading..."} />
        {detailLoaded && <Submenu user={user} routes={props.routes} />}
      </section>
    </Layout>
  );
}
export default Menu;
