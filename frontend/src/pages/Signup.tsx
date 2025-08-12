import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Navbar';
import Footer from '../components/Footer';

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to your backend
      console.log('Email submitted:', email);
      
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'var(--color-bg)'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            padding: '3rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'var(--color-text)'
            }}>
              Thank You!
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              color: 'var(--color-text-secondary)',
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}>
              You've been added to our early access list. We'll notify you as soon as Kairos Zero is available.
            </p>
            <Link to="/" className="btn primary" style={{ fontSize: '1.1rem' }}>
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        padding: '2rem',
        background: 'var(--color-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-text)',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Get Early Access
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-secondary)',
              fontFamily: 'Arial, Helvetica, sans-serif',
              marginBottom: '1rem'
            }}>
              Be among the first to experience Kairos Zero
            </p>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)',
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}>
              Join our exclusive early access list and get notified when we launch.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                style={{ fontSize: '1.1rem', padding: '1rem' }}
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
              style={{
                width: '100%',
                fontSize: '1.2rem',
                fontWeight: '500',
                padding: '1rem'
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="spinner" style={{ marginRight: '0.5rem' }}></div>
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
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              fontFamily: 'Arial, Helvetica, sans-serif',
              lineHeight: '1.5'
            }}>
              No spam, ever. We will only contact you about <br/> 
              Peakflow Technologies updates and early access opportunities.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;