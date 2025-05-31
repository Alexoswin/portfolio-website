import './Login.css';

export default function Login() {
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Welcome Back</h2>
                <p>Please login to your account</p>

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                />

                <button type="submit">Login</button>
                <p className="signup-link">Don't have an account? <a href="#">Sign up</a></p>
            </form>
        </div>
    );
}
