import React from 'react';
import { useState, useEffect } from 'react';
import { handleResponse } from './utilities/ResponseHandler';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { MoviePage } from './pages/MoviePage/MoviePage';
import { ReservationPage } from './pages/ReservationPage/ReservationProcessPage';
import { PersonalAccountPage } from './pages/PersonalAccountPage/PersonalAccountPage';
import './App.css';

export const UserContext = React.createContext();
export const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const defaultCityValue = 'Minsk';
export const defaultCinemaValue = 'All cinemas';
export const defaultDayValue = 'Whole calendar';
export const tokenStorageKey = 'AUTH_TOKEN';


function App() {
  const [auth, setAuth] = useState(null);
  const value = {
    user: auth,
    setUserState: setAuth
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem(tokenStorageKey)||sessionStorage.getItem(tokenStorageKey);
        if (token) {
          const response = await fetch('https://cinematicketbooking.herokuapp.com/auth/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          handleResponse(response,
            (error) => {
              debugger
              alert(error);
            },
            (result) => {
              setAuth(result);
            }
          )
        }
      } catch (error) {
        debugger
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
          <Route path='/reservation/:id' element={<ReservationPage />} />
          <Route path='/personalaccount' element={<PersonalAccountPage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
