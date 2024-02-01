import React from 'react';

const About = () => {
    return (
        <div className="flex justify-center items-center h-full bg-gray-200 p-4 md:p-10 lg:p-20">
            <div className="p-6 md:p-8 lg:p-10 rounded-lg shadow-xl w-full md:w-3/4 lg:w-1/2 bg-white">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-center text-indigo-800">
                    Αυτή είναι μια εργασία που εκπονήθηκε από τον φοιτητή του Πανεπιστημίου Θεσσαλίας, Βασίλειο Νασόπουλο, στα πλαίσια του μαθήματος <br /> "Ασφαλή Λειτουργικά Συστήματα".
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-center text-gray-800">
                    Οι τεχνολογίες που χρησιμοποιήθηκαν:
                </h2>
                <ul className="list-disc ml-6 text-base md:text-lg lg:text-xl text-gray-700">
                    <li>React</li>
                    <li>Express</li>
                    <li>Node.js</li>
                    <li>Tailwind CSS</li>
                    <li>MongoDB</li>
                </ul>
                <p className="mt-6 text-center text-base md:text-lg lg:text-xl font-medium text-gray-700">
                    Επικοινωνήστε μαζί μου στο email:
                    <a href="mailto:vnasopoulos@uth.gr" className="font-bold text-indigo-800 hover:text-indigo-600 transition-colors"> vnasopoulos@uth.gr</a>
                </p>
            </div>
        </div>
    );
}

export default About;
