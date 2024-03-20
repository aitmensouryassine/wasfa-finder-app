import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoDark from '../images/logo-dark.svg';
import logoLight from '../images/logo-light.svg';
import ThemeContext from '../context/theme';
import '../styles/header.scss';

function Header() {
  const { dark } = useContext(ThemeContext);

  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <img alt='Wasfa finder logo' src={dark ? logoDark : logoLight} />
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
