import {links} from "./links";
import {Navigate} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import Competence from "../pages/Сompetence/Competence";
import Signup from "../components/ui/auth/sighup/Signup";
import Login from "../components/ui/auth/login/Login";
import AdminPage from "../pages/AdminPage/AdminPage";


export const authRoutes = [
    {
        path: links.admin,
        element: <AdminPage/>
    },
    {
        path: links.competence,
        element: <Competence/>
    },
]

export const publicRoutes = [
    {
        path: links.base,
        element: <MainPage/>
    },
    {
        path: links.competence,
        element: <Competence/>
    },
    {
        path: links.signup,
        element: <Signup/>
    },
    {
        path: links.login,
        element: <Login/>
    },
    {
        path: '*',
        element: <Navigate to='/'/>
    },
]