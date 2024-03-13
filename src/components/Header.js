import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo-dark.png';
import '../styles/header.scss';

function Header() {
  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <img alt='Wasfa finder logo' src={logo} />
        </Link>
      </div>
      <nav>
        <NavLink to='/'>
          <i className='bi bi-house'></i>
          <span>Home</span>
        </NavLink>
        <NavLink to='/search'>
          <i className='bi bi-search'></i>
          <span>Search</span>
        </NavLink>
        <NavLink to='/saved'>
          <i className='bi bi-bookmark'></i>
          <span>Saved</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
