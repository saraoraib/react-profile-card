import { useState, useEffect } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'notifications', label: 'Notifications' },
  ];

  const urls = {
    profile: 'https://jsonplaceholder.typicode.com/users/1',
    tasks: 'https://jsonplaceholder.typicode.com/todos?userId=1&_limit=5',
    notifications: 'https://jsonplaceholder.typicode.com/posts?userId=1&_limit=4',
  };

  useEffect(() => {
    async function loadData() {
      if (data[activeTab]) return; 

      setLoading(true);
      const res = await fetch(urls[activeTab]);
      const result = await res.json();
      setData({ ...data, [activeTab]: result });
      setLoading(false);
    }
    loadData();
  }, [activeTab]);

  function toggleTask(id) {
    const updatedTasks = data.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setData({ ...data, tasks: updatedTasks });
  }

  function renderContent() {
    const result = data[activeTab];
    if (!result) return null;

    if (activeTab === 'profile') {
      return (
        <div className="profile-tab">
          <p className="tab-title">{result.name}</p>
          <p className="tab-sub">@{result.username}</p>
          <p className="tab-sub">{result.email}</p>
          <p className="tab-sub">{result.company.name}</p>
          <p className="tab-sub">{result.address.city}</p>
        </div>
      );
    }

    if (activeTab === 'tasks') {
      const doneCount = result.filter(t => t.completed).length;
      return (
        <div>
          <p className="tasks-summary">{doneCount} of {result.length} completed</p>
          <ul className="task-list">
            {result.map(task => (
              <li key={task.id} className="task-item" onClick={() => toggleTask(task.id)}>
                <span className={`task-check ${task.completed ? 'checked' : ''}`}>
                  {task.completed ? 'Y' : ''}
                </span>
                <span className={`task-text ${task.completed ? 'done' : ''}`}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (activeTab === 'notifications') {
      return (
        <ul className="notification-list">
          {result.map((post, index) => (
            <li key={post.id} className="notification-item">
              <span className="notification-dot"></span>
              <div>
                <p className="notification-title">{post.title}</p>
                <p className="notification-time">{index + 1}h ago</p>
              </div>
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {loading ? <div className="spinner"></div> : renderContent()}
      </div>
    </div>
  );
}

export default Tabs;