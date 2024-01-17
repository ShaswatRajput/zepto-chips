import InputChips from "./components/InputChips";
import './App.css'

function App() {
  return (
    <div className="container">
      <ul>
        <li>Same tags can't be entered again</li>
        <li>Press Tab, Enter, Comma to add a tag to the list</li>
        <li>Tags can be suggested either if Name or Email matches</li>
        <li>Press Backspace two times to fully remove a tag from the list</li>
      </ul>
      <h1>Zepto Chips-</h1>
      <InputChips />
    </div>
  );
}

export default App;
