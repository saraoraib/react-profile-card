import { useParams, Link } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();

  const people = {
    1: { name: 'Sara', role: 'AI Engineer', bio: 'Learning React' },
    2: { name: 'Mohammad', role: 'Backend Dev', bio: 'Building APIs and databases.' },
    3: { name: 'Ayat', role: 'Designer', bio: 'Designing clean, usable interfaces.' },
  };

  const person = people[id];

  if (!person) {
    return (
      <div className="user-profile-page">
        <p>User not found.</p>
        <Link to="/about">Back to About</Link>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <h1>{person.name}</h1>
      <p className="user-role">{person.role}</p>
      <p className="user-bio">{person.bio}</p>
      <Link to="/about">← Back to About</Link>
    </div>
  );
}

export default UserProfile;