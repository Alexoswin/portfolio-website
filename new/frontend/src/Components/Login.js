import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Floatingicons from './Floatingicons';
export default function Login() {
      const navigate = useNavigate();
  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post('http://localhost:8000/Login', {
                email,
               password
            });

            if (response.status === 200) {
                 const token = response.data.token;
                 const userId = response.data.userId;
                 
                 Cookies.set('token', token);
                 Cookies.set('userId', userId);
                alert('Login successful!');
                navigate('/Admin');

            }
            else {
                alert('Login failed. Please check your credentials.');
            } 
        }
        catch (error) {
            console.error('Error during login:', error);
            alert('error', error.message);
        }
    }
    return (
        <div className="login-background">
            <Floatingicons/>
        <div className="login-container">
            <form className="login-form">
                <h3>Welcome Back Admin</h3>
                <p>Please login to your account</p>

                <div className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                    </svg>
                </div>
                <input
                    className="input"
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEmail(e.target.value)}

                />
                
                <div className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
                    </svg>
                </div>
                <input
                    className="input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" onClick={handelSubmit}>Login</button>
                
            </form>
        </div>
     </div>   
    );
}
