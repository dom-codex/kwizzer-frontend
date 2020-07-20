import React from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import Submenu from "../sub-components/submenu";
import Sidenav from "../sub-components/sidenav";
import "../../css/showcase.css";
function Menu(props) {
  return (
    <section>
      <section className="menu">
        <div className="showcase">
          <Header />
          <Jumbo title={"Hi! Dominic"} />
        </div>
      </section>
      <Submenu />
    </section>
  );
}
export default Menu;
