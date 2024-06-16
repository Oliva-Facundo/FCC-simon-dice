const Controls = ({
  handleAvailableGame,
  startGame,
  handleStartGame,
  handleReset,
  strict,
  setStrict,
  win,
  round,
}) => {
  return (
    <div className="controls">
      <input type="checkbox" name="on" id="on" onChange={handleAvailableGame} />
      <label htmlFor="on">{startGame ? "On" : "Off"}</label>
      <div className="buttons">
        <button className="start-game" onClick={handleStartGame}>
          Start
        </button>
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <input
        type="checkbox"
        name="strict"
        id="strict"
        onChange={() => setStrict(!strict)}
      />
      <label htmlFor="strict">{strict ? "Strict On" : "Strick Off"}</label>
      <div className="counter">
        {win ? "YOU WIN, press reset to play again" : round}
      </div>
    </div>
  );
};

export default Controls;
