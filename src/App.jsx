import { useEffect, useRef, useState } from "react";
import Controls from "./components/Controls";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [round, setRound] = useState(1);
  const [secuence, setSecuence] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [strict, setStrict] = useState(false);
  const [colors, setColors] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });
  const [win, setWin] = useState(false);
  const audios = useRef([]);

  const handleAvailableGame = () => {
    setStartGame(!startGame);
    setRound(19);
    setSecuence([]);
    setUserInputs([]);
    setColors({
      0: false,
      1: false,
      2: false,
      3: false,
    });
    setWin(false);
  };

  const handleReset = () => {
    setRound(1);
    setSecuence([]);
    setUserInputs([]);
    setColors({
      0: false,
      1: false,
      2: false,
      3: false,
    });
    setWin(false);
  };

  const handleClick = (i) => {
    if (startGame) {
      setUserInputs((prev) => [...prev, i]);
      if (audios.current[i]) {
        audios.current[i].play();
        setColors((prev) => ({ ...prev, [i]: true }));
      }
      setTimeout(() => {
        setColors((prev) => ({ ...prev, [i]: false }));
      }, 250);
    }
  };

  const handleStartGame = () => {
    if (startGame) {
      handleRound(false);
    }
  };

  const handleRound = (fail = false) => {
    if (startGame && !win) {
      let newSecuence = [...secuence];
      if (!fail) {
        let randomNum = Math.floor(Math.random() * 4);
        newSecuence.push(randomNum);
        setSecuence(newSecuence);
      }
      for (let i = 0; i < newSecuence.length; i++) {
        setTimeout(() => {
          if (audios.current[newSecuence[i]]) {
            audios.current[newSecuence[i]].currentTime = 0;
            audios.current[newSecuence[i]].play();
            setColors((prev) => ({ ...prev, [newSecuence[i]]: true }));
          }
          setTimeout(() => {
            setColors((prev) => ({ ...prev, [newSecuence[i]]: false }));
          }, 250);
        }, i * 500);
      }
    }
  };

  useEffect(() => {
    if (userInputs.length !== 0) {
      let correct = true;
      for (let i = 0; i < userInputs.length; i++) {
        if (userInputs[i] !== secuence[i]) {
          correct = false;
          break;
        }
      }

      if (correct && userInputs.length === secuence.length) {
        if (round === 20) {
          setWin(true);
          setSecuence([]);
          setUserInputs([]);
          setColors({
            0: false,
            1: false,
            2: false,
            3: false,
          });
          setStartGame(false);
          setTimeout(() => {
            handleReset();
          }, 5000);
        } else {
          setRound((prev) => prev + 1);
          setUserInputs([]);
          setTimeout(() => {
            handleRound(false);
          }, 1000);
        }
      }

      if (!correct) {
        if (strict) {
          alert("Wrong! Starting new game.");
          handleReset();
        } else {
          setUserInputs([]);
          setTimeout(() => {
            handleRound(true);
          }, 1000);
        }
      }
    }
  }, [userInputs, strict, round, secuence]);

  return (
    <>
      <h1>SIMON DICE</h1>
      <main>
        <div className="circle">
          <button
            className="btn-pulse"
            style={{ backgroundColor: colors[0] ? "#bef264" : "#16a34a" }}
            onClick={() => handleClick(0)}
          ></button>
          <button
            className="btn-pulse"
            style={{ backgroundColor: colors[1] ? "#f87171" : "#b91c1c" }}
            onClick={() => handleClick(1)}
          ></button>
          <Controls
            handleAvailableGame={handleAvailableGame}
            startGame={startGame}
            handleStartGame={handleStartGame}
            handleReset={handleReset}
            strict={strict}
            setStrict={setStrict}
            win={win}
            round={round}
          />
          <button
            className="btn-pulse"
            style={{ backgroundColor: colors[3] ? "#60a5fa" : "#1d4ed8" }}
            onClick={() => handleClick(3)}
          ></button>
          <button
            className="btn-pulse"
            style={{ backgroundColor: colors[2] ? "#fef08a" : "#fbbf24" }}
            onClick={() => handleClick(2)}
          ></button>
        </div>
      </main>

      <audio
        ref={(el) => (audios.current[0] = el)}
        src="https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound1.mp3"
      ></audio>
      <audio
        ref={(el) => (audios.current[1] = el)}
        src="https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound2.mp3"
      ></audio>
      <audio
        ref={(el) => (audios.current[2] = el)}
        src="https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound3.mp3"
      ></audio>
      <audio
        ref={(el) => (audios.current[3] = el)}
        src="https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound4.mp3"
      ></audio>
    </>
  );
}

export default App;
