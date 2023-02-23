import React from "react";

import style from "./ButtonCart.module.css";
import CartIcon from "./IconCart";

function ButtonCart(props) {
    return (
        <button className={style.button}>
            <span className={style.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={style.badge}>3</span>
        </button>
    );
}

export default ButtonCart;
