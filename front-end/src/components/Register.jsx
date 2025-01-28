import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Building } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Left side - Animation */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-900 to-navy-900 p-12">
          <div className="h-full flex items-center justify-center">
            <img
              src="https://cdn.dribbble.com/users/1314475/screenshots/3633228/media/1b8b7556f19af92b1653e4e175b3aa2f.gif"
              alt="Signup Animation"
              className="max-w-full h-auto rounded-2xl shadow-lg animate-float"
            />
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full md:w-1/2 bg-white p-8 lg:p-12">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-gray-500 mt-2">Join us today and get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all hover:border-orange-200"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all hover:border-orange-200"
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all hover:border-orange-200"
                    placeholder="Company (Optional)"
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all hover:border-orange-200"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all hover:border-orange-200"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 accent-orange-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-blue-900 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <div className="flex items-center justify-center space-x-2">
                  <UserPlus size={20} />
                  <span>Create Account</span>
                </div>
              </button>
            </form>

            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;