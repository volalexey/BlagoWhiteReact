import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { NavLink } from "react-router-dom";
import "./Style/Auth.css";

import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { Register } = useContext(UserContext);

    const onSubmit = (values) => {
        console.log(values);
        Register(values);
        navigate('/campaigns');
    };

    return (
    <div className="div-auth">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="div-auth-container">
                <h1>Реєстрація</h1>
                <hr />
                <div>
                    <label htmlFor="name">Ім'я (логін)</label>
                    <input className="input-auth" {...register("name")} type="text" id="name"  placeholder="Enter Name" required />
                </div>
                <div>
                    <label htmlFor="email">Пошта</label>
                    <input className="input-auth" {...register("email")} type="email" id="email"  placeholder="Enter Email" required />
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input className="input-auth" {...register("password")} type="password" id="password" placeholder="Enter Password" required />
                </div>

                <hr />

                <button type="submit" className="btn btn-auth-submit">Зареєструватись</button>
            </div>
            <div className="div-auth-container alter-auth">
                <p>Вже маєте акаунт?  <NavLink to={"/login"} className="auth-href">Увійти</NavLink></p>
            </div>
        </form>
    </div>
        
    );
}