import React, { useContext, useRef } from "react";
import InputGroup from "../../../UI/InputGroup/InputGroup";

import style from "./MealForm.module.css";
import CartContext from "../../../store/cart-context";

function MealForm(props) {
    const ctx = useContext(CartContext);
    const inputRef = useRef();
    // console.log(inputRef.current?.value);

    function submitHandler(e) {
        e.preventDefault();
        ctx.addItem({
            id: props.valueForm.id,
            name: props.valueForm.name,
            amount: inputRef.current?.value,
            price: props.valueForm.price,
        });
    }

    return (
        <form className={style.form} onSubmit={submitHandler}>
            <InputGroup
                ref={inputRef}
                label="Amount"
                input={{
                    id: "amount",
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
        </form>
    );
}

export default MealForm;
