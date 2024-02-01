import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        navigate('/login');
        window.location.reload(true);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800">
            <button onClick={toggleDrawer} className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 md:hidden">
                ☰
            </button>
            <Link to="/" className="flex items-center">
                <span className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Εργασία Ανάπτυξη Ασφαλών Συστημάτων
                </span>
            </Link>

            {isDrawerOpen && (
                <div className="absolute top-0 left-0 w-3/4 bg-white dark:bg-gray-800 h-full shadow-md z-50">
                    <button onClick={toggleDrawer} className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 p-4">
                        ×
                    </button>
                    <nav className="flex flex-col p-4">
                        <Link onClick={toggleDrawer} className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 p-2" to="/about">
                            Πληροφορίες
                        </Link>
                        {isLoggedIn ? (
                            <button onClick={() => { handleLogout(); toggleDrawer(); }} className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 p-2">
                                Αποσύνδεση
                            </button>
                        ) : (
                            <>
                                <Link onClick={toggleDrawer} to="/login" className="p-2 rounded-lg" style={{ backgroundColor: 'lightblue' }}>
                                    Σύνδεση
                                </Link>
                                <Link onClick={toggleDrawer} to="/register" className="p-2 mt-4 rounded-lg" style={{ backgroundColor: 'orange' }}>
                                    Εγγραφή
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}

            <nav className="hidden md:flex items-center space-x-4">
                <Link className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100" to="/about">
                    Πληροφορίες
                </Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="bg-white border border-gray-500 px-4 py-2 rounded hover:bg-gray-100 focus:outline-none">
                        Αποσύνδεση
                    </button>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="bg-white border border-gray-500 px-4 py-2 rounded hover:bg-gray-100 focus:outline-none">
                                Σύνδεση
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="bg-blue-500 text-white border border-gray-500 px-4 py-2 rounded hover:bg-blue-900 focus:outline-none">
                                Εγγραφή
                            </button>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Navbar;
