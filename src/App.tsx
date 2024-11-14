import './App.css';
import { JsonExplorer } from './components/JSONExplorer';
import demoData from './demoData.json';

function App() {
  return (
    <div className="App">
      <JsonExplorer data={demoData} />
    </div>
  );
}

export default App;
