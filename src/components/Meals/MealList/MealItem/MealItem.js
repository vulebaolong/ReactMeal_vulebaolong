import React from "react";
import MealForm from "../MealForm/MealForm";

import style from "./MealItem.module.css";

function MealItem(props) {
    return (
        <li className={style.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={style.description}>{props.description}</div>
                <div className={style.price}>{props.price}</div>
            </div>
            <MealForm />
        </li>
    );
}

export default MealItem;
