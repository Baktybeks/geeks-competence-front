import React, {useState} from 'react'
import classes from "./signup.module.scss"
import close from "../../../../assets/img/x.png"
import {links} from "../../../../links/links"
import {Link, useNavigate} from "react-router-dom"
import {useAppDispatch} from "../../../../hook/redux";
import {registerApi} from "../../../../redux/slices/userSlice";

const passwordRegExp = /^.{5,40}$/
const userRegExp = /^.{3,50}$/

function Signup() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitRegHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        const role = "USER"
        const fromPage = "sighup"
        if (!userRegExp.test(name)) {
            return alert("Ваш Username должен содержать не менее 3 символов")
        }
        if (!userRegExp.test(email)) {
            return alert("Ваш Nickname должен содержать не менее 3 символов")
        }
        if (!passwordRegExp.test(password)) {
            return alert("Ваш пароль должен содержать не менее 5 символов")
        }
        try {
            await dispatch(registerApi(name, email, password, role, navigate, fromPage));
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
        }
    }
    return (
        <div className={classes.content}>
            <div className={classes.block_inputs}>
                <header className={classes.head_close}>
                    <Link to={links.base}><img src={close} alt="close"/></Link>
                </header>
            </div>
            <form
                className={classes.form}
                onSubmit={submitRegHandler}
            >
                <input
                    className={classes.text}
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className={classes.text}
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className={classes.text}
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className={classes.btn} type="submit">зарегистрироваться</button>
            </form>
        </div>
    )
}

export default Signup
