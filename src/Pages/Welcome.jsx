import React from 'react';
import { NavLink } from 'react-router-dom';

const Welcome = () => {
    return (
        <div>
            <h1>Хай!</h1>
            <NavLink to="/campaigns" className="btn">Перейти до кампаній</NavLink>
        </div>
    );
}

export { Welcome };