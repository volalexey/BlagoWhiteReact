import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {
    return(
        <div>
            <header className="main-header">
                Navbar
                <NavLink to="/campaigns" className="btn">Перейти до кампаній</NavLink>
                <NavLink to="/campaigns/add" className="btn">Створити кампанію</NavLink>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                Footer
            </footer>
        </div>
    )
}
export {MainLayout};