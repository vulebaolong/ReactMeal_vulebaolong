import React from "react";

import style from "./Header.module.css";
import imgMeals from "../../../assets/meals.jpg";

function Header(props) {
    return (
        <>
            <header className={style.header}>
                <h1>React Meals</h1>
                <button>Cart</button>
            </header>
            <div className={style["main-image"]}>
                <img src={imgMeals} />
            </div>
        </>
    );
}

export default Header;
