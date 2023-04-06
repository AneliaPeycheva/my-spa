import { useContext } from 'react';
import { Link } from "react-router-dom";

import { useForm } from '../../Hooks/useForm';
import { AuthContext } from '../../Contexts/AuthContext';

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const [values, changeHandler, onSubmit] = useForm({
        email:"",
        password:"",
        confirmPassword:""
    }, onRegisterSubmit);

    return (
        <div id="register">
            <form method="post" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                  

                    <p>Username</p>
                    <input 
                        type="text" 
                        placeholder="Enter Username" 
                        name="email" 
                        value={values.email}
                        onChange={changeHandler}
                    />

                    <p>Password</p>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        name="password" 
                        value={values.password}
                        onChange={changeHandler}
                    />

                    <p>Repeat Password</p>
                    <input 
                        type="password" 
                        placeholder="Repeat Password" 
                        name="confirmPassword" 
                        value={values.confirmPassword}
                        onChange={changeHandler}
                    />                   

                    <button type="submit" className="registerbtn">Register</button>             
                </div>

                <div className="container signin">
                    <p>Already have an account?
                        <Link to="/login">Sign in</Link>.</p>
                </div>
            </form>
        </div>
    )
}