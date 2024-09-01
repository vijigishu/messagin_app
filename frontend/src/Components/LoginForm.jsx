import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './crediantials.css';

// LoginForm Component
const LoginForm = ({ onSwitch, isActive }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous success message
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('sessionId', data.sessionId);
        setSuccessMessage('Login successful! Redirecting to home...');
        setTimeout(() => {
          navigate('/home'); // Redirect to home
        }, 2000);
      } else {
        setErrorMessage('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div className="form-container">
      <div>
        <button
          className={isActive === 'login' ? 'active-button' : ''}
          disabled
        >
          Login
        </button>
        <button
          className={isActive === 'signup' ? 'active-button' : ''}
          onClick={() => onSwitch('signup')}
        >
          Sign Up
        </button>
      </div>
      {successMessage && <div className="message success">{successMessage}</div>}
      {errorMessage && <div className="message error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <div className='email'>
            <div className="first">
              <label htmlFor='username'>Username<span>*</span></label>
            </div>
            <div className="second">
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Username"
                required
              />
            </div>
          </div>
          <div>
            <label>Password <span>*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="b">
            <button type="submit" className="btn-primary">
              Login
            </button>
            <button type="reset" className='reset' onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// SignupForm Component
const SignupForm = ({ onSwitch, isActive }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous success message
    setErrorMessage(''); // Clear previous error message

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Sign up successful! Redirecting to login...');
        setTimeout(() => {
          onSwitch('login'); // Switch to the login form
        }, 2000);
      } else {
        setErrorMessage('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="form-container">
      <div>
        <button
          className={isActive === 'login' ? 'active-button' : ''}
          onClick={() => onSwitch('login')}
        >
          Login
        </button>
        <button
          className={isActive === 'signup' ? 'active-button' : ''}
          disabled
        >
          Sign Up
        </button>
      </div>
      {successMessage && <div className="message success">{successMessage}</div>}
      {errorMessage && <div className="message error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <div className='email'>
            <div className="first">
              <label htmlFor='username'>Username<span>*</span></label>
            </div>
            <div className="second">
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Username"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor='password'>Password <span>*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password <span>*</span></label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="b">
            <button type="submit" className="btn-success">
              Sign Up
            </button>
            <button type="reset" className='reset' onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Credentials Component
const Credentials = () => {
  const [activeForm, setActiveForm] = useState('login');

  const handleSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <div>
      {activeForm === 'login' ? (
        <LoginForm onSwitch={handleSwitch} isActive={activeForm} />
      ) : (
        <SignupForm onSwitch={handleSwitch} isActive={activeForm} />
      )}
    </div>
  );
};

export default Credentials;
