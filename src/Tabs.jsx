import { useState, useEffect } from 'react';
import { getTabs } from './tabs';

function Tabs() {
  const [role, setRole] = useState('user');

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [loadingTabs, setLoadingTabs] = useState(true);

  const [loadingContent, setLoadingContent] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function loadTabs() {
      setLoadingTabs(true);

      const result = await getTabs(role);

      setTabs(result);
      setActiveTab(result[0].id);

      setLoadingTabs(false);
    }

    loadTabs();
  }, [role]);

  const currentTab = tabs.find(tab => tab.id === activeTab);

  useEffect(() => {
    if (!currentTab) return;

    async function loadData() {
      if (data[activeTab]) return;

      setLoadingContent(true);

      const res = await fetch(currentTab.url);
      const result = await res.json();

      setData(prev => ({
        ...prev,
        [activeTab]: result,
      }));

      setLoadingContent(false);
    }

    loadData();
  }, [activeTab, currentTab]);

  function toggleTask(id) {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      ),
    }));
  }

  function renderContent() {
    const result = data[activeTab];

    if (!result) return null;

    switch (activeTab) {
      case 'profile':
        return (
          <div className="profile-tab">
            <p className="tab-title">{result.name}</p>
            <p className="tab-sub">@{result.username}</p>
            <p className="tab-sub">{result.email}</p>
            <p className="tab-sub">{result.company.name}</p>
            <p className="tab-sub">{result.address.city}</p>
          </div>
        );

      case 'tasks':
        const doneCount = result.filter(task => task.completed).length;

        return (
          <div>
            <p className="tasks-summary">
              {doneCount} of {result.length} completed
            </p>

            <ul className="task-list">
              {result.map(task => (
                <li
                  key={task.id}
                  className="task-item"
                  onClick={() => toggleTask(task.id)}
                >
                  <span
                    className={`task-check ${
                      task.completed ? 'checked' : ''
                    }`}
                  >
                    {task.completed ? 'Y' : ''}
                  </span>

                  <span
                    className={`task-text ${
                      task.completed ? 'done' : ''
                    }`}
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'notifications':
        return (
          <ul className="notification-list">
            {result.map((post, index) => (
              <li key={post.id} className="notification-item">
                <span className="notification-dot"></span>

                <div>
                  <p className="notification-title">
                    {post.title}
                  </p>

                  <p className="notification-time">
                    {index + 1}h ago
                  </p>
                </div>
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  }

  return (
    <div className="tabs">
      <div className="role-switcher">
        <label>
          <input
            type="radio"
            checked={role === 'user'}
            onChange={() => setRole('user')}
          />
          User
        </label>

        <label>
          <input
            type="radio"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          />
          Admin
        </label>
      </div>

      {loadingTabs ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className="tab-buttons">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${
                  activeTab === tab.id ? 'active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {loadingContent ? (
              <div className="spinner"></div>
            ) : (
              renderContent()
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Tabs;