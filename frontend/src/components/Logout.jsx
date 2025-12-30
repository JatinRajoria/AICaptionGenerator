import React from 'react'
import { useState } from 'react';
import axios from 'axios';
const Logout = () => {

    const [showPopup, setShowPopup] = useState(false);
    const LogoutHandler = async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
            window.location.href = '/login'; // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <div>
            <button onClick={() => setShowPopup(true)} className="absolute right-10 top-10 py-2 px-6 text-gray-500 italic bg-gray-200 border rounded active:scale-98 hover:bg-gray-300 transition-all duration-200 cursor-pointer">
                Logout
            </button>
            {/* Logout Confirmation Popup (Modal) */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
                        <h3 className="text-xl font-bold mb-4">Logout?</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer active:scale-98 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={LogoutHandler}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 active:scale-98 transition-all duration-200 cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Logout