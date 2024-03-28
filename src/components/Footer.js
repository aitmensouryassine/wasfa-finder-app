import { Link } from 'react-router-dom';
import '../styles/footer.scss';

export default function Footer({ device }) {
  return (
    <div className={`Footer ${device}`}>
      <div className='links'>
        <Link to='/terms'>Terms</Link> · <Link to='/privacy'>Privacy Policy</Link>
      </div>
      <div className='copyright'>WasfaFinder © 2024</div>
    </div>
  );
}
