import React from 'react';
import { useState } from 'react';
import { defaultCityValue, defaultCinemaValue, defaultDayValue } from '../../App';
import { Main } from './Main/Main';
import { Header } from '../components/Header/Header';

export const FilterContext = React.createContext();

export function LandingPage() {
    const [city, setCity] = useState(defaultCityValue);
    const [cinema, setCinema] = useState(defaultCinemaValue);
    const [day, setDay] = useState(defaultDayValue);
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
            <Header showSearchForm={true} />
            <FilterContext.Provider value={filtersValue}>
                <Main />
            </FilterContext.Provider>
        </div>
    );
}
