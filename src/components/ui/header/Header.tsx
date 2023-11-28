import React from 'react'
import {links} from "../../../links/links"
import {Link, NavLink, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setIsAuth} from "../../../redux/slices/userSlice"
import {useAppSelector} from "../../../hook/redux";
import classes from "./Header.module.scss";
function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth} = useAppSelector(state => state.userReducer)
    const name = localStorage.getItem('name') ?? ''
    const role = localStorage.getItem('role') ?? ''
    const logOut = () => {
        localStorage.clear()
        navigate(links.base)
        dispatch(setIsAuth(false))
    }

    return (
        <header className={classes.header}>
            <nav>
                {isAuth ?
                    <ul>
                        <li>
                            <NavLink to={links.base} className={classes.active_link}>Главная</NavLink>
                        </li>
                        <li>
                            <NavLink to={links.competence} className={classes.active_link}>Компетенция</NavLink>
                        </li>
                        {role === "ADMIN"
                            ?
                            <li>
                                <NavLink to={links.admin} className={classes.active_link}>Админка</NavLink>
                            </li>
                            :
                            ''
                        }
                        <div className={classes.auth}>
                            <p className={classes.auth_name}>Логин "{name}"</p>
                            <p className={classes.btn} onClick={logOut}>Выход</p>
                        </div>
                    </ul>
                    :
                    <ul>
                        <li>
                            <NavLink to={links.base} className={classes.active_link}>Главная</NavLink>
                        </li>
                        <li>
                            <NavLink to={links.competence} className={classes.active_link}>Компетенция</NavLink>
                        </li>
                        <div className={classes.auth}>
                            <Link to={links.login}>Вход</Link>
                            <Link to={links.signup}>Регистрация</Link>
                        </div>
                    </ul>
                }
            </nav>
        </header>
    )
}

export default Header