import React, { useContext, useState } from 'react';
import { LogIn, Mail, Lock } from 'lucide-react';
import Loginuser from '../services/Login/Loginpost';
import { AuthContext } from './Context';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const {login}=useContext(AuthContext);
  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('email',Email);
    console.log('password',Password);
    const obj={Email, Password};
    try{
      const res=await Loginuser(obj);
      login(res);
      console.log('res',res);
      navigate('/admin')
    }catch(error)
    {
      console.log('error',error);
    }

    // Handle login logic here
  };

  return (
    <div className="min-h-screen mt-[100px] bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex  rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 bg-white p-8 lg:p-12">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-500 mt-2">Please sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border bg-white border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all hover:border-orange-200"
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border bg-white border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all hover:border-orange-200"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-orange-500" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
               
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-blue-900 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <div className="flex items-center justify-center space-x-2">
                  <LogIn size={20} />
                  <span>Sign In</span>
                </div>
              </button>
            </form>

          
          
          </div>
        </div>

        {/* Right side - Animation */}
        <div className="hidden md:flex md:w-1/2 bg-white  p-12 justify-center items-center">
          <img className='max-w-[350px]' src="/assets/images/login.jpg" alt="" />
        </div>

      </div>
    </div>
  );
}

export default Login;