import React from 'react'
import classes from "./Footer.module.scss"
import {Link} from "react-router-dom";

function Footer() {

    return (
        <footer className={classes.footer}>
            <Link to='https://www.geekstudio.kg/'>Made by GeekStudio</Link>
        </footer>
    )
}

export default Footer