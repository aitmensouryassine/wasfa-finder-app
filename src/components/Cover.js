import '../styles/cover.scss';
import { TEATIME } from '../utils';

export default function Cover({ mealType }) {
  const style = {
    backgroundImage: `url(${require(`../images/cover-${mealType}.jpg`)})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  return (
    <div className='Cover' style={style}>
      <div className='title'>It's {mealType === TEATIME ? 'Tea' : mealType} Time 😋</div>
    </div>
  );
}
