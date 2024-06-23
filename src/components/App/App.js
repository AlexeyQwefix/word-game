import Header from "../Header/Header";
import WordsTable from "../WordsTable/WordsTable";
import WordsInput from "../WordsInput/WordsInput";
import NotActualPopup from "../NotActualPopup/NotActualPopup";
import "./style.scss";
import getLevelFromLevelNumber from "../../helpers/getLevelFromLevelNumber";
import { useCallback, useEffect, useState } from "react";
import WinScreen from "../WinScreen/WinScreen";
import LocalSavesHelper from "../../helpers/localSavesHelper";

function App() {
  const [hash, setHash] = useState(0);
  const [isWrongHash, setIsWrongHash] = useState(false);

  const [currentInput, setCurrentInput] = useState("");
  const [foundedWords, setFoundedWords] = useState(
    LocalSavesHelper.getFoundedWords()
  );
  const [currentLevel, setCurrentLevel] = useState({
    ...getLevelFromLevelNumber(LocalSavesHelper.getLevel()),
    levelNumber: LocalSavesHelper.getLevel(),
  });

  useEffect(() => setHash(LocalSavesHelper.increaseHash()), [setHash]);

  useEffect(() => {
    const timeoutFunction = () => {
      if (LocalSavesHelper.getHash() !== hash) setIsWrongHash(true);
    };
    const interval = setInterval(timeoutFunction, 500);
    return () => {
      clearInterval(interval);
    };
  }, [hash, setIsWrongHash]);

  const softReload = useCallback(() => {
    setFoundedWords(LocalSavesHelper.getFoundedWords());
    setCurrentLevel({
      ...getLevelFromLevelNumber(LocalSavesHelper.getLevel()),
      levelNumber: LocalSavesHelper.getLevel(),
    });
    setHash(LocalSavesHelper.increaseHash());
    setIsWrongHash(false)
  },[setFoundedWords,setCurrentLevel,setHash,setIsWrongHash]);

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
        const res = [...foundedWords, currentInput];
        setHash(LocalSavesHelper.setFoundedWords(res));
        return res;
      });
      return "";
    });
  }, [setCurrentInput, setFoundedWords, currentLevel]);

  const startNextLevel = useCallback(() => {
    const nextLevelNumber = currentLevel.levelNumber + 1;

    let nextLevelData = getLevelFromLevelNumber(nextLevelNumber);
    LocalSavesHelper.setLevel(nextLevelNumber);
    const hash = LocalSavesHelper.setFoundedWords([]);
    setHash(hash);
    setCurrentLevel({ ...nextLevelData, levelNumber: nextLevelNumber });
    setFoundedWords([]);
    setCurrentInput("");
  }, [
    currentLevel,
    setHash,
    setCurrentLevel,
    setFoundedWords,
    setCurrentInput,
  ]);

  return (
    <div className="app" >
      {isWrongHash && <NotActualPopup softReload={softReload}></NotActualPopup>}
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
