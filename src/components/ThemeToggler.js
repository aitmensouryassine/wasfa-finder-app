import { useContext, useEffect } from 'react';
import { useState } from 'react';
import ThemeContext from '../context/theme';
import '../styles/theme-toggler.scss';

function ThemeToggler() {
  const [checked, setChecked] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);

  useEffect(() => {
    setChecked(!dark);
  }, []);

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
    setDark((prevState) => !prevState);
  };

  return (
    <div className='theme-toggler'>
      <label>
        <input type='checkbox' checked={checked} onChange={handleChange} />
        <span className='slider'></span>
      </label>
    </div>
  );
}

export default ThemeToggler;
