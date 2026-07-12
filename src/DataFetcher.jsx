import { useState, useEffect } from 'react';

function DataFetcher() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(result => {
        setTimeout(() => {
          setData(result);
          setLoading(false);
        }, 2000); 
      });
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return <p>{data.name}</p>;
}

export default DataFetcher;