import { useEffect, useState } from "react";
import "./style.scss";

const SIZE_IN_VH = 48;
const GAP = 0.44;

const computeSymbolSize = ({ words }) => {
  const wordsCount = words.length;
  const longestWord = words.sort(function (a, b) {
    return b.length - a.length;
  })[0].length;

  const longestDimension = wordsCount > longestWord ? wordsCount : longestWord;
  const res =(SIZE_IN_VH - GAP * (longestDimension - 1)) / longestDimension;

  return res>=5.26?5.26:res
};

function WordsTable({ level, levelNumber, foundedWords }) {
  const [symbolSize, setSymbolSize] = useState(computeSymbolSize(level));
  useEffect(() => {
    setSymbolSize(computeSymbolSize(level));
  }, [level, levelNumber, setSymbolSize]);

  return (
    <div className="words-table" style={{ "--symbol-size": `${symbolSize}vh` }}>
      {level.words.map((word, wordIndex) => {
        const isWordFound = foundedWords.findIndex((w) => w === word) !== -1;
        return (
          <div
            className={`word ${isWordFound ? "found" : ""}`}
            key={`${wordIndex}-${word.length}-${levelNumber}`}
          >
            {word.split("").map((symbol, index) => (
              <div
                className="symbol"
                key={`${wordIndex}-${word.length}-${levelNumber}-${index}`}
              >
                {isWordFound ? symbol : null}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default WordsTable;
