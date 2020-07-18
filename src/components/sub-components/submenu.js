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
function SubMenu() {
  const title = {
    first: "Login",
    second: "SignUp",
  };
  return (
    <div class="submenu">
      <div class="submenu-heading">Menu</div>
      <hr />
      <div class="menu-options">
        <Menutile title={"Dashboard"} subtile={<Subtile title={title} />} />
        <Menutile title={"Notification"} />
        <Menutile title={"Quizzes"} />
        <Menutile title={"Results"} />
        <Menutile title={"Apply"} />
      </div>
    </div>
  );
}
export default SubMenu;
