import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Reset.module.css';
import { resetPasswordApi } from "../../api/auth.api";


const ResetForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  
  // State for UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  
  // Hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get token from URL
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (!urlToken) {
      setError('Invalid or missing reset token');
    } else {
      setToken(urlToken);
      setError('');
    }
  }, [searchParams]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when typing
  };
  
  // Validate password
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (password.length > 50) {
      return 'Password cannot be longer than 50 characters';
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      return 'Password must only contain letters and numbers';
    }
    return '';
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Both password fields are required");
      return;
    }
  
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
  
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }
  
    try {
      setLoading(true);
  
      console.log("Request sent to server");
  
      const response = await resetPasswordApi(token, formData.newPassword);
  
      console.log("Response received from server");
  
      if (response.data.status === "success") {
        console.log(response.data.message);
        setSuccess(true);
  
        setTimeout(() => {
          navigate("/login");
        }, 0);
      } else {
        console.log(response.data.message);
        setError(response.data.message);
      }
  
    } catch (err) {
      console.log("API error occurred");
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };
  
  
  // If no token, show error
  if (!token && error) {
    return (
      <div className={styles.container}>
        <div className={`${styles.card} ${styles.errorCard}`}>
          <h2>Reset Password</h2>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className={styles.button}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  
  
  // Main form
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Reset Your Password</h2>
  
        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}
  
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
            />
          </div>
  
          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
            />
          </div>
  
          <button className={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>
  
        <div className={styles.footer}>
          <span className={styles.link} onClick={() => navigate("/login")}>
            Back to login
          </span>
        </div>
      </div>
    </div>
  );
  
};

export default ResetForm;