import Header from '../Header/Header';
import WordsTable from '../WordsTable/WordsTable';
import WordsInput from '../WordsInput/WordsInput';
import './style.scss';
import level1 from '../../data/levels/1.json'

function App() {
  return (
    <div className="app">
      <Header levelNumber = {1}/>
      <WordsTable level={level1} levelNumber={1}/>
      <WordsInput level={level1}></WordsInput>
      
    </div>
  );
}

export default App;
