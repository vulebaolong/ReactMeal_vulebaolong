import React, { useContext, useEffect, useRef } from "react";

import style from "./ButtonCart.module.css";
import CartIcon from "./IconCart";
import CartContext from "../../../store/cart-context.js";

function ButtonCart(props) {
    const ctx = useContext(CartContext);
    const { totalAmount } = ctx;
    const refButton = useRef();

    useEffect(() => {
        const timming = setTimeout(function () {
            // console.log("xóa");
            refButton.current.classList.remove(`${style.bump}`);
        }, 300);
        // console.log("thêm");
        refButton.current.classList.add(`${style.bump}`);

        return function clear() {
            // console.log("clear");
            clearTimeout(timming);
        };
    }, [totalAmount]);
    return (
        <button ref={refButton} className={style.button} onClick={props.onShowCart}>
            <span className={style.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={style.badge}>{ctx.items.length}</span>
        </button>
    );
}

export default ButtonCart;
