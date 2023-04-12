import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../Contexts/AuthContext';

export const Header = () => {
    const {userEmail, isAuthenticated} = useContext(AuthContext);

    return (
        <nav>
            <Link className="active" to="/">Home</Link>
            <Link to="/catalog">All Recipes</Link>
            {isAuthenticated && (
                <>
                    {/* <Link to="/my-catalog">My Recipes</Link> */}
                    <Link to="/create-recipe">Share Recipe</Link>
                </>               
            )}        
            {!isAuthenticated && (
                <div className="profile">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>                 
                </div>
            )}
            {isAuthenticated && (
                <div className="profile">
                    <Link>{`Welcome ${userEmail}`}</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            )}
            
        </nav>
    )
}