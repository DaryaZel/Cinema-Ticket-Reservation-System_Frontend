import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { MoviePage } from './pages/MoviePage/MoviePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} exact />
        <Route path='/movie' element={<MoviePage />} />
      </Routes>
    </div>

  );
}

export default App;
