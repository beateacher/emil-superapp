'use client';

import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TaskList</h1>
          <p className="text-gray-600">Get more productive!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TaskForm onTaskAdded={handleTaskAdded} />
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Tasks</h2>
            
            {loading ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">Loading tasks...</p>
              </div>
            ) : (
              <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}