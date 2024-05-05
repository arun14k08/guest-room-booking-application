import React from "react";

const LogoutModal = ({ setIsModalOpen, handleLogout }) => {
    return (
        <div className="flex flex-col gap-8 mx-4 my-2">
            <p className="text-center">Are you sure to logout?</p>
            <div className="flex gap-4 justify-center">
                <button
                    className="button"
                    onClick={() => {
                        handleLogout();
                        setIsModalOpen(false);
                    }}
                >
                    Logout
                </button>
                <button
                    className="bg-white ring-1 ring-slate-300 px-4 py-2 rounded-lg"
                    onClick={() => {
                        setIsModalOpen(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LogoutModal;
