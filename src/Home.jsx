import NotesBox from './NotesBox';
import DataFetcher from './DataFetcher';
import RandomPerson from './RandomPerson';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <NotesBox />
      <DataFetcher />
      <RandomPerson />
    </div>
  );
}

export default Home;