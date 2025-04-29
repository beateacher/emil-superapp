'use client';

import { format } from 'date-fns';

export default function TaskItem({ task, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onDelete(task.id);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const formattedDate = format(new Date(task.dueDate), 'MMMM dd, yyyy');
  const isPastDue = new Date(task.dueDate) < new Date();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <p className={`text-sm ${isPastDue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
            Due: {formattedDate} {isPastDue && '(Past due)'}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {task.description && (
        <div className="mt-3 text-gray-700">
          <p>{task.description}</p>
        </div>
      )}
    </div>
  );
}