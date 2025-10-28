import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../apiConfig';
import { clearUser, selectUser } from '../userSlice';
import { toast } from 'react-toastify';
import { useTheme } from '../theme/ThemeProvider';

const Navbar = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { theme, toggleTheme } = useTheme();

    const logoutMutation = useMutation({
        mutationFn: () => authAPI.logout(),
        onSuccess: () => {
            dispatch(clearUser());
            toast.success('Logged out successfully');
            navigate('/login');
        },
        onError: (error) => {
            toast.error('Logout failed');
        }
    });

    const handleLogout = () => {
        setShowLogoutModal(false);
        logoutMutation.mutate();
    };

    return (
        <>
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-blue-600">Task Manager Pro</h1>
                            </div>
                            <div className="ml-10 flex space-x-4">
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/tasks"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                                >
                                    Task List
                                </Link>
                                <Link
                                    to="/new-task"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                                >
                                    New Task
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {theme === 'dark' ? (
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM15.362 4.638a.75.75 0 011.06 1.06l-1.06-1.06zM18 10a.75.75 0 01-.75.75H16a.75.75 0 010-1.5h1.25A.75.75 0 0118 10zM15.362 15.362l1.06 1.06a.75.75 0 11-1.06-1.06zM10 16a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zM4.638 15.362a.75.75 0 11-1.06 1.06l1.06-1.06zM3 10a.75.75 0 01.75-.75H5a.75.75 0 010 1.5H3.75A.75.75 0 013 10zM4.638 4.638L3.578 3.578a.75.75 0 111.06 1.06z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 116.707 2.707 7 7 0 0017.293 13.293z" />
                                    </svg>
                                )}
                            </button>

                            <div className="text-sm text-gray-700">
                                Welcome, <span className="font-semibold text-blue-600">{user?.username}</span>
                            </div>
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Logout</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Are you sure you want to logout? You'll need to sign in again to access your tasks.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    disabled={logoutMutation.isPending}
                                    className="btn-danger"
                                >
                                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;