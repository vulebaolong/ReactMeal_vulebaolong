import React from "react";
import MealForm from "../MealForm/MealForm";

import style from "./MealItem.module.css";

function MealItem(props) {
    const valueForm = {
        id: props.id,
        name: props.name,
        description: props.description,
        price: props.price,
    };
    return (
        <li className={style.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={style.description}>{props.description}</div>
                <div className={style.price}>{props.price}</div>
            </div>
            <MealForm valueForm={valueForm} />
        </li>
    );
}

export default MealItem;
