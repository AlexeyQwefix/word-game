import './style.scss';

function Header({levelNumber}) {
  return (
    <div className="header">
      Уровень {levelNumber}
    </div>
  );
}

export default Header;
