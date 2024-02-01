import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth
import { Link } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loginError, setLoginError] = useState(null);
  const [correctCredentials, setCorrectCredentials] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Handle setting body overflow based on mobile menu state
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const setOtpValue = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.toUpperCase();
    setOtp(updatedOtp);

    if (value && index < 5) {
      const nextSibling = document.querySelector(
        `input[name='otp${index + 1}']`,
      );
      if (nextSibling) {
        nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);

      const prevSibling = document.querySelector(
        `input[name='otp${index - 1}']`,
      );
      if (prevSibling) {
        prevSibling.focus();
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
      const errorMessage =
        error.response?.data?.message || 'Λάθος στοιχεία σύνδεσης';
      setLoginError(errorMessage);
      setOtpSent(false);
      setCorrectCredentials(false);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const { data } = await axios.post('https://ergasia-api.onrender.com/auth/verify', { email, otp: otp.join('') });
      if (data.token) {
        console.log(data.token);
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
                />
              </div>
              <div className="mt-6">
                <button
                  className="w-full py-2 px-4 text-center bg-[#918ede] rounded-lg text-white text-sm hover:bg-[#7975da] focus:outline-none"
                  type="submit"
                >
                  Σύνδεση
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
                    />
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full py-2 px-4 text-center bg-[#r2c5af2] rounded-lg text-white text-sm bg-[#2c5af2] focus:outline-none"
                  type="submit"
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <>
                      Επαλήθευση{' '}
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>{' '}
                    </>
                  ) : (
                    'Επαλήθευση'
                  )}
                </button>
              </div>
            </>
          )}
        </form>
        <>
          {!correctCredentials && (
            <div className="px-4 py-2 mt-4 text-center">
              <p className="text-sm  font-bold text-gray-600">
                Δεν έχετε λογαριασμό;{' '}
                <br />
                <button
                  onClick={() => navigate('/register')}
                  className="text-white bg-[#918ede] py-2 px-4 rounded-full font-bold bg-[#726edb]"
                >
                  Δημιουργήστε έναν τώρα
                </button>
              </p>
            </div>
          )}
        </>

        <div className="px-4 py-2">
          {otpSent && (
            <p className="text-sm text-green-500">
              Ο <u>κρυπτογραφημένος</u> κωδικός μιας χρήσης έχει σταλεί στο email <b>{email}</b>
            </p>
          )}
          {loginError && <p className="text-sm text-red-500">{loginError}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
