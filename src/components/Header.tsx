import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header-container">
      <div className="logo">My App</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/signin" className="signin-btn">Sign In</Link>
      </nav>
    </header>
  );
}
