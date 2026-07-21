import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import Profile from './Profile';
import Search from './Search';
import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Contact from './Contact';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [bgColor, setBgColor] = useState('#f5f7fa');

  return (
    <div style={{ background: bgColor, minHeight: '100vh', display: 'flex', flexDirection: 'column', transition: 'background 0.2s' }}>
      <BrowserRouter>
        <Header color={bgColor} onChange={setBgColor} />

        <main style={{ flex: 1 }}>
          <nav>
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/profile">Profile</Link> | <Link to="/search">Search</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/tasks">Tasks</Link> | <Link to="/contact">Contact Us</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer color={bgColor} />
      </BrowserRouter>
    </div>
  );
}

export default App;