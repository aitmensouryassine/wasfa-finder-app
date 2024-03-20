import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoDark from '../images/logo-dark.svg';
import logoLight from '../images/logo-light.svg';
import ThemeContext from '../context/theme';
import '../styles/header.scss';
import ThemeToggler from './ThemeToggler';
import MenuButton from './MenuButton';

function Header() {
  const [hide, setHide] = useState(true);
  const { dark } = useContext(ThemeContext);

  const handleHide = () => {
    setHide(true);
  };

  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <img alt='Wasfa finder logo' src={dark ? logoDark : logoLight} />
        </Link>
        <MenuButton hide={hide} setHide={setHide} />
      </div>

      <nav className={hide ? 'hide' : ''}>
        <NavLink to='/' onClick={handleHide}>
          <i className='bi bi-house'></i>
          <span>Home</span>
        </NavLink>
        <NavLink to='/search' onClick={handleHide}>
          <i className='bi bi-search'></i>
          <span>Search</span>
        </NavLink>
        <NavLink to='/saved' onClick={handleHide}>
          <i className='bi bi-bookmark'></i>
          <span>Saved</span>
        </NavLink>
      </nav>
      <ThemeToggler />
    </header>
  );
}

export default Header;
