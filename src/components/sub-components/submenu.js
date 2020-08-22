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
          <Link to={`/admin/auth?signup=true&user=${props.user.ref}`}>
            {props.title.second}
          </Link>
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
  const LinkTo = (route, data) => {
    props.routes.history.push(route, data);
  };
  const userIdentities = props.stateData;
  return (
    <div className="submenu">
      <h2 className="submenu-heading">Menu</h2>
      <hr />
      <br />
      <div className="menu-options">
        <Menutile
          title={"Dashboard"}
          icon={"dashboard"}
          subtile={<Subtile title={title} user={props.user} />}
        />
        <Menutile
          title={"Notifications"}
          icon={"event"}
          action={() => LinkTo("/menu/notifications", userIdentities)}
        />
        <Menutile
          title={"Results"}
          icon={"wysiwyg"}
          action={() => LinkTo("/menu/results", userIdentities)}
        />
        <Menutile
          title={"My Exams"}
          icon={"list_alt"}
          action={() => LinkTo("/menu/myexams", userIdentities)}
        />
      </div>
    </div>
  );
}
export default SubMenu;
