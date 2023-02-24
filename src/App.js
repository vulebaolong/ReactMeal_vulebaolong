import React, { useState } from "react";
import Cart from "./components/Cart/Cart.js";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";

function App() {
    const [isCart, setIsCart] = useState(false);
    function showCartHandler() {
        setIsCart(true);
    }
    function hideCartHandler() {
        setIsCart(false);
    }
    return (
        <>
            {isCart && <Cart onHideCart={hideCartHandler} />}
            <Header onShowCart={showCartHandler} />
            <main>
                <Meals />
            </main>
        </>
    );
}

export default App;
