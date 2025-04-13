import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Style/Auth.css";

export const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { Login } = useContext(UserContext);

    const onSubmit = (values) => {
        console.log(values);
        Login(values);
        navigate('/campaigns');
    };

    return (
        <div className="div-auth">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="div-auth-container">
                    <h1>Вхід</h1>
                    <hr />
                    <div>
                        <label htmlFor="email">Пошта</label>
                        <input className="input-auth" {...register("email")} type="email" id="email"  placeholder="Enter Email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Пароль</label>
                        <input className="input-auth" {...register("password")} type="password" id="password" placeholder="Enter Password" required />
                    </div>

                    <hr />

                    <button type="submit"  className="btn btn-auth-submit">Вхід</button>
                </div>
                <div className="div-auth-container alter-auth">
                    <p>Ще не маєта акаунту?  <NavLink to={"/register"} className="auth-href">Зареєструватись</NavLink></p>
                </div>
            </form>
        </div>
    );
}