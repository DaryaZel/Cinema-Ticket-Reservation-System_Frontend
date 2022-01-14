import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { MoviePage } from './pages/MoviePage/MoviePage';
import './App.css';

export const UserContext = React.createContext();

function App() {
  const [auth, setAuth] = useState(null);
  const value = {
    user: auth,
    logoutUser: setAuth
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
          const response = await fetch('https://cinematicketbooking.herokuapp.com/auth/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          const json = await response.json()
          if (response.status >= 500 && response.status < 600) {
            throw new Error("Bad response from server");
          }
          else if (response.status >= 400 && response.status < 500) {
            alert(json)
          }
          else {
            setAuth(json)
          }
        }
      } catch (error) {
        alert(error);
      }
    }
    fetchData()
  }, []);

  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
          <Route path='/movie/:id' element={<MoviePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
