import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
          setIsLoggedIn(true);
          navigate('/dashboard');
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    } else {
      setError(true);
    }
  };

  const emailValidate = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setEmailError('Email should be of standard format');
    } else {
      setEmailError('');
    }
  };

  const passwordValidate = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+-=|]).{8,}/.test(value)) {
      setPasswordError('Password must contain a lowercase character, an uppercase character, a number and be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  if (isLoggedIn) {
    return <Page2 />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Email
            <input
              type="email"
              placeholder="Enter your email"
              onChange={emailValidate}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          {emailError && <span className="text-red-600 text-sm">{emailError}</span>}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Password
            <input
              type="password"
              placeholder="Enter your password"
              onChange={passwordValidate}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          {passwordError && <span className="text-red-600 text-sm">{passwordError}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>

        {error && <p className="text-red-600 text-center mt-4">Wrong email or password</p>}

        <p className="mt-4 text-center text-sm">
          New User?{' '}
          <a href="/signup" target="_blank" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
