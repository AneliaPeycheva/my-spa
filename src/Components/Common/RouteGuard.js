import { useContext, useNavigate } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

export const RouteGuard = ({
    children
}) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated){
        return <Navigate to="/login" />
    }       

    return (
        <>
            {children}
        </>       
    )
}