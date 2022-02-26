import { useState, useEffect } from 'react';
import './Schedule.css';
import { CinemaSchedule } from './CinemaSchedule';
import { handleResponse } from '../../../../utilities/ResponseHandler';
import { defaultCinemaValue, defaultDayValue, timezone } from '../../../../App';

export function Schedule({ city, cinema, day }) {
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
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/schedule?${queryParams}`);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setDateSchedule(result);
                    }
                );
            } catch (error) {
                alert("Oops, something went wrong");
            }
        }
        fetchData();
    }, [city, cinema, day]);

    return (
        <div className='schedule'>
            {dateSchedule.map((elem, index) => {
                return (
                    <div key={index}>
                        <div className='schedule__date-container'>
                            <h2>{new Date(elem.day).toLocaleDateString(locale, formattingOptions)}</h2>
                        </div>

                        {elem.schedules.length === 0 ?
                            <h3 className='schedule__no-sessions'>No sessions found</h3> :
                            elem.schedules.map((cinema, index) => (
                                <CinemaSchedule key={index} cinema={cinema} />
                            ))
                        }</div>
                )
            })}
        </div>
    );
}
