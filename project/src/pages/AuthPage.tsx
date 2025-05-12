import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Mail, 
  EyeOff, 
  Eye, 
  ArrowRight, 
  LogIn, 
  UserPlus 
} from 'lucide-react';

const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine initial mode based on URL
  const [isSignUp, setIsSignUp] = useState(
    location.pathname.includes('signup') || 
    location.pathname === '/auth'
  );
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Update sign up/sign in mode based on URL
  useEffect(() => {
    setIsSignUp(
      location.pathname.includes('signup') || 
      location.pathname === '/auth'
    );
  }, [location.pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign Up Logic
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      console.log('Sign Up:', formData);
      // Implement actual sign up logic here
      // On successful signup, redirect to home or dashboard
      navigate('/');
    } else {
      // Sign In Logic
      console.log('Sign In:', { 
        email: formData.email, 
        password: formData.password 
      });
      // Implement actual sign in logic here
      // On successful signin, redirect to home or dashboard
      navigate('/');
    }
  };

  const toggleAuthMode = () => {
    // Update URL and toggle mode
    const newPath = isSignUp ? '/auth/signin' : '/auth/signup';
    navigate(newPath);
    
    // Reset form data when switching modes
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div>
          <h1 className="text-center text-3xl font-bold text-neutral-900">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p className="mt-2 text-center text-neutral-600">
            {isSignUp 
              ? 'Sign up to start tracking your bus routes' 
              : 'Sign in to access your BusTrack account'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-8">
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="username" className="sr-only">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input pl-10"
                  placeholder="Username"
                />
              </div>
            </motion.div>
          )}
          
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-neutral-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input pl-10"
                placeholder="Email address"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-neutral-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="input pl-10 pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-neutral-400" />
                ) : (
                  <Eye className="w-5 h-5 text-neutral-400" />
                )}
              </button>
            </div>
          </div>
          
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input pl-10"
                  placeholder="Confirm Password"
                />
              </div>
            </motion.div>
          )}
          
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full group"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            {!isSignUp && (
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900">
                  Remember me
                </label>
              </div>
            )}
            
            {!isSignUp && (
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">
                  {isSignUp 
                    ? 'Already have an account?' 
                    : 'Don\'t have an account?'}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                onClick={toggleAuthMode}
                className="btn btn-outline w-full"
              >
                {isSignUp ? (
                  <>
                    <LogIn className="mr-2 w-5 h-5" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 w-5 h-5" />
                    Sign Up
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
        
        {/* Social Login Options */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="btn btn-secondary">
            Google
          </button>
          <button className="btn btn-secondary">
            Facebook
          </button>
          <button className="btn btn-secondary">
            Apple
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;