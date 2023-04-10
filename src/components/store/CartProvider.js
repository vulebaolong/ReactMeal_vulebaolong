import React, { useReducer } from "react";
// import CartContext from "./cart-context.js";

const initCartState = {
    items: [],
    totalAmount: 0,
};

//thiết lập CartContext ban đầu
const CartContext = React.createContext({});

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        console.log("action.type: ", action.type);
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

    if (action.type === "REMOVE") {
        console.log("action.type: ", action.type);
        const itemsNew = state.items.filter((e) => {
            return e.id !== action.id;
        });
        console.log(itemsNew);
        return {
            items: itemsNew,
            totalAmount: 0,
        };
    }

    if (action.type === "UP_AMOUNT") {
        console.log("action.type: ", action.type);
        const indexItem = state.items.findIndex((e) => {
            return e.id === action.id;
        });
        if (indexItem !== -1) {
            let amountCur = +state.items[indexItem].amount;
            let priceUp = state.items[indexItem].price / amountCur;
            return handlerUpDown(amountCur, priceUp, indexItem, "up");
        }
        return state;
    }

    if (action.type === "DOWN_AMOUNT") {
        console.log("action.type: ", action.type);
        const indexItem = state.items.findIndex((e) => {
            return e.id === action.id;
        });
        if (indexItem !== -1) {
            let amountCur = +state.items[indexItem].amount;
            let priceUp = state.items[indexItem].price / amountCur;
            if (amountCur === 1) {
                const itemsNew = state.items.filter((e) => {
                    return e.id !== action.id;
                });
                const newTotalAmount = state.totalAmount - priceUp;
                return {
                    items: itemsNew,
                    totalAmount: newTotalAmount,
                };
            }
            return handlerUpDown(amountCur, priceUp, indexItem, "down");
        }
        return state;
    }

    if (action.type === "RESET_ITEMS") {
        console.log("action.type: ", action.type);
        return initCartState;
    }

    function handlerUpDown(amountCur, priceUp, indexItem, flag) {
        let amountUp, newTotalAmount;
        if (flag === "up") {
            amountUp = amountCur + 1;
            newTotalAmount = state.totalAmount + priceUp;
        }
        if (flag === "down") {
            amountUp = amountCur - 1;
            newTotalAmount = state.totalAmount - priceUp;
        }

        state.items[indexItem] = {
            ...state.items[indexItem],
            amount: amountUp,
            price: priceUp * amountUp,
        };
        let itemsNew = [...state.items];
        return {
            items: itemsNew,
            totalAmount: newTotalAmount,
        };
    }

    return state;
};

function CartProvider(props) {
    const [cartState, dispatchCart] = useReducer(cartReducer, initCartState);

    const addItemHandler = (item) => {
        dispatchCart({ type: "ADD", item });
    };
    const removeItemHandler = (id) => {
        dispatchCart({ type: "REMOVE", id });
    };

    const upAmountHander = (id) => {
        dispatchCart({ type: "UP_AMOUNT", id });
    };
    const downAmountHander = (id) => {
        dispatchCart({ type: "DOWN_AMOUNT", id });
    };

    const resetItemsHander = () => {
        dispatchCart({
            type: "RESET_ITEMS",
        });
    };

    //Thiết lập lại CartContext
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        upAmount: upAmountHander,
        downAmount: downAmountHander,
        resetItems: resetItemsHander,
    };

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    );
}

export default CartProvider;
export { CartContext };
