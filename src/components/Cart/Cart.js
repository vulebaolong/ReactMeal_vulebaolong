import React from "react";
import Modal from "../UI/Modal/Modal";

import style from "./Cart.module.css";

function Cart(props) {
    const CartItem = [
        { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
        { id: "c2", name: "Sushi", amount: 2, price: 12.99 },
    ].map((item) => {
        return <li key={item.id}>{item.name}</li>;
    });
    return (
        <Modal onClick={props.onHideCart}>
            <ul>{CartItem}</ul>
            <div className={style.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={style.actions}>
                <button className={style["button--alt"]} onClick={props.onHideCart}>
                    Close
                </button>
                <button className={style.button}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;
