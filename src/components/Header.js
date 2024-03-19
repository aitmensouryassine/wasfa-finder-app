import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../images/logo-dark.png';
import '../styles/header.scss';
import darkModeIcon from '../images/dark-mode-icon.svg';
import context from '../context';

function Header() {
  const { modeObj } = useContext(context);
  const { mode, setMode } = modeObj;

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  console.log(mode);

  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <img alt='Wasfa finder logo' src={ logo } />
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
      <div className='mode-toggle'>
        <img
          onClick={ toggleMode }
          src={ darkModeIcon }
          alt='dark/light toggle icon'
          style={ { filter: mode === 'light' ? 'invert(100%)' : 'invert(20%)' } }
        />
      </div>
    </header>
  );
}

export default Header;
