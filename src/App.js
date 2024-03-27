import { useContext, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeContext from './context/theme';
import Header from './components/Header';
import './styles/app.scss';

function App() {
  const { dark } = useContext(ThemeContext);
  const gotoTopBtn = useRef();

  const handleScroll = (evt) => {
    if (window.scrollY > window.innerHeight * 2) {
      gotoTopBtn.current.style.display = 'block';
    } else {
      gotoTopBtn.current.style.display = 'none';
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const gotoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`App-${dark ? 'dark' : 'light'}`}>
      <Header />
      <Outlet />
      <div className='goto-top-btn' ref={gotoTopBtn} onClick={gotoTop}>
        <i className='bi bi-caret-up-square-fill'></i>
      </div>
    </div>
  );
}

export default App;
