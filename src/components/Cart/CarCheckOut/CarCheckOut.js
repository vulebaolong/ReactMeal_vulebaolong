import React, { useRef, useState } from "react";
import style from "./CarCheckOut.module.css";
import useInput from "../../../hooks/useInput";

function checkName(value) {
    return value.trim() !== "";
}

function checkPhone(value) {
    return Number.isInteger(+value) && value.trim() !== "";
}

function checkEmail(value) {
    return value.includes("@") && value.trim() !== "";
}

function CarCheckOut(props) {
    const nameInputRef = useRef();
    const phoneInputRef = useRef();
    const emailInputRef = useRef();
    const adressInputRef = useRef();

    const {
        value: valueName,
        error: errorName,
        changeHandler: changeHandlerName,
        blurHandler: blurHandlerName,
    } = useInput(checkName);

    const {
        value: valuePhone,
        error: errorPhone,
        changeHandler: changeHandlerPhone,
        blurHandler: blurHandlerPhone,
    } = useInput(checkPhone);

    const {
        value: valueEmail,
        error: errorEmail,
        changeHandler: changeHandlerEmail,
        blurHandler: blurHandlerEmail,
    } = useInput(checkEmail);

    const {
        value: valueAdress,
        error: errorAdress,
        changeHandler: changeHandlerAdress,
        blurHandler: blurHandlerAdress,
    } = useInput(checkName);

    function handlerConfrim(e) {
        e.preventDefault();

        const valueObj = {
            name: nameInputRef.current.value,
            phone: phoneInputRef.current.value,
            email: emailInputRef.current.value,
            adress: adressInputRef.current.value,
        };
        blurHandlerName();
        changeHandlerName({
            target: nameInputRef.current,
        });
        const isCheckName = checkName(valueObj.name);

        blurHandlerPhone();
        changeHandlerPhone({
            target: phoneInputRef.current,
        });
        const isCheckPhone = checkName(valueObj.phone);

        blurHandlerEmail();
        changeHandlerEmail({
            target: emailInputRef.current,
        });
        const isCheckEmail = checkName(valueObj.email);

        blurHandlerAdress();
        changeHandlerAdress({
            target: adressInputRef.current,
        });
        const isCheckAdress = checkName(valueObj.adress);

        if (!isCheckName || !isCheckPhone || !isCheckEmail || !isCheckAdress) return;

        console.log(valueObj);
        props.submit(valueObj);
    }

    function handlerCancel() {
        props.onHideCart();
    }
    const validName = {
        className: `${style.control} ${errorName ? style.invalid : ""}`,
        validMessage: errorName ? <p>Your Name not valid</p> : "",
    };
    const validPhone = {
        className: `${style.control} ${errorPhone ? style.invalid : ""}`,
        validMessage: errorPhone ? <p>Your Phone not valid</p> : "",
    };
    const validEmail = {
        className: `${style.control} ${errorEmail ? style.invalid : ""}`,
        validMessage: errorEmail ? <p>Your Email not valid</p> : "",
    };
    const validAdress = {
        className: `${style.control} ${errorAdress ? style.invalid : ""}`,
        validMessage: errorAdress ? <p>Your Adress not valid</p> : "",
    };
    return (
        <form className={style.form}>
            <div className={validName.className}>
                <label htmlFor="name">Your Name</label>
                <input
                    id="name"
                    type="text"
                    value={valueName}
                    onChange={changeHandlerName}
                    onBlur={blurHandlerName}
                    ref={nameInputRef}
                />
                {validName.validMessage}
            </div>
            <div className={validPhone.className}>
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="text"
                    value={valuePhone}
                    onChange={changeHandlerPhone}
                    onBlur={blurHandlerPhone}
                    ref={phoneInputRef}
                />
                {validPhone.validMessage}
            </div>
            <div className={validEmail.className}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={valueEmail}
                    onChange={changeHandlerEmail}
                    onBlur={blurHandlerEmail}
                    ref={emailInputRef}
                />
                {validEmail.validMessage}
            </div>
            <div className={validAdress.className}>
                <label htmlFor="adress">Adress</label>
                <input
                    id="adress"
                    type="text"
                    value={valueAdress}
                    onChange={changeHandlerAdress}
                    onBlur={blurHandlerAdress}
                    ref={adressInputRef}
                />
                {validAdress.validMessage}
            </div>
            <div className={style.actions}>
                <button type="button" onClick={handlerCancel}>
                    Cancel
                </button>
                <button
                    className={style.submit}
                    onClick={(e) => {
                        handlerConfrim(e);
                    }}
                >
                    Confrim
                </button>
            </div>
        </form>
    );
}

export default CarCheckOut;
