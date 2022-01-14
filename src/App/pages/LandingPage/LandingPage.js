import React from 'react';
import { useState } from 'react';
import { Main } from './Main/Main';
import { Header } from '../components/Header/Header';

export const FilterContext = React.createContext();

export function LandingPage() {
    const [city, setCity] = useState('Minsk');
    const [cinema, setCinema] = useState('All cinemas');
    const [day, setDay] = useState('Whole calender');
    const filtersValue = {
        city: city,
        setCity: setCity,
        cinema: cinema,
        setCinema: setCinema,
        day: day,
        setDay: setDay
    }
    
    return (
        <div>
            <Header />
            <FilterContext.Provider value={filtersValue}>
                <Main />
            </FilterContext.Provider>
        </div>
    );
}
