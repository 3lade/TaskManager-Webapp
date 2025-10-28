import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { taskAPI } from '../apiConfig';
import TaskForm from './TaskForm';

const EditTaskPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => taskAPI.getTask(id).then(res => res.data.task),
    enabled: !!id
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-50 text-red-700 rounded">Failed to load task.</div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <TaskForm task={data} />
    </div>
  );
};

export default EditTaskPage;
