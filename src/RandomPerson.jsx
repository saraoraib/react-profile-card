import { useState, useEffect } from 'react';

function RandomPerson() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);

  const loadPerson = () => {
    setLoading(true);
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(result => {
        setPerson(result.results[0]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPerson();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="random-person">
      <img src={person.picture.large} alt={person.name.first} />
      <p>{person.name.first} {person.name.last}</p>
      <p>{person.email}</p>
      <button onClick={loadPerson}>Get another person</button>
    </div>
  );
}

export default RandomPerson;