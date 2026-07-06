import { useState } from 'react';

function ProfileCard({ name, title, bio }) {
  const [showBio, setShowBio] = useState(true);

  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p>{title}</p>
      <button onClick={() => setShowBio(!showBio)}>
        {showBio ? 'Hide bio' : 'Show bio'}
      </button>
      {showBio && <p>{bio}</p>}
    </div>
  );
}

export default ProfileCard;