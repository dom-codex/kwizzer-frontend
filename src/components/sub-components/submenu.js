import React from "react";
import { Link } from "react-router-dom";
import Menutile from "../sub-components/menu-tile";
import "../../css/submenu.css";
const Subtile = (props) => {
  return (
    <div className="sub-tile">
      <div className="sub-tile-options">
        <button>
          <Link to="/auth?login=true">{props.title.first}</Link>
        </button>
      </div>
      <div className="sub-tile-options">
        <button>
          <Link to="/admin/auth?signup=true">{props.title.second}</Link>
        </button>
      </div>
    </div>
  );
};
function SubMenu(props) {
  const title = {
    first: "Login",
    second: "SignUp",
  };
  const LinkTo = (route) => {
    props.history.push(route);
  };
  return (
    <div class="submenu">
      <h2 class="submenu-heading">Menu</h2>
      <hr />
      <div class="menu-options">
        <Menutile title={"Dashboard"} subtile={<Subtile title={title} />} />
        <Menutile
          title={"Notifications"}
          action={() => LinkTo("/menu/notifications")}
        />
        <Menutile title={"Results"} action={() => LinkTo("/menu/results")} />
        <Menutile
          title={"Quizzes"}
          action={() => LinkTo("/menu/quiz?user=student")}
        />
        <Menutile title={"Apply"} />
      </div>
    </div>
  );
}
export default SubMenu;
