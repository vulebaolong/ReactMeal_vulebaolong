import { useState } from "react";

function useInput(check) {
    const [value, setValue] = useState("");
    const [isTouch, setIsTouch] = useState(false);

    const isValid = check(value);
    const error = !isValid && isTouch;

    function changeHandler(e) {
        setValue(e.target.value);
    }
    function blurHandler() {
        setIsTouch(true);
    }

    return {
        value,
        error,
        changeHandler,
        blurHandler,
    };
}

export default useInput;
