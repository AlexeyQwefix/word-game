import { useEffect, useState } from "react";
import "./style.scss";

function WordsInput({ level }) {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const letters = level.words
      .join("")
      .split("")
      .filter((value, index, array) => array.indexOf(value) === index);
    const randomOrderedLetters = letters.sort(() => Math.random() - 0.5);
    const degreeStep = 360 / randomOrderedLetters.length;
    const result = randomOrderedLetters.map((symbol, i) => ({
      symbol,
      turnDegrees: i * degreeStep,
    }));
    setLetters(result);
  }, [level]);

  const [currentInput, setCurrentInput] = useState("ров");

  return (
    <div className="words-input">
      <div className="current-input">
        {currentInput.split("").map((letter) => (
          <div className="symbol">{letter}</div>
        ))}
      </div>
      <div className="circle">
        <div className="circle-inner">
          {letters.map((letter) => (
            <div
              className="symbol-wrapper"
              key={`${letter.symbol}-${letter.turnDegrees}`}
              style={{ "--turn-degrees": letter.turnDegrees + "deg" }}
            >
              <div className="symbol">{letter.symbol}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordsInput;
