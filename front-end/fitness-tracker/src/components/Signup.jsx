import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  fullname: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Signup() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 6L28.24 14.48L37.52 15.64L30.76 22.16L32.48 31.36L24 27.12L15.52 31.36L17.24 22.16L10.48 15.64L19.76 14.48L24 6Z" fill="#22C55E"/>
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-500 text-center mt-1">Enter your information to create your account</p>
        </div>
        <Formik
          initialValues={{ fullname: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            // TODO: Integrate with API
            setSubmitting(false);
            navigate('/dashboard');
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                <Field
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="name"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="John Doe"
                />
                <ErrorMessage name="fullname" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="name@example.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-2 text-xs text-gray-400 font-medium">OR CONTINUE WITH</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center justify-center gap-2 w-1/2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <FaGoogle className="text-lg" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 w-1/2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <FaFacebookF className="text-lg text-blue-600" />
            Facebook
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
} 