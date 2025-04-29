'use client';

import TaskItem from './TaskItem';

export default function TaskList({ tasks, onTaskDeleted }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No tasks yet. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onTaskDeleted} />
      ))}
    </div>
  );
}