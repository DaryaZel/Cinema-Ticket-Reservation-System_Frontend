import { LandingPage } from './pages/LandingPage/LandingPage';
import './App.css';
import { BrowserRouter, Router } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LandingPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
