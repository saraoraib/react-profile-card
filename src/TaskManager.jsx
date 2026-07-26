import { useState, useEffect, useCallback, useMemo } from 'react';
import TaskItem from './TaskItem';

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (text.trim() === '') return;
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
  };

  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const filteredTasks = useMemo(() => {
    console.log('Filtering tasks...');
    return tasks.filter(task =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const doneCount = useMemo(() => {
    console.log('Counting completed tasks...');
    return tasks.filter(t => t.completed).length;
  }, [tasks]);

  return (
    <div className="task-manager">
      <div className="task-input-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length > 0 && (
        <>
          <input
            className="task-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
          />
          <p className="task-summary">{doneCount} of {tasks.length} completed</p>
        </>
      )}

      <ul className="task-manager-list">
        {filteredTasks.length === 0 ? (
          <li className="no-tasks">
            {tasks.length === 0 ? 'No tasks yet , add one above' : 'No tasks match your search'}
          </li>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskManager;