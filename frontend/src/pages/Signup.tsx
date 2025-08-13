import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../services/api';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const validateEmail = () => {
    const newErrors: {[key: string]: string} = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Make real API call to backend
      await api.signup({ email });
      
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="auth-container">
            <div className="card">
              <h2>Thank You!</h2>
              <p>
                You've been added to our early access list. We'll notify you as soon as Kairos Zero is available.
              </p>
              <Link to="/" className="btn primary">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="auth-container">
          <div className="card">
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h1>Get Early Access</h1>
              <p>
                Be among the first to experience Kairos Zero
              </p>
              <p style={{ fontSize: '0.95rem' }}>
                Join our exclusive early access list and get notified when we launch.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              {errors.submit && (
                <div className="error-message" style={{ marginBottom: '1.5rem' }}>
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn primary"
                style={{ width: '100%' }}
              >
                {isLoading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="spinner"></div>
                    Joining...
                  </span>
                ) : (
                  'Join Early Access'
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div style={{
              textAlign: 'center',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border)'
            }}>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                No spam, ever. We will only contact you about <br/> 
                Peakflow Technologies updates and early access opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;