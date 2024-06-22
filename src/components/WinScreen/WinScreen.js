import "./style.scss";

function WinScreen({ levelNumber, startNextLevel }) {
  return (
    <div className="win-screen">
      <p className="win-screen-sub-header">Уровень {levelNumber} пройден</p>
      <p className="win-screen-header">Изумительно !</p>
      <button className="win-screen-next-level-button" onClick={startNextLevel}>
        Уровень {levelNumber + 1}
      </button>
    </div>
  );
}

export default WinScreen;
