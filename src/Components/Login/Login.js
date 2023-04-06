import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../Hooks/useForm';
import { AuthContext } from '../../Contexts/AuthContext';

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);
    const [values, changeHandler, onSubmit] = useForm({
        email:"",
        password:"",
    }, onLoginSubmit)

    return (
    <div id="login">
        <form method="post" onSubmit={onSubmit}>
            <div className="container">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>               
            
                <p>Username</p>
                <input 
                    placeholder="Enter email" 
                    name="email" 
                    type="text" 
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
                
                <button type="submit" className="registerbtn">Login</button>
            </div>

            <div className="container signin">
                <p>Dont have an account?
                    <Link to="/register">Sign up</Link>.</p>
            </div>
        </form>
    </div>
    )
}