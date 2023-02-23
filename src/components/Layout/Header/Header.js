import React from "react";

import style from "./Header.module.css";
import imgMeals from "../../../assets/meals.jpg";
import ButtonCart from "./ButtonCart/ButtonCart";

function Header(props) {
    return (
        <>
            <header className={style.header}>
                <h1>React Meals</h1>
                <ButtonCart />
            </header>
            <div className={style["main-image"]}>
                <img src={imgMeals} alt="A tabe food" />
            </div>
        </>
    );
}

export default Header;
