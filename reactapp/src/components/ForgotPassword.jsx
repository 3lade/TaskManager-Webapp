import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../apiConfig';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: reset
  const [email, setEmail] = useState('');
  const [resetData, setResetData] = useState({
    token: '',
    newPassword: '',
    confirmPassword: ''
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => authAPI.forgotPassword(data),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Reset token sent! Check your email.');
        // For development, show token in toast
        if (response.data.resetToken) {
          toast.info(`Dev Token: ${response.data.resetToken}`, { autoClose: 10000 });
        }
        setStep(2);
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to process request';
      toast.error(message);
    }
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data) => authAPI.resetPassword(data),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Password reset successful! You can now login.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to reset password';
      toast.error(message);
    }
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.warning('Please enter your email');
      return;
    }

    forgotPasswordMutation.mutate({ email });
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    
    if (!resetData.token || !resetData.newPassword || !resetData.confirmPassword) {
      toast.warning('Please fill in all fields');
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (resetData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    resetPasswordMutation.mutate({
      token: resetData.token,
      newPassword: resetData.newPassword
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg fade-in">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {step === 1 ? 'Forgot Password' : 'Reset Password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1 
              ? 'Enter your email to receive a reset token' 
              : 'Enter the token and your new password'}
          </p>
        </div>

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full btn-primary flex justify-center items-center"
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Reset Token'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleResetSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                  Reset Token
                </label>
                <input
                  id="token"
                  name="token"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Enter the token from your email"
                  value={resetData.token}
                  onChange={(e) => setResetData({...resetData, token: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="input-field"
                  placeholder="••••••••"
                  value={resetData.newPassword}
                  onChange={(e) => setResetData({...resetData, newPassword: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input-field"
                  placeholder="••••••••"
                  value={resetData.confirmPassword}
                  onChange={(e) => setResetData({...resetData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="w-full btn-primary flex justify-center items-center"
              >
                {resetPasswordMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                ← Back to email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;