import Header from "../Header/Header";
import WordsTable from "../WordsTable/WordsTable";
import WordsInput from "../WordsInput/WordsInput";
import "./style.scss";
import level1 from "../../data/levels/1.json";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [foundedWords, setFoundedWords] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(level1);

  const addLetter = useCallback(
    (inputLetter) => {
      setCurrentInput((word) => word + inputLetter);
    },
    [setCurrentInput]
  );

  const endWord = useCallback(() => {
    const checkWord = (word) => {
      if (foundedWords.findIndex((w) => w === word) !== -1) return;
      if (currentLevel.words.findIndex((w) => w === word) === -1) return;
      setFoundedWords((words) => [...words, word]);
    };

    setCurrentInput((currentInput) => {
      checkWord(currentInput);
      return "";
    });
  }, [setCurrentInput, setFoundedWords, foundedWords, currentLevel]);

  return (
    <div className="app">
      <Header levelNumber={1} />
      <WordsTable level={level1} levelNumber={1} foundedWords={foundedWords} />
      <WordsInput
        level={level1}
        currentInput={currentInput}
        addLetter={addLetter}
        endWord={endWord}
      ></WordsInput>
    </div>
  );
}

export default App;
