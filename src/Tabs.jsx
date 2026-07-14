import { useState } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'notifications', label: 'Notifications' },
  ];

  const content = {
    profile: 'profile information',
    settings: 'account settings',
    notifications: '3 new notifications',
  };

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="tab-content">{content[activeTab]}</p>
    </div>
  );
}

export default Tabs;