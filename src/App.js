import React, { useState } from "react";
import Cart from "./components/Cart/Cart.js";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/store/CartProvider.js";

function App() {
    const [isCart, setIsCart] = useState(false);
    function showCartHandler() {
        setIsCart(true);
    }
    function hideCartHandler() {
        setIsCart(false);
    }
    return (
        <CartProvider>
            {isCart && <Cart onHideCart={hideCartHandler} />}
            <Header onShowCart={showCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
