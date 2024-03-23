import '../styles/footer.scss';

export default function Footer({ device }) {
  return (
    <div className={`Footer ${device}`}>
      <div className='links'>
        <a href='#'>Terms</a> · <a href='#'>Privacy</a>
      </div>
      <div className='copyright'>WasfaFinder © 2024</div>
    </div>
  );
}
