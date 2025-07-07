import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProtectedRoutes() {
  const [isVerified, setIsVerified] = useState(null); // null = loading, false = not verified, true = verified

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');

      if (!token || !userId) {
        setIsVerified(false);
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:8000/verify', 
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error("JWT Verification Error:", error.response?.data?.error || error.message);


        Cookies.remove('token');
        Cookies.remove('userId');

        setIsVerified(false);
      }
    };

    verifyToken();
  }, []);

  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  return isVerified ? <Outlet /> : <Navigate to="/Login" replace />;
}
