import React from "react";

const CartContext = React.createContext({
    item: [
        { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
        { id: "c2", name: "Sushi", amount: 2, price: 12.99 },
    ],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
});

export default CartContext;
