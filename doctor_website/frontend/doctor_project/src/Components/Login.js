import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      message.error('Please enter your username.');
      return;
    }

    if (!password.trim()) {
      message.error('Please enter your password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);
      console.log(response.data);
      message.success('Login successful!');
      navigate('/fetchPatient');
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={handleSubmit} className="border p-4 rounded">
          <h2 className="mb-4">Login</h2>
          <div className="form-group mb-3">
            <label htmlFor='email'><strong>Username</strong></label>
            <input type='email' value={username} onChange={handleUsernameChange} className="form-control" placeholder='Enter Username' />
          </div>
          <div className="form-group mb-3">
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' value={password} onChange={handlePasswordChange} className="form-control" placeholder='Enter Password' />
          </div>
          <button type="submit" className="btn btn-primary"><strong>Log in</strong></button>
          <p className="mt-2"><input type='checkbox' /> You agree to our terms and policies (optional)</p>
          <p>Don't have an account? <Link to="/signup" className="font-weight-bold">Create Account</Link></p>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Login;
