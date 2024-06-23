import { useEffect, useState } from "react";
import "./style.scss";
import getLettersFromWords from "../../helpers/getLettersFromWords";

function WordsInput({ level, currentInput, addLetter, endWord }) {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const letters = getLettersFromWords(level.words);

    const degreeStep = 360 / letters.length;
    const result = letters.map((symbol, i) => ({
      symbol,
      turnDegrees: i * degreeStep,
    }));
    setLetters(result);
  }, [level]);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [highlightedIndexes, setHighlightedIndexes] = useState([]);

  const startInput = (letter, index) => {
    setIsMouseDown(true);

    if (highlightedIndexes.findIndex((i) => i === index) === -1) {
      setHighlightedIndexes((indexes) => [...indexes, index]);
      addLetter(letter);
    }
  };

  const hoverLetter = (letter, index) => {
    if (!isMouseDown) return;
    if (highlightedIndexes.findIndex((i) => i === index) === -1) {
      setHighlightedIndexes((indexes) => [...indexes, index]);
      addLetter(letter);
    }
  };

  const endInput = () => {
    setIsMouseDown(false);
    setHighlightedIndexes([]);
    endWord();
  };

  const allTheRefs = [];

  const handleMobileDrag = (e) => {
    const { clientX, clientY } = e.changedTouches[0];
    const target = allTheRefs.find(({ ref, index, letter }) => {
      const rect = ref.getBoundingClientRect();

      if (
        clientY < rect.bottom &&
        clientY > rect.top &&
        clientX > rect.left &&
        clientX < rect.right
      )
        return true;
      return false;
    });
    if (!target) return;

    setHighlightedIndexes((indexes) => {
      if (indexes.findIndex((i) => i === target.index) === -1) {
        addLetter(target.letter);
        return [...indexes, target.index];
      }
      return indexes;
    });
  };

  return (
    <div className="words-input" onMouseUp={endInput} onMouseLeave={endInput}>
      <div className="current-input">
        {currentInput.split("").map((letter, index) => (
          <div className="symbol" key={`${index}-${letter}`}>
            {letter}
          </div>
        ))}
      </div>
      <div className="circle">
        <div className="circle-inner">
          {letters.map((letter, index) => (
            <div
              className="symbol-wrapper"
              key={`${letter.symbol}-${letter.turnDegrees}`}
              style={{ "--turn-degrees": letter.turnDegrees + "deg" }}
              onTouchMove={handleMobileDrag}
              onTouchEnd={endInput}
            >
              <div
                className={`symbol ${
                  highlightedIndexes.findIndex((i) => i === index) === -1
                    ? ""
                    : "chosen"
                }`}
                onMouseEnter={() => hoverLetter(letter.symbol, index)}
                onMouseDown={() => startInput(letter.symbol, index)}
                ref={(ref) =>
                  (allTheRefs[index] = { ref, index, letter: letter.symbol })
                }
              >
                {letter.symbol}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordsInput;
