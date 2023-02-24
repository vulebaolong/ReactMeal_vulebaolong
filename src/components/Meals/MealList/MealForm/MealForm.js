import React from "react";
import InputGroup from "../../../UI/InputGroup/InputGroup";

import style from "./MealForm.module.css";

function MealForm(props) {
    return (
        <form className={style.form}>
            <InputGroup
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
