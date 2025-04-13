import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';
import './MainLayout.css';

const MainLayout = () => {
    const { isUserLoggedIn, user, Logout } = useContext(UserContext);
    
    return(
        <div className='wrapper'>
            <header className="main-header">
                <div className='header-navigation'>
                    <NavLink to="/campaigns" className="btn btn-href">Перейти до кампаній</NavLink>
                    <NavLink to="/campaigns/add" className="btn btn-href">Створити кампанію</NavLink>
                </div>    
                <div>
                    {(!user && isUserLoggedIn()) ? <span className='user-name'>Завантаження...</span> : null}
                    {user ? <span className='user-name'>Вітаємо, {user.name}!</span> : null}
                    {isUserLoggedIn() ? <button onClick={() => Logout()} className="btn btn-exit">Вийти</button> : <NavLink to="/login" className="btn btn-register">Увійти</NavLink>}
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>  
                <div className='footer-text'>© 2025 All rights reserved by me</div>
            </footer>
        </div>
    )
}
export {MainLayout};