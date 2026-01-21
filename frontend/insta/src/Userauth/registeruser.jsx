import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

export default function RegisterUser() {
const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful. You can now log in.');
        setFormData({ username: '', email: '', password: '' });
        // Navigate to login after successful registration
        navigate(`/login`);
      } else {
        setError(data.message || 'Registration failed');
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
        <div className="bg-black text-white border border-gray-500 px-10 py-8 mb-3">
          <div className="flex justify-center mb-8">
            <h1 className="text-5xl font-semibold" style={{ fontFamily: 'cursive' }}>
              Postgram
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-500 rounded-sm bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-500 rounded-sm bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-300"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-500 rounded-sm bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-300"
              required
            />

            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            {success && <p className="text-green-400 text-xs text-center">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="#" className="text-xs text-blue-300 hover:underline">
              Forgotten password?
            </a>
          </div>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-4 text-gray-400 text-sm font-semibold">OR</div>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>

          <p className="text-sm text-center">
            Have an account?{' '}
            <Link to="/login" className="text-blue-300 hover:underline font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}