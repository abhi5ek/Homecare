import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://13.200.240.28:5007/api/auth/reset-password', { email, token: otp, password, repeatpassword: repeatPassword });
      setMessage(response.data.message);
      if (response.status === 200) {
        window.location.href = 'http://13.200.240.28:3000/login'; // Redirect to login page on successful password reset
      }
    } catch (error) {
      setMessage("Failed to reset password");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header">Reset Password</h5>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">OTP:</label>
                <input type="text" value={otp} onChange={e => setOtp(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Repeat Password:</label>
                <input type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} className="form-control" />
              </div>
              <button onClick={handleResetPassword} className="btn btn-info">Reset Password</button>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
