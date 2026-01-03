import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Floatingicons from './Floatingicons';

export default function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/Login', {
                email,
                password
            });

            if (response.status === 200) {
                const token = response.data.token;
                const userId = response.data.userId;

                Cookies.set('token', token);
                Cookies.set('userId', userId);
                setMessage("✅ Login Sucessfull")
                navigate('/Admin');
            }
            else if (response.status === 400) {
                setMessage("❌ Invalid Credentials")
            }
        }
        catch (error) {
            console.error('Error during login:', error);
            setMessage("❌ Invalid Credentials")
        }
    }

    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <Floatingicons />
            <div className="bg-[var(--containerBackground)] text-[var(--textColor)] p-8 shadow-[0_12px_30px_rgba(0,0,0,0.3)] w-full max-w-md transition-transform duration-300">
                <form className="login-form">
                    <h3>Welcome Back Admin</h3>
                    <p className="mb-8 text-gray-600">Please login to your account</p>
                    <h5>{message}</h5>

                    <div className="inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                        </svg>
                    </div>
                    <input
                        className="w-[95%] p-3 mb-8 border-0 border-b border-[var(--textColor)] rounded-none bg-[var(--containerBackground)] text-[var(--textColor)] focus:border-blue-500 focus:outline-none"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
                        </svg>
                    </div>
                    <input
                        className="w-[95%] p-3 mb-8 border-0 border-b border-[var(--textColor)] rounded-none bg-[var(--containerBackground)] text-[var(--textColor)] focus:border-blue-500 focus:outline-none"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" onClick={handelSubmit} className="w-full p-3 bg-blue-500 text-white border-none cursor-pointer text-base transition-colors duration-300 hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
}
