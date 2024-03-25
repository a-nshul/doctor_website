import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        username,
        password
      });
  
      message.success('Signup successful! Please login with same email and password');
      navigate('/'); 
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error('User already exists with this email. Please try again with a different username.');
      } else {
        message.error('Signup failed. Please try again.');
      }
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
            <h2 className="mb-4 text-center">Signup</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="email" value={username} onChange={handleUsernameChange} className="form-control" placeholder="Enter Username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} className="form-control" placeholder="Enter Password" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={handleTogglePasswordVisibility}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
            <p className="mt-3">Already have an account? <Link to="/" className="font-weight-bold">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
