import React from 'react';
import classes from "./ModalUpdate.module.scss";

function ModalUpdate ({activeModalUpdate, setActiveModalUpdate, children}) {
    return (
        <div className={activeModalUpdate ? `${classes.modal} ${classes.active}` : `${classes.modal}`}
             onClick={() => setActiveModalUpdate(false)}>
            <div className={activeModalUpdate ? `${classes.modal__content} ${classes.active}` : `${classes.modal__content}`}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default ModalUpdate;