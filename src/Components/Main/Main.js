import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../Contexts/AuthContext';


export const Main = () => {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <div className="main">
            <div className="welcome-container">
                <h1>Welcome To Our Recipe Collections</h1>
                <img src="./style/images/photo.jpeg" alt="intro" />
                <h2>Login or register to check out our recipes or to share one</h2>
                {!isAuthenticated && (
                    <div className="button-div">
                    <Link to="/login" className="button">Login</Link>
                    <Link to="/register" className="button">Register</Link>
                </div>
                )}
                
            </div>
        </div>
    )
}