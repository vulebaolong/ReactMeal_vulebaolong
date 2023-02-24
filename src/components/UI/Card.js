import React from "react";

import style from "./Card.module.css";

function Card(props) {
    return <div className={style.Card}>{props.children}</div>;
}

export default Card;
