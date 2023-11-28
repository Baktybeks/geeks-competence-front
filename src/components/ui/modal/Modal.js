import React from 'react';
import classes from "./Modal.module.scss";

function Modal({active, setActive, children}) {
    return (
        <div className={active ? `${classes.modal} ${classes.active}` : `${classes.modal}`}
             onClick={() => setActive(false)}>
            <div className={active ? `${classes.modal__content} ${classes.active}` : `${classes.modal__content}`}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;