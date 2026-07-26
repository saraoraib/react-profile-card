import { memo } from 'react';

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-manager-item">
      <span
        className={task.completed ? 'task-check checked' : 'task-check'}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? '✓' : ''}
      </span>
      <span className={task.completed ? 'task-text done' : 'task-text'}>
        {task.text}
      </span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
});

export default TaskItem;