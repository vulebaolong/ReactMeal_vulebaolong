import React from "react";
import ReactDOM from "react-dom";

import style from "./Modal.module.css";

function Backdrop(props) {
    return <div className={style.backdrop} onClick={props.onClick}></div>;
}

function ModalContent(props) {
    return <div className={style.modal}>{props.children}</div>;
}

const modalEl = document.getElementById("modal");

function Modal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, modalEl)}
            {ReactDOM.createPortal(
                <ModalContent>{props.children}</ModalContent>,
                modalEl
            )}
        </>
    );
}

export default Modal;
