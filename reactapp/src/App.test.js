import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import Login from './components/Login';
import Signup from './components/Signup';
import { authAPI } from './apiConfig';
import userReducer from './userSlice';

// Mock dependencies
jest.mock('./apiConfig', () => ({
  authAPI: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getMe: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
  },
  taskAPI: {
    getTasks: jest.fn(),
    getTask: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    toggleComplete: jest.fn(),
    getStats: jest.fn(),
  }
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper function to render component with providers
const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

// ============================================
// LOGIN COMPONENT TESTS
// ============================================
describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Component renders correctly
  test('renders login form with all elements', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Task Manager Pro')).toBeInTheDocument();
    expect(screen.getByText('Sign in to manage your tasks')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  // Test 2: Email input field renders and accepts input
  test('email input accepts user input', async () => {
  const user = userEvent;
    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'test@example.com');
    
    expect(emailInput.value).toBe('test@example.com');
  });

  // Test 3: Password input field renders and accepts input
  test('password input accepts user input', async () => {
  const user = userEvent;
    renderWithProviders(<Login />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'password123');
    
    expect(passwordInput.value).toBe('password123');
  });

  // Test 4: Form submission with valid credentials
  test('submits form with correct email and password values', async () => {
  const user = userEvent;
    const mockResponse = {
      data: {
        success: true,
        user: { id: 1, email: 'test@example.com' },
      },
    };
    authAPI.login = jest.fn().mockResolvedValue(mockResponse);

    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(authAPI.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  // Test 5: Shows warning when submitting empty form
  test('shows warning message when fields are empty', async () => {
  const user = userEvent;
    const { toast } = require('react-toastify');
    
    renderWithProviders(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    expect(toast.warning).toHaveBeenCalledWith('Please fill in all fields');
  });

  // Test 6: Navigation links are present
  test('renders navigation links correctly', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  // Test 7: Successful login triggers navigation
  test('navigates to dashboard on successful login', async () => {
  const user = userEvent;
    const mockResponse = {
      data: {
        success: true,
        user: { id: 1, email: 'test@example.com' },
      },
    };
    authAPI.login = jest.fn().mockResolvedValue(mockResponse);

    renderWithProviders(<Login />);
    
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  // Test 8: Failed login shows error message
  test('displays error message on login failure', async () => {
  const user = userEvent;
    const { toast } = require('react-toastify');
    const mockError = {
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    };
    authAPI.login = jest.fn().mockRejectedValue(mockError);

    renderWithProviders(<Login />);
    
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });

});

// ============================================
// SIGNUP COMPONENT TESTS
// ============================================
describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Component renders correctly with all fields
  test('renders signup form with all input fields', () => {
    renderWithProviders(<Signup />);
    
    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByText('Start managing your tasks today')).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  // Test 2: Username input accepts user input
  test('username input accepts user input', async () => {
  const user = userEvent;
    renderWithProviders(<Signup />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    await user.type(usernameInput, 'johndoe');
    
    expect(usernameInput.value).toBe('johndoe');
  });

  // Test 3: Email input accepts user input
  test('email input accepts user input', async () => {
  const user = userEvent;
    renderWithProviders(<Signup />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'john@example.com');
    
    expect(emailInput.value).toBe('john@example.com');
  });
});