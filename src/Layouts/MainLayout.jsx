import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';
import './MainLayout.css';
import logo from '../assets/logo.png';

const MainLayout = () => {
    const { isUserLoggedIn, user, Logout } = useContext(UserContext);
    
    const navigate = useNavigate();


    return (
        <div className='wrapper'>
            <header className="main-header">
                <div className="header-logo">
                    <NavLink to="/">
                        <img src={logo} alt="no" className='img-logo' />
                    </NavLink>
                </div>
                <div className='header-navigation'>

                    <div className="nav-campaign-buttons">
                        <NavLink to="/campaigns" className="btn btn-href">Перейти до кампаній</NavLink>
                        <NavLink to="/campaigns/add" className="btn btn-href">Створити кампанію</NavLink>
                    </div>

                    <div className="">
                        {(!user && isUserLoggedIn()) ? <span className='user-name'>Завантаження...</span> : null}
                        {user ? <span className='user-name'>Вітаємо, {user.name}!</span> : null}
                        {isUserLoggedIn() ? <button onClick={() => navigate('/profile')} className="btn btn-exit">Профіль</button> : <NavLink to="/login" className="btn btn-register">Увійти</NavLink>}
                    </div>

                </div>

            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <div className='footer-text'>© 2025 All rights reserved by me</div>
            </footer>
        </div>
    )
}
export { MainLayout };