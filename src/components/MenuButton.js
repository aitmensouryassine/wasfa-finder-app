import '../styles/menu-button.scss';

function MenuButton({ hide, setHide }) {
  const handleClick = () => {
    setHide((prevState) => !prevState);
  };

  return (
    <div className={`menu-button ${!hide ? 'active' : ''}`} onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default MenuButton;
