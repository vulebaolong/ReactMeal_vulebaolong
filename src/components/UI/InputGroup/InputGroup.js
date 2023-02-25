import React from "react";

import style from "./InputGroup.module.css";

const InputGroup = React.forwardRef((props, ref) => {
    return (
        <div className={style.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} ref={ref} />
        </div>
    );
});

export default InputGroup;
