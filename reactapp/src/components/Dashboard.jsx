import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { taskAPI } from '../apiConfig';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const { data: response, isLoading } = useQuery({
    queryKey: ['allTasks'],
    queryFn: async () => {
      return await taskAPI.getTasks({ limit: 1000 });
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const tasks = response?.data?.tasks || [];
  const stats = {
    totalTasks: tasks.length,
    pendingTasks: tasks.filter(task => !task.completed).length,
    completedTasks: tasks.filter(task => task.completed).length
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 mb-8 text-white transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-2 animate-fadeIn">Welcome back, {user?.username}! 👋</h1>
        <p className="text-blue-100 animate-slideUp">Here's an overview of your task management dashboard</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => navigate('/new-task')}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Create New Task</h3>
              <p className="text-gray-600">Add a new task to your list</p>
            </div>
            <div className="text-blue-600 transition-transform duration-300 transform hover:rotate-90">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/tasks')}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">View All Tasks</h3>
              <p className="text-gray-600">Manage your existing tasks</p>
            </div>
            <div className="text-blue-600 transition-transform duration-300 hover:scale-110">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 transform transition-all duration-500 hover:scale-105 ${animateStats ? 'animate-slideRight' : ''}`}>
          <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.totalTasks}</p>
          <div className="mt-2 text-blue-600">
            <span className="text-sm">View all tasks</span>
          </div>
        </div>
        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600 transform transition-all duration-500 hover:scale-105 ${animateStats ? 'animate-slideUp delay-100' : ''}`}>
          <h3 className="text-sm font-medium text-gray-500">Completed Tasks</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.completedTasks}</p>
          <div className="mt-2 text-green-600">
            <span className="text-sm">Well done!</span>
          </div>
        </div>
        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600 transform transition-all duration-500 hover:scale-105 ${animateStats ? 'animate-slideLeft delay-200' : ''}`}>
          <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.pendingTasks}</p>
          <div className="mt-2 text-yellow-600">
            <span className="text-sm">Needs attention</span>
          </div>
        </div>
      </div>

      {/* Contact Us Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
          <p className="text-blue-100">We're here to assist you with your task management journey</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 group">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email Support</h3>
                <p className="text-gray-600">support@taskmanager.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 group">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone Support</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Dashboard;