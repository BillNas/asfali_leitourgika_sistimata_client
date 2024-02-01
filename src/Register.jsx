import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);
    const [registrationError, setRegistrationError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    useEffect(() => {

        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password || !email || !repeatPassword) {
            setRegistrationError('Παρακαλώ συμπληρώστε όλα τα πεδία');
            return;
        }

        if (password !== repeatPassword) {
            setRegistrationError('Οι κωδικοί δεν ταιριάζουν');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post(
                'https://ergasia-api.onrender.com/auth/register',
                { email, username, password },
            );
            if (response.status === 201) {
                setEmailVerificationSent(true);
                setRegistrationError(null);
                setUsername('');
                setEmail('');
                setPassword('');
                setRepeatPassword('');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Αποτυχία δημιουργίας νέου χρήστη';
            console.log(errorMessage);
            setRegistrationError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="dark h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden mx-3">
                <div className="px-4 py-2">
                    <h1 className="text-gray-900 text-3xl font-bold">Εγγραφή νέου χρήστη</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Δημιουργήστε έναν λογαριασμό
                    </p>
                </div>
                <form className="px-4 py-2" onSubmit={handleRegister}>
                    <>
                        <div className="mt-4 flex flex-col">
                            <label className="text-gray-700 font-bold" htmlFor="email">Email</label>
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
                            <label className="text-gray-700 font-bold" htmlFor="username">Όνομα χρήστη</label>
                            <input
                                className="mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Όνομα χρήστη"
                            />
                        </div>
                        <div className="mt-4 flex flex-col">
                            <label className="text-gray-700 font-bold" htmlFor="password">Κωδικός πρόσβασης</label>
                            <input
                                className="mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Κωδικός"
                            />
                        </div>
                        <div className="mt-4 flex flex-col">
                            <label className="text-gray-700 font-bold" htmlFor="repeatPassword">Επανάληψη κωδικού πρόσβασης</label>
                            <input
                                className="mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none"
                                id="repeatPassword"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                type="password"
                                placeholder="Επανάληψη κωδικού"
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                className="w-full py-2 px-4 text-center bg-[#918ede] rounded-lg text-white text-sm hover:bg-[#7975da] focus:outline-none"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Δημιουργία...' : 'Δημιουργία λογαριασμού'}
                            </button>
                        </div>
                    </>
                </form>
                {emailVerificationSent && (
                    <p className="text-sm text-green-500 font-semibold px-4 py-2 mt-2 text-center">Ο λογαριασμός δημιουργήθηκε. Σας έχουν σταλεί στον email οδηγίες για επιβεβαίωση  <b></b></p>
                )}
                {registrationError && (
                    <p className="text-sm text-red-500 px-4 py-2 mt-2 text-center">{registrationError}</p>
                )}
            </div>
        </div >
    );
}

export default Register;
