import React, { useState } from 'react';
import TaskList from './TaskList';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low' });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const root = window.document.documentElement;
    root.classList.toggle('dark', !isDarkMode);
  };

  const handleAddTask = () => {
    if (newTask.title.trim() !== '') {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'Low' });
    }
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleEdit = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button
          onClick={handleToggleDarkMode}
          className="text-lg font-semibold focus:outline-none"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter task title"
            className={`border rounded p-2 mr-2 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            name="title"
            value={newTask.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter task description"
            className={`border rounded p-2 mr-2 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            name="description"
            value={newTask.description}
            onChange={handleChange}
          />
          <input
            type="date"
            className={`border rounded p-2 mr-2 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleChange}
          />
          <select
            className={`border rounded p-2 mr-2 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default TaskManager;
