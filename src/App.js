import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Search from './pages/Search';
import SearchInfo from './pages/SearchInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Search' element={<Search />}></Route>
          <Route path='/Search/:id' element={<SearchInfo />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
