import React from "react";
import ReactDOM from "react-dom";

import style from "./Modal.module.css";

function Backdrop(params) {
    return <div className={style.backdrop}></div>;
}

function ModalContent(props) {
    return <div className={style.modal}>{props.children}</div>;
}

const modalEl = document.getElementById("modal");

function Modal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop />, modalEl)}
            {ReactDOM.createPortal(
                <ModalContent>{props.children}</ModalContent>,
                modalEl
            )}
        </>
    );
}

export default Modal;
