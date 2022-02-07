
import './App.css';
import Homepage from './pages/Homepage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
     <h1>Web-shop</h1>
     <Homepage />
     <button className='btn btn-primary'>BootStrap Btn</button>
    </div>
  );
}

export default App;
