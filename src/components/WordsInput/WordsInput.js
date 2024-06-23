import { useCallback, useEffect, useState } from "react";
import "./style.scss";
import getLettersFromWords from "../../helpers/getLettersFromWords";

function getOffset(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  };
}

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
  const [lines, setLines] = useState([]);

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
      setHighlightedIndexes((indexes) => {
        if (indexes[indexes.length - 1] !== undefined && index != undefined) {
          addLine(indexes[indexes.length - 1], index);
        }
        return [...indexes, index];
      });
      addLetter(letter);
    }
  };

  const endInput = () => {
    setIsMouseDown(false);
    setHighlightedIndexes([]);
    setLines([]);
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
        if (
          indexes[indexes.length - 1] !== undefined &&
          target.index != undefined
        ) {
          addLine(indexes[indexes.length - 1], target.index);
        }
        return [...indexes, target.index];
      }
      return indexes;
    });
  };

  const addLine = (startIndex, endIndex) => {
    const thickness = 4;
    console.log(allTheRefs[startIndex]);
    var off1 = getOffset(allTheRefs[startIndex]?.ref);
    var off2 = getOffset(allTheRefs[endIndex]?.ref);
    var x1 = off1.left + off1.width / 2;
    var y1 = off1.top + off1.height / 2;
    var x2 = off2.left + off2.width / 2;
    var y2 = off2.top + off1.width / 2;
    var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    var cx = (x1 + x2) / 2 - length / 2;
    var cy = (y1 + y2) / 2 - thickness / 2;
    var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
    setLines((lines) => [
      ...lines,
      {
        x1,
        y1,
        x2,
        y2,
        length,
        cx,
        cy,
        angle,
        thickness,
      },
    ]);
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
          {lines.map(({ x1, y1, x2, y2, length, cx, cy, angle, thickness }) => (
            <div
              key={x1 + "" + x2 + y2 + y1}
              style={{
                zIndex: 1,
                padding: "0px",
                margin: "0px",
                height: thickness + "px",
                backgroundColor: "green",
                lineHeight: "1px",
                position: "fixed",
                left: cx + "px",
                top: cy + "px",
                width: length + "px",
                transform: `rotate(${angle}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordsInput;
