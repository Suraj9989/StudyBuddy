import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">📘 StudyBuddy</div>
      <nav className="nav-links">
        <Link to="/Home">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/search">Search</Link>
        {/* <Link to="/bookmarks">Bookmarks</Link> */}
        <Link to="/">Logout</Link>
      </nav>
    </header>
  );
}

export default Header;
