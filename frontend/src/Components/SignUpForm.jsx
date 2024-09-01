import React, { useState } from 'react';
import './crediantials.css';

const SignupForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="form-container">
      <div>
        <button onClick={onSwitch}>Login</button>
        <button disabled>Sign Up</button>
      </div>
      <form>
        <div>
          <label>Email Address *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            required
          />
        </div>
        <div>
          <label>Password *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div>
          <label>Confirm Password *</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
          />
        </div>
        <button type="submit" className="btn-success">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
