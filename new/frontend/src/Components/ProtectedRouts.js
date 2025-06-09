import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ProtectedRoutes() {
  
    if( !Cookies.get('token') && !Cookies.get('userId') ) {
        return <Navigate to="/Login" replace />;
    }
    else {
        return <Outlet />;
    }
}