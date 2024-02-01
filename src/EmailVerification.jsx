import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function EmailVerification() {
    const [status, setStatus] = useState('');
    const params = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`https://ergasia-api.onrender.com/auth/verifyEmail?token=${params.token}`);
                if (response.status === 200) {
                    setStatus(response.data.message);
                } else {
                    setStatus('Αποτυχία στην επιβεβαίωση του email. Παρακαλώ προσπαθήστε ξανά αργότερα');
                }
            } catch (error) {
                console.log(error);
                if (error.response) {
                    setStatus('Αποτυχία στην επιβεβαίωση του email. Παρακαλώ προσπαθήστε ξανά αργότερα');
                } else {
                    setStatus('Σφάλμα δικτύου');
                }
            }
        };

        if (params.token) {
            verifyEmail();
        }
    }, [params.token]);


    return (
        <div className="flex h-screen bg-gray-100 justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <p className={`text-lg font-semibold ${status.startsWith('Αποτυχία') ? 'text-red-500' : 'text-green-500'} my-4`}>{status}</p>
                <Link to="/login" className="text-blue-500 hover:text-blue-700">Επιστροφή</Link>
            </div>
        </div>
    );
}

export default EmailVerification;