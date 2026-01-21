import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginUser() {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
   

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log('Login successful:', data);
        // Navigate to home after successful login
        navigate('/feed');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-sm w-full">
        <div className="bg-black text-white border border-gray-300 px-10 py-8 mb-3">
          {/* Instagram Logo */}
          <div className="flex justify-center mb-8">
            <h1 className="text-5xl font-semibold" style={{ fontFamily: 'cursive' }}>
              Postgram
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              name="email"
              placeholder="username or email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-2 border border-gray-300 rounded-sm  text-xs focus:outline-none focus:border-gray-400"
              required
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-2 py-2 border border-gray-300 rounded-sm  text-xs focus:outline-none focus:border-gray-400"
              required
            />

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold py-1.5 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mt-3"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a href="#" className="text-xs text-blue-300 hover:underline">
              Forgotten password?
            </a>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-gray-500 text-sm font-semibold">OR</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Facebook Login */}
           <p className="text-sm text-center" >
            Don't have an account? {' '}
            <a  href="/register" className="text-blue-300 hover:underline font-semibold">
              Sign up
            </a>
          </p>
         
        </div>

        {/* Sign Up Link */}
       
      </div>
    </div>
  );
}
