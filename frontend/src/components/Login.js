import React, { useState } from 'react';
import axios from 'axios';
import './styles/LoginForm.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7777/', { email, password });

            console.log(response.data); // Check the response from the backend

            // Save the authentication token in browser storage
            localStorage.setItem('authToken', response.data.token);

            // Redirect the user to the /courses page
            window.location.href = '/courses';
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};
export default Login;
