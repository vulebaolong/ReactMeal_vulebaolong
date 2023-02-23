import React from "react";

import style from "./Meals.module.css";
import MealList from "./MealList/MealList";
import MealText from "./MealText/MealText";

function Meals(props) {
    return (
        <main>
            <div className={style.meals}>
                <MealText />
                <MealList />
            </div>
        </main>
    );
}

export default Meals;
