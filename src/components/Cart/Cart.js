import React, { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import style from "./Cart.module.css";
import CartContext from "../store/cart-context.js";
import CartItem from "./CartItem/CartItem.js";

function Cart(props) {
    const ctx = useContext(CartContext);
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    console.log(ctx);

    function cartItemRemoveHandler(id) {
        ctx.removeItem(id);
    }
    function cartItemUpHandler(id) {
        ctx.upAmount(id);
    }
    function cartItemDownHandler(id) {
        ctx.downAmount(id);
    }
    const cartItem = ctx.items.map((item) => {
        return (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onUp={cartItemUpHandler.bind(null, item.id)}
                onDown={cartItemDownHandler.bind(null, item.id)}
            />
        );
    });
    return (
        <Modal onClick={props.onHideCart}>
            <ul className={style["cart-items"]}>{cartItem}</ul>
            <div className={style.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
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
