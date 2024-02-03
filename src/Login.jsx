import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loginError, setLoginError] = useState(null);
  const [correctCredentials, setCorrectCredentials] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // New state to manage login button status
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post(
        'https://ergasia-api.onrender.com/auth/login',
        { email, password },
        { withCredentials: true },
      );
      if (response.status === 200) {
        setCorrectCredentials(true);
        setOtpSent(true);
        setLoginError(null);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Λάθος στοιχεία σύνδεσης';
      setLoginError(errorMessage);
      setOtpSent(false);
      setCorrectCredentials(false);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const { data } = await axios.post('https://ergasia-api.onrender.com/auth/verify', { email, otp: otp.join('') });
      if (data.token) {
        login(data.token);
        navigate('/');
        window.location.reload(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Σφάλμα!';
      setLoginError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={`dark h-screen flex items-center justify-center bg-gray-900 ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden mx-4">
        <div className="px-4 py-2">
          <h1 className="text-gray-900 text-3xl font-bold">Σύνδεση χρήστη</h1>
          <p className="mt-1 text-sm text-gray-600">
            Συνδεθέιτε με τα στοιχεία σας
          </p>
        </div>
        <form
          className="px-4 py-2"
          onSubmit={correctCredentials ? handleOTP : handleLogin}
        >
          {!correctCredentials && (
            <>
              <div className="mt-4 flex flex-col">
                <label className="text-gray-700 font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  className="mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  disabled={isLoggingIn}
                />
              </div>
              <div className="mt-4 flex flex-col">
                <label className="text-gray-700 font-bold" htmlFor="password">
                  Κωδικός πρόσβασης
                </label>
                <input
                  className="mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Κωδικός"
                  disabled={isLoggingIn}
                />
              </div>
              <div className="mt-6">
                <button
                  className="w-full py-2 px-4 text-center bg-[#918ede] rounded-lg text-white text-sm hover:bg-[#7975da] focus:outline-none"
                  type="submit"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Σύνδεση...' : 'Σύνδεση'}
                </button>
              </div>
            </>
          )}
          {correctCredentials && (
            <>
              <div className="mt-4 flex flex-col">
                <label className="text-gray-700 font-bold" htmlFor="otp">
                  Κωδικός μιας χρήσης (OTP)
                </label>
                <div className="flex space-x-2 mt-1">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      name={`otp${index}`}
                      className="w-12 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-center"
                      maxLength="1"
                      value={otp[index]}
                      onChange={(e) => setOtpValue(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      type="text"
                      disabled={isVerifying}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full py-2 px-4 text-center bg-[#2c5af2] rounded-lg text-white text-sm focus:outline-none"
                  type="submit"
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Επαλήθευση...' : 'Επαλήθευση'}
                </button>
              </div>
            </>
          )}
        </form>
        {!correctCredentials && (
          <div className="px-4 py-2 mt-4 text-center">
            <p className="text-sm font-bold text-gray-600">
              Δεν έχετε λογαριασμό;{' '}
              <br />
              <button
                onClick={() => navigate('/register')}
                className="text-white bg-[#918ede] py-2 px-4 rounded-full font-bold"
              >
                Δημιουργήστε έναν τώρα
              </button>
            </p>
          </div>
        )}
        <div className="px-4 py-2">
          {otpSent && (
            <p className="text-sm text-green-500">
              Ο κρυπτογραφημένος κωδικός μιας χρήσης έχει σταλεί στο email <b>{email}</b>
            </p>
          )}
          {loginError && <p className="text-sm text-red-500">{loginError}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
