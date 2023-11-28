import {Routes, Route, useLocation} from "react-router-dom";
import React from 'react';
import {authRoutes, publicRoutes} from "./routes";
import {useAppSelector} from "../hook/redux";
import Header from "../components/ui/header/Header";
import Footer from "../components/ui/footer/Footer";

function AppRouter() {
    const {isAuth} = useAppSelector(state => state.userReducer)
    const location = useLocation()
    return (
        <>
            <Header/>
                <Routes>
                    {isAuth && authRoutes.map(({path, element}) =>
                        <Route key={path} path={path} element={element}/>
                    )}
                    {publicRoutes.map(({path, element}) =>
                        <Route key={path} path={path} element={element}/>
                    )}
                </Routes>
            {location.pathname !== '/competence' && <Footer/>}
        </>
    );
}

export default AppRouter;