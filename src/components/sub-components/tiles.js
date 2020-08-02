import React from "react";
import Styles from "../../css/tile.module.css";
const Tiles = (props) => {
  return (
    <li>
      <div className={Styles.tilename}>
        <h2>{props.title}</h2>
      </div>
      <div className={Styles.tilecontrols}>
        {props.children}
        {/*
                <button onClick={props.publish}>pub</button>
                <button onClick={LinkTo}>edit</button>
                <button onClick={props.delete}>delete</button>*/}
      </div>
    </li>
  );
};

export default Tiles;
