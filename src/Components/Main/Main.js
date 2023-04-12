import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../Contexts/AuthContext';


export const Main = () => {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <div className="main">
            <div className="welcome-container">
                <h1>Еat delicious, be happy!</h1>
                <img src="./style/images/fruits.jpg" alt="intro" />
                
                {!isAuthenticated && (
                    <>
                        <h2>Login or register to share one recipe</h2>
                        <div className="button-div">
                            <Link to="/login" className="button">Login</Link>
                            <Link to="/register" className="button">Register</Link>
                        </div>
                    </>              
                )}
                
            </div>
        </div>
    )
}