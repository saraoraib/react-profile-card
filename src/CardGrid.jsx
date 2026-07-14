import Card from './Card';

function CardGrid() {
  const people = [
    { name: 'Sara', role: 'AI Engineer', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', accent: '#6366f1' },
    { name: 'Mohammad', role: 'Backend Dev', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)', accent: '#ec4899' },
    { name: 'Ayat', role: 'Designer', gradient: 'linear-gradient(135deg, #10b981, #34d399)', accent: '#10b981' },
  ];

  return (
    <div className="card-grid">
      {people.map(person => (
        <Card
          key={person.name}
          name={person.name}
          role={person.role}
          gradient={person.gradient}
          accent={person.accent}
        />
      ))}
    </div>
  );
}

export default CardGrid;