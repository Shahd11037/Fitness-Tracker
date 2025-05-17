/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaRegEnvelope, FaLock, FaStar } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.css';
import { toast } from 'react-toastify';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_error, setError] = useState('');

  const handleSubmit = async (values) => {
    console.log('Submitting:', values); // Debug 1
    setIsSubmitting(true);
    setError(''); // Reset error message
    try {
      console.log('Calling API...'); // Debug 2
      // Call your backend API
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      console.log('Response status:', response.status); // Debug 3
      const data = await response.json();
      console.log('Response data:', data); // Debug 4

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      console.log('Login successful, navigating...'); // Debug 5
      
      // Show success toast
      toast.success('Login successful! Redirecting to dashboard...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#22c55e', color: 'white' }
      });
      
      // Wait a bit before redirecting to dashboard
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (err) {
      console.error('Login error:', err); // Debug 6
      setError(err.message);
      
      // Show error toast
      toast.error(err.message || 'Login failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      console.log('Final cleanup'); // Debug 7
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formInner}>
        <div className={styles.formHeading}>
          <div className={styles.iconContainer}>
            <FaStar className="text-white text-xl" />
          </div>
          <h2 className={styles.formTitle}>Welcome back</h2>
          <p className={styles.formSubtitle}>Enter your credentials to access your account</p>
        </div>
        

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting: formikSubmitting }) => (
            <Form className="space-y-4">
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email</label>
                <div className={styles.inputContainer}>
                  <div className={styles.inputIcon}>
                    <FaRegEnvelope />
                  </div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={styles.formInput}
                    placeholder="name@example.com"
                  />
                </div>
                <ErrorMessage name="email" component="div" className={styles.formError} />
              </div>
              
              <div className={styles.formGroup}>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className={styles.formLabel}>Password</label>
                  <Link to="#" className={styles.forgotPassword}>
                    Forgot password?
                  </Link>
                </div>
                <div className={styles.inputContainer}>
                  <div className={styles.inputIcon}>
                    <FaLock />
                  </div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={styles.formInput}
                  />
                </div>
                <ErrorMessage name="password" component="div" className={styles.formError} />
              </div>
              
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={isSubmitting || formikSubmitting}
              >
                {isSubmitting || formikSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.signupText}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
    
  );
  
}