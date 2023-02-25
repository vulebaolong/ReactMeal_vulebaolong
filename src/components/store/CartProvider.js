import React, { useReducer } from "react";
import CartContext from "./cart-context.js";

const initCartState = {
    items: [],
    totalAmount: 0,
};
const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        let itemsNew = [];
        /**
         * dùng hàm finđInex để lấy index nếu như id thêm vào có trong state
         * nếu có
         *  - dùng index đó bóc từ state trước ra thay đổi giá trị bên trong
         *  - trả lại các key của item đó
         *  - thay đổi key amount
         *  - thay đổi key price
         *  - sau đó giải tất cả các item đang có trong state vào itemsNew và không thêm mới
         * nếu không có
         *  - thêm mới item vào itemsNew
         *  - giải tất cả các item cũ vào lại
         */
        const indexItem = state.items.findIndex((e) => {
            return e.id === action.item.id;
        });
        action.item.price = action.item.price * +action.item.amount;
        if (indexItem !== -1) {
            state.items[indexItem] = {
                ...state.items[indexItem],
                amount: `${+state.items[indexItem].amount + +action.item.amount}`,
                price: state.items[indexItem].price + action.item.price,
            };

            itemsNew = [...state.items];
        } else {
            itemsNew = [action.item, ...state.items];
        }

        // console.log(itemsNew);
        return {
            items: itemsNew,
            totalAmount: state.totalAmount + action.item.amount * action.item.price,
        };
    }
    return initCartState;
};

function CartProvider(props) {
    const [cartState, dispatchCart] = useReducer(cartReducer, initCartState);

    const addItemHandler = (item) => {
        dispatchCart({ type: "ADD", item });
    };

    const removeItemHandler = (id) => {};

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    };
    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    );
}

export default CartProvider;
