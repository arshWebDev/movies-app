import "./App.css";
import './components.css';

import { Route, Routes } from "react-router-dom";

import { Home } from "./pages";

const App = () => {
  return (
    <div className="App dark:bg-neutral-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
