import { useState } from 'react';

function SearchList() {
  const [query, setQuery] = useState('');

  const people = ['Sara', 'Omar', 'Layla', 'Ahmed', 'Mona'];

  const filtered = people.filter(person =>
    person.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-list">
      <input
        type="text"
        placeholder="Search names..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filtered.length > 0 ? (
          filtered.map(person => <li key={person}>{person}</li>)
        ) : (
          <li className="no-results">No matches found</li>
        )}
      </ul>
    </div>
  );
}

export default SearchList;