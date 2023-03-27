import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <nav>
            <Link className="active" to="/">Home</Link>
            <Link to="/Catalog">All Recipes</Link>
            <Link to="#">My Recipes</Link>
            <Link to="/Create-recipe">Share Recipe</Link>
            <div className="profile">
                <Link>Welcome username</Link>
                <Link to="#">Logout</Link>
            </div>
        </nav>
    )
}