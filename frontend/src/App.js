import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import './App.css';
import { Home } from "./components/Home";

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createevent" element={<CreateEvent/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
