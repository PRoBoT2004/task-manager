import React, { useState } from 'react';

const Task = ({ task, onEdit, onComplete, onDelete }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <div className={`task p-4 rounded shadow ${task.completed ? 'line-through' : ''} ${isEditing ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border rounded p-2 mb-2 w-full bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            value={editedTask.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border rounded p-2 mb-2 w-full bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            value={editedTask.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            placeholder="Due Date"
            className="border rounded p-2 mb-2 w-full bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            value={editedTask.dueDate}
            onChange={handleChange}
          />
          <select
            name="priority"
            className="border rounded p-2 mb-2 w-full bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            value={editedTask.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2">Save</button>
          <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      ) : (
        <div>
          <h2 className={`text-xl font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h2>
          <p className="mb-2">{task.description}</p>
          <p className="mb-2"><strong>Due:</strong> {task.dueDate}</p>
          <p className="mb-4"><strong>Priority:</strong> {task.priority}</p>
          <button onClick={handleEdit} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2">Edit</button>
          <button onClick={handleComplete} className={`px-4 py-2 rounded mr-2 ${task.completed ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => onDelete(task.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
