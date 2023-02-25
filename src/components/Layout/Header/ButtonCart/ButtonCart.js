import React, { useContext } from "react";

import style from "./ButtonCart.module.css";
import CartIcon from "./IconCart";
import CartContext from "../../../store/cart-context.js";

function ButtonCart(props) {
    const ctx = useContext(CartContext);
    // console.log(ctx.items.length);
    return (
        <button className={style.button} onClick={props.onShowCart}>
            <span className={style.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={style.badge}>{ctx.items.length}</span>
        </button>
    );
}

export default ButtonCart;
