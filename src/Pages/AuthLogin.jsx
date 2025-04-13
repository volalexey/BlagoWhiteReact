import { Login } from "../Components/Auth/Login";
import { Register } from "../Components/Auth/Register";
import { NavLink } from "react-router-dom";

const AuthLogin = ({type}) => {
    return (
        <div className="div-login">
            {type === 'login' ? <Login /> : <Register />}
        </div>
    )
}

export { AuthLogin};