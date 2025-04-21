import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const StoreUser = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const GetUserFromStore = () => {
        const user = localStorage.getItem('user'); 
        if (user) {
            return JSON.parse(user);
        }
    }

    const isUserLoggedIn = () => {
        const user = localStorage.getItem('user');
        if (user) {
            return true;
        }
        return false;
    }

    const CleareStoredUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const Login = async (user) => {
        try {
            const response = await axios.post('http://localhost:5211/login', user);
            StoreUser(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const Register = async (user) => {
        try {
            const response = await axios.post('http://localhost:5211/register', user);

            if(response.status === 200){
                StoreUser(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const Logout = () => {
        CleareStoredUser();
        setUser(null);
    }

    useEffect(() => {
        const user = GetUserFromStore();
        if (user) {
            setUser(user);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, Login, Register, StoreUser, 
                                        GetUserFromStore, CleareStoredUser, isUserLoggedIn, Logout }}>
            {children}
        </UserContext.Provider>
    )

}