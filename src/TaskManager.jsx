import { useState, useEffect } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (text.trim() === '') return;
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const doneCount = tasks.filter(t => t.completed).length;

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
        <p className="task-summary">{doneCount} of {tasks.length} completed</p>
      )}

      <ul className="task-manager-list">
        {tasks.length === 0 ? (
          <li className="no-tasks">No tasks yet , add one above</li>
        ) : (
          tasks.map(task => (
            <li key={task.id} className="task-manager-item">
              <span
                className={task.completed ? 'task-check checked' : 'task-check'}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? '✓' : ''}
              </span>
              <span className={task.completed ? 'task-text done' : 'task-text'}>
                {task.text}
              </span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskManager;