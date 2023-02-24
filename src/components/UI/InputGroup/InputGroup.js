import React from "react";

import style from "./InputGroup.module.css";

function InputGroup(props) {
    return (
        <div className={style.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} />
        </div>
    );
}

export default InputGroup;
