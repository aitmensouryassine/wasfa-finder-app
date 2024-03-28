import { Link } from 'react-router-dom';
import '../styles/footer.scss';

export default function Footer({ device, handleHide = () => {} }) {
  return (
    <div className={`Footer ${device}`}>
      <div className='links'>
        <Link to='/terms' onClick={handleHide}>
          Terms
        </Link>{' '}
        ·{' '}
        <Link to='/privacy' onClick={handleHide}>
          Privacy Policy
        </Link>
      </div>
      <div className='copyright'>WasfaFinder © 2024</div>
    </div>
  );
}
