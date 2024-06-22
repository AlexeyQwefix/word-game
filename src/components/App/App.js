import Header from "../Header/Header";
import WordsTable from "../WordsTable/WordsTable";
import WordsInput from "../WordsInput/WordsInput";
import "./style.scss";
import level1 from "../../data/levels/1.json";
import level2 from "../../data/levels/2.json";
import level3 from "../../data/levels/3.json";
import { useCallback, useState } from "react";
import WinScreen from "../WinScreen/WinScreen";

function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [foundedWords, setFoundedWords] = useState([]);
  const [currentLevel, setCurrentLevel] = useState({
    ...level1,
    levelNumber: 1,
  });

  const addLetter = useCallback(
    (inputLetter) => {
      setCurrentInput((word) => word + inputLetter);
    },
    [setCurrentInput]
  );

  const endWord = useCallback(() => {
    setCurrentInput((currentInput) => {
      setFoundedWords((foundedWords) => {
        if (foundedWords.findIndex((w) => w === currentInput) !== -1)
          return foundedWords;
        if (currentLevel.words.findIndex((w) => w === currentInput) === -1)
          return foundedWords;
        return [...foundedWords, currentInput];
      });
      return "";
    });
  }, [setCurrentInput, setFoundedWords, currentLevel]);

  const startNextLevel = useCallback(() => {
    const nextLevelNumber = currentLevel.levelNumber + 1;
    const realNextLevelNumber = nextLevelNumber % 3;
    let nextLevelData = level1;

    switch (realNextLevelNumber) {
      case 1:
        nextLevelData = level1;
        break;
      case 2:
        nextLevelData = level2;
        break;
      default:
        nextLevelData = level3;
        break;
    }
    setCurrentLevel({ ...nextLevelData, levelNumber: nextLevelNumber });
    setFoundedWords([]);
    setCurrentInput("");
  }, [currentLevel]);

  return (
    <div className="app">
      {foundedWords.length === currentLevel.words.length ? (
        <WinScreen
          levelNumber={currentLevel.levelNumber}
          startNextLevel={startNextLevel}
        ></WinScreen>
      ) : (
        <>
          <Header levelNumber={currentLevel.levelNumber} />
          <WordsTable
            level={currentLevel}
            levelNumber={currentLevel.levelNumber}
            foundedWords={foundedWords}
          />
          <WordsInput
            level={currentLevel}
            currentInput={currentInput}
            addLetter={addLetter}
            endWord={endWord}
          ></WordsInput>
        </>
      )}
    </div>
  );
}

export default App;
