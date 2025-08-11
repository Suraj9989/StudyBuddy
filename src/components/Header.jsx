import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">📘 StudyBuddy</div>
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/Home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link>
        <Link to="/notes" onClick={() => setMenuOpen(false)}>Notes</Link>
        <Link to="/tasks" onClick={() => setMenuOpen(false)}>Tasks</Link>
        <Link to="/search" onClick={() => setMenuOpen(false)}>Search</Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>Logout</Link>
      </nav>
    </header>
  );
}

export default Header;
