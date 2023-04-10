import React, { useContext, useState } from "react";
import Modal from "../UI/Modal/Modal";
import style from "./Cart.module.css";
import { CartContext } from "../store/CartProvider";
import CartItem from "./CartItem/CartItem.js";
import CarCheckOut from "./CarCheckOut/CarCheckOut";

function Cart(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    const [isCheckout, setIsCheckout] = useState(false);
    const ctx = useContext(CartContext);
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    console.log("ctx: ", ctx);

    function cartItemRemoveHandler(id) {
        ctx.removeItem(id);
    }
    function cartItemUpHandler(id) {
        ctx.upAmount(id);
    }
    function cartItemDownHandler(id) {
        ctx.downAmount(id);
    }
    function orderHandler() {
        setIsCheckout(true);
    }
    function submit(valueInfo) {
        const fetchData = async () => {
            console.log(valueInfo, ctx.items);
            console.log("bắt đầu gửi");

            // bật loading
            setIsLoading(true);

            const res = await fetch(
                "https://http-meals-reactjs-default-rtdb.firebaseio.com/orders.json",
                {
                    method: "POST",
                    body: JSON.stringify({
                        user: valueInfo,
                        items: ctx.items,
                    }),
                }
            );

            console.log(res);

            if (!res.ok) {
                console.log("gửi thất bại");
                // tắt loading
                setIsLoading(false);
                // bật lỗi
                setIsFailure(true);
                throw new Error("Something went wrong");
            }

            console.log("res.ok: ", res.ok);
            console.log("gửi thành công");

            // tắt loading
            setIsLoading(false);
            // bật send success
            setIsSend(true);
            ctx.resetItems();
        };

        fetchData().catch((error) => {
            console.log(error);
            console.log(error.message);
        });
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

    const action = (
        <div className={style.actions}>
            <button className={style["button--alt"]} onClick={props.onHideCart}>
                Close
            </button>
            <button className={style.button} onClick={orderHandler}>
                Order
            </button>
        </div>
    );

    const loading = <p>Sending order data...</p>;
    const success = (
        <>
            <p>Sucessfully send order!</p>
            <div className={style.actions}>
                <button className={style.button} onClick={props.onHideCart}>
                    Close
                </button>
            </div>
        </>
    );
    const failure = (
        <>
            <p>Failure send order!</p>
            <div className={style.actions}>
                <button className={style.button} onClick={props.onHideCart}>
                    Close
                </button>
            </div>
        </>
    );

    const contentCart = (
        <>
            <ul className={style["cart-items"]}>{cartItem}</ul>
            <div className={style.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <CarCheckOut submit={submit} onHideCart={props.onHideCart} />}
            {!isCheckout && action}
        </>
    );
    return (
        <Modal onClick={props.onHideCart}>
            {!isLoading && !isSend && !isFailure && contentCart}
            {isLoading && !isSend && !isFailure && loading}
            {isSend && !isLoading && !isFailure && success}
            {isFailure && !isSend && !isLoading && failure}
        </Modal>
    );
}

export default Cart;
