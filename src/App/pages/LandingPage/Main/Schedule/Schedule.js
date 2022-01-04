import { useState, useEffect } from 'react';
import './Schedule.css';
import { CinemaSchedule } from './CinemaSchedule';

export function Schedule({ city, cinema, day }) {
    const [dateSchedule, setDateSchedule] = useState([]);

    function formatDate(date) {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = months[date.getMonth()];

        let dw = days[date.getDay()];

        return mm + ' ' + dd + ', ' + dw;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/schedule?city=${city}&cinema=${cinema}&date=${day}`);
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                const json = await response.json();
                setDateSchedule(json);
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
                            <h2>{formatDate(new Date(elem.day))}</h2>
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
