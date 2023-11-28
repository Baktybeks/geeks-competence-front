import React, {useState} from 'react'
import classes from "./login.module.scss"
import {Link, useNavigate} from "react-router-dom"
import {links} from "../../../../links/links"
import close from "../../../../assets/img/x.png"
import {useAppDispatch} from "../../../../hook/redux";
import {loginApi} from "../../../../redux/slices/userSlice";

function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const isLoginFormValid = () => loginEmail && loginPassword
    const submitLoginHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (isLoginFormValid()) {
            dispatch(loginApi(loginEmail, loginPassword))
            navigate(links.base)
        } else {
            alert('Введите все данные')
        }
    }

    return (
        <div className={classes.content}>
            <div className={classes.block_inputs}>
                <header className={classes.head_close}>
                    <Link to={links.base}><img src={close} alt="close"/></Link>
                </header>
            </div>

            <form onSubmit={submitLoginHandler} className={classes.form}>
                <input
                    type="email"
                    name="email"
                    value={loginEmail}
                    placeholder="email"
                    onChange={e => setLoginEmail(e.target.value)}
                />

                <input
                    type="password"
                    name="password"
                    value={loginPassword}
                    placeholder="password"
                    onChange={e => setLoginPassword(e.target.value)}
                />
                <button className={classes.btn}  type="submit">войти</button>
            </form>

        </div>
    )
}

export default Login