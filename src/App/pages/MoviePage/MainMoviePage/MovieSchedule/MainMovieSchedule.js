import { useState, useEffect } from 'react';
import { handleResponse } from '../../../../utilities/ResponseHandler';
import { MainMovieCinemaSchedule } from './MainMovieCinemaSchedule';
import { defaultCinemaValue, defaultDayValue, timezone } from '../../../../App';
import './MainMovieSchedule.css';

export function MainMovieSchedule({ city, cinema, day, movieId }) {
    const [dateSchedule, setDateSchedule] = useState([]);
    const locale = "en-US";
    const formattingOptions = { month: 'long', day: 'numeric', weekday: 'long' };

    useEffect(() => {
        async function fetchData() {
            try {
                let queryParams = `city=${city}&timeZone=${timezone}`
                if (cinema !== defaultCinemaValue) {
                    queryParams = queryParams + `&cinema=${cinema}`
                }
                if (day !== defaultDayValue) {
                    queryParams = queryParams + `&date=${day}`
                }
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/schedule/${movieId}?${queryParams}`);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setDateSchedule(result);
                    }
                );
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, [city, cinema, day]);

    return (
        <div className='schedule'>
            {dateSchedule.map((elem) => {
                return (
                    <div>
                        <div className='schedule__date-container'>
                            <h2>{new Date(elem.day).toLocaleDateString(locale, formattingOptions)}</h2>
                        </div>
                        {elem.schedules.length === 0 ?
                            <h3 className='schedule__no-sessions'>No sessions found</h3> :
                            elem.schedules.map((cinema) => (
                                <MainMovieCinemaSchedule cinema={cinema} />
                            ))
                        }</div>
                )
            })}
        </div>
    );
}
