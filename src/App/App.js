import { LandingPage } from './pages/LandingPage/LandingPage';
import './App.css';
import { ModalWindow } from './pages/components/ModalWindow/ModalWindow';

function App() {
  return (
    <div className="App">
      <LandingPage />
      <ModalWindow/>
    </div>
  );
}

export default App;
