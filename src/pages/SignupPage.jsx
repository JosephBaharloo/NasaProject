import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudHail } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup logic here
    navigate('/dashboard');
  };

  return (
    <div className="text-white h-screen w-screen p-4 flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 flex flex-col items-center">
        <CloudHail className="w-24 h-24 mb-4" />
        <h1 className="text-5xl font-bold mb-2">Create Your Account</h1>
        <p className="text-lg max-w-md mb-8 text-gray-300">
            Join Aura Weather and get personalized forecasts.
        </p>
        <div className="glass-panel p-8 rounded-2xl w-full max-w-md">
          <form onSubmit={handleSignup}>
            <div className="mb-4 text-left">
              <label className="block text-gray-300 mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:border-white/50 transition-colors"
                type="text"
                id="username"
                placeholder="yourusername"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:border-white/50 transition-colors"
                type="email"
                id="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:border-white/50 transition-colors"
                type="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full glass-panel-light px-8 py-3 rounded-full font-bold text-lg hover:bg-white/20 transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-white/80 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
