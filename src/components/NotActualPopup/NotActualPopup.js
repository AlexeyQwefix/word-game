import "./style.scss";

function NotActualPopup({ softReload }) {
  return (
    <div className="not-actual-bg">
      <div className="not-actual-popup">
        <div className="ribbon">Две вкладки с игрой?</div>
        <p>
          Похоже, игра открыта в нескольких вкладках браузера. Чтобы продолжить
          играть в этой вкладке, обновите страницу.
        </p>
        <button onClick={softReload}>Обновить</button>
      </div>
    </div>
  );
}

export default NotActualPopup;
