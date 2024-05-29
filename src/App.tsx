
import { HashRouter } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <HomePage />
      </HashRouter>
    </div>
  );
}

export default App;
