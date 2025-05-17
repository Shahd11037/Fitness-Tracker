/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaRegEnvelope, FaLock, FaUser, FaStar } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from './Signup.module.css';

const SignupSchema = Yup.object().shape({
  fullname: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Signup() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_error, setError]= useState('');
  
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: values.fullname, // Match backend expectation
          email: values.email,
          password: values.password
        }),
      });

      const data = await response.json();
      console.log('Response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Show success toast instead of storing token and redirecting to dashboard
      toast.success('Account created successfully! Please sign in.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#22c55e', color: 'white' }
      });
      
      // Wait a bit before redirecting to login page
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      
    } catch (err) {
      setError(err.message);
      console.error('Signup error:', err); // Detailed error logging
      
      // Show error toast
      toast.error(err.message || 'Signup failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formHeading}>
          <div className={styles.iconWrapper}>
            <FaStar className={styles.formIcon} />
          </div>
          <h2 className={styles.formTitle}>Create an account</h2>
          <p className={styles.formSubtitle}>Enter your information to create your account</p>
        </div>
        
        {_error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {_error}
          </div>
        )}
        
        <Formik
          initialValues={{ fullname: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting: formikSubmitting }) => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="fullname" className={styles.formLabel}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <FaUser className={styles.inputIcon} />
                  <Field
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="name"
                    className={styles.formInput}
                    placeholder="John Doe"
                  />
                </div>
                <ErrorMessage name="fullname" component="div" className={styles.formError} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email</label>
                <div className={styles.inputWrapper}>
                  <FaRegEnvelope className={styles.inputIcon} />
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
                <label htmlFor="password" className={styles.formLabel}>Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className={styles.formInput}
                  />
                </div>
                <ErrorMessage name="password" component="div" className={styles.formError} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className={styles.formInput}
                  />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className={styles.formError} />
              </div>
              
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting || formikSubmitting}
              >
                {isSubmitting || formikSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className={styles.loadingSpinner} width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create account'}
              </button>

            </Form>
          )}
        </Formik>
        <p className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}