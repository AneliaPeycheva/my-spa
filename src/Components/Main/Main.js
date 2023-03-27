import { Link } from 'react-router-dom';

export const Main = () => {
    return (
        <div className="main">
            <div className="welcome-container">
                <h1>Welcome To Our Recipe Collections</h1>
                <img src="./style/images/photo.jpeg" alt="carIntro" />
                <h2>Login or register to check out our recipes or to share one</h2>
                <div className="button-div">
                    <Link to="/Login" className="button">Login</Link>
                    <Link to="/Register" className="button">Register</Link>
                </div>
            </div>
        </div>
    )
}