import { useState, useEffect } from 'react';
import './Schedule.css';
import { CinemaSchedule } from './CinemaSchedule';
import { handleResponse } from '../../../../utilities/ResponseHandler';

export function Schedule({ city, cinema, day }) {
    const [dateSchedule, setDateSchedule] = useState([]);
    const locale = "en-US";
    const formattingOptions = { month: 'long', day: 'numeric', weekday: 'long' };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/schedule?city=${city}&cinema=${cinema}&date=${day}`);
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
        fetchData();
    }, [city, cinema, day]);

    return (
        <div className='schedule'>
            {dateSchedule.map((elem) => {
                return (
                    <div>
                        <div className='schedule__date-container'>
                            <h2>{new Date(elem.day).toLocaleDateString(locale, formattingOptions)}</h2>
                        </div>
                        {
                            elem.schedules.map((cinema) => (
                                <CinemaSchedule cinema={cinema} />
                            ))
                        }</div>
                )
            })}
        </div>
    );
}
