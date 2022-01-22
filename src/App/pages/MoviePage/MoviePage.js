import React from 'react';
import { useState } from 'react';
import { Header } from "../components/Header/Header";
import { MainMoviePage } from "./MainMoviePage/MainMoviePage";
import { useParams } from "react-router-dom";

export const FilterContext = React.createContext();
export function MoviePage() {
    let params = useParams();
    const [city, setCity] = useState('Minsk');
    const [cinema, setCinema] = useState('All cinemas');
    const [day, setDay] = useState("Whole calender");
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
            <Header />
            <FilterContext.Provider value={filtersValue}>
                <MainMoviePage params={params} />
            </FilterContext.Provider>
        </div >
    )
}
