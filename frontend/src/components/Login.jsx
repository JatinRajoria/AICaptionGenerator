import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // withCredentials: true zaroori hai cookies ke liye
      const res = await axios.post('http://localhost:3000/api/auth/login', 
        { username, password }, 
        { withCredentials: true } 
      );
      alert(res.data.message);
      navigate('/create-post');
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg border border-gray-100">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Login Account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 active:scale-98 transition-all duration-200 cursor-pointer">
            Login
          </button>
        </form>
        <div className='text-center -mt-5'>Don't have an account ? <a href="/register" className="text-blue-600 hover:underline ">Register</a></div>
      </div>
    </div>
  );
}