import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaEnvelope, FaKey } from 'react-icons/fa';
import './LoginPages.css';

const LibraryLogin = () => {
  const [formData, setFormData] = useState({
    libraryCode: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState('libraryCode'); // libraryCode, otp, newPassword
  const [forgotPasswordData, setForgotPasswordData] = useState({
    libraryCode: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:9090/api/neo/verse';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/library/libraryLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          libraryCode: formData.libraryCode,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 1) {
        setSuccess(data.message);
        // Store library info in localStorage or context
        localStorage.setItem('libraryCode', formData.libraryCode);
        setTimeout(() => {
          navigate('/library-dashboard');
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/library/forgotPassword/sendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          libraryCode: forgotPasswordData.libraryCode
        })
      });

      const data = await response.json();

      if (data.status === 1) {
        setSuccess(data.message);
        setForgotPasswordStep('otp');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/library/forgotPassword/verifyOtp?otp=${forgotPasswordData.otp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.status === 1) {
        setSuccess(data.message);
        setForgotPasswordStep('newPassword');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/library/forgotPassword/resetPassword?otp=${forgotPasswordData.otp}&newPassword=${forgotPasswordData.newPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.status === 1) {
        setSuccess(data.message);
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotPasswordStep('libraryCode');
          setForgotPasswordData({
            libraryCode: '',
            otp: '',
            newPassword: '',
            confirmPassword: ''
          });
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (forgotPasswordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    handleResetPassword(e);
  };

  const renderForgotPasswordForm = () => {
    switch (forgotPasswordStep) {
      case 'libraryCode':
        return (
          <form onSubmit={handleSendOtp} className="forgot-password-form">
            <h3>Forgot Password</h3>
            <p>Enter your Library Code to receive OTP</p>
            
            <div className="form-group">
              <label htmlFor="libraryCode">
                <FaUser />
                Library Code
              </label>
              <input
                type="text"
                id="libraryCode"
                name="libraryCode"
                value={forgotPasswordData.libraryCode}
                onChange={handleForgotPasswordChange}
                placeholder="Enter your library code"
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <button 
              type="button" 
              className="back-to-login-btn"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        );

      case 'otp':
        return (
          <form onSubmit={handleVerifyOtp} className="forgot-password-form">
            <h3>Enter OTP</h3>
            <p>OTP has been sent to your registered email</p>
            
            <div className="form-group">
              <label htmlFor="otp">
                <FaEnvelope />
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={forgotPasswordData.otp}
                onChange={handleForgotPasswordChange}
                placeholder="Enter OTP"
                required
                maxLength="6"
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>

            <button 
              type="button" 
              className="back-to-login-btn"
              onClick={() => {
                setForgotPasswordStep('libraryCode');
                setForgotPasswordData({
                  ...forgotPasswordData,
                  otp: '',
                  newPassword: '',
                  confirmPassword: ''
                });
              }}
            >
              Back
            </button>
          </form>
        );

      case 'newPassword':
        return (
          <form onSubmit={handleForgotPasswordSubmit} className="forgot-password-form">
            <h3>Set New Password</h3>
            <p>OTP verified successfully. Please enter your new password</p>
            
            <div className="form-group">
              <label htmlFor="newPassword">
                <FaKey />
                New Password
              </label>
              <div className="password-input">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={forgotPasswordData.newPassword}
                  onChange={handleForgotPasswordChange}
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FaKey />
                Confirm Password
              </label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={forgotPasswordData.confirmPassword}
                  onChange={handleForgotPasswordChange}
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>

            <button 
              type="button" 
              className="back-to-login-btn"
              onClick={() => {
                setForgotPasswordStep('otp');
                setForgotPasswordData({
                  ...forgotPasswordData,
                  newPassword: '',
                  confirmPassword: ''
                });
              }}
            >
              Back
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  if (showForgotPassword) {
    return (
      <div className="login-page library-login">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <button 
                className="back-btn"
                onClick={() => setShowForgotPassword(false)}
              >
                <FaArrowLeft />
                <span>Back to Login</span>
              </button>
              <div className="logo-section">
                <div className="logo">
                  <span>TAT</span>
                </div>
                <div className="title">
                  <h1>Forgot Password</h1>
                  <p>Trident Academy of Technology</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            {renderForgotPasswordForm()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page library-login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <a href="/" className="back-btn">
              <FaArrowLeft />
              <span>Back to Home</span>
            </a>
            <div className="logo-section">
              <div className="logo">
                <span>TAT</span>
              </div>
              <div className="title">
                <h1>Library's Login</h1>
                <p>Trident Academy of Technology</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="libraryCode">
                <FaUser />
                Library Code
              </label>
              <input
                type="text"
                id="libraryCode"
                name="libraryCode"
                value={formData.libraryCode}
                onChange={handleInputChange}
                placeholder="Enter your library code"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock />
                Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="forgot-password-link">
              <button 
                type="button"
                className="forgot-password-btn"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>Need help? Contact Library Office</p>
            <p>Enter your library code and password to login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryLogin;
