import { useContext, useEffect } from 'react';
import { useState } from 'react';
import ThemeContext from '../context/theme';
import '../styles/theme-toggler.scss';

function ThemeToggler() {
  const [checked, setChecked] = useState(false);
  const { dark, setDark, saveThemeToLocalStorage } = useContext(ThemeContext);

  useEffect(() => {
    setChecked(!dark);
  }, [dark]);

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
    setDark((prevState) => {
      saveThemeToLocalStorage(!prevState);
      return !prevState;
    });
  };

  return (
    <div className='theme-toggler-container'>
      <div className='theme-toggler'>
        <label>
          <input type='checkbox' checked={checked} onChange={handleChange} />
          <span className='slider'></span>
        </label>
      </div>
    </div>
  );
}

export default ThemeToggler;
