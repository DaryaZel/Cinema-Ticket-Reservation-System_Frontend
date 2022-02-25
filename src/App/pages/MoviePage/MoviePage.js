import React from 'react';
import { useState } from 'react';
import { defaultCityValue, defaultCinemaValue, defaultDayValue } from '../../App';
import { Header } from "../components/Header/Header";
import { MainMoviePage } from "./MainMoviePage/MainMoviePage";
import { useParams } from "react-router-dom";

export const FilterContext = React.createContext();
export function MoviePage() {
    let params = useParams();
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
    };

    return (
        <div>
            <Header showSearchForm={false} />
            <FilterContext.Provider value={filtersValue}>
                <MainMoviePage params={params} />
            </FilterContext.Provider>
        </div >
    )
}
