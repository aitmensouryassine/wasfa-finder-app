import { useContext } from 'react';
import { useRouteError, Link } from 'react-router-dom';
import ThemeContext from '../context/theme';
import Header from '../components/Header';
import pizza from '../images/pizza.png';
import '../styles/error.scss';

function Error() {
  const { dark } = useContext(ThemeContext);

  console.error(useRouteError());
  return (
    <div className={`App-${dark ? 'dark' : 'light'}`}>
      <Header />
      <section className='Error'>
        <div className='error-container'>
          <div className='not-found'>
            <span>4</span>
            <span>
              <img alt='404' src={pizza} />
            </span>
            <span>4</span>
          </div>
          <h2>Sorry! The recipe you're looking for isn't available 🥲</h2>
          <Link to='/'>Go To Home Page</Link>
        </div>
      </section>
    </div>
  );
}

export default Error;
