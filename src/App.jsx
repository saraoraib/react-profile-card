import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import Profile from './Profile';
import NotesBox from './NotesBox';
import Search from './Search';
import Dashboard from './Dashboard';
import Header from './Header';
import Footer from './Footer';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/profile">Profile</Link> | <Link to="/search">Search</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;