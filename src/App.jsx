// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register'
import Home from './Home';
import About from './About';
import Navbar from './Navbar'
import EmailVerification from './EmailVerification'
import { AuthProvider } from './AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/about' element={<About />} />
                        <Route path="/verify/:token" element={<EmailVerification />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
