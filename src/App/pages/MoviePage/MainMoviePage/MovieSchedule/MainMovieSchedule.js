import { useState, useEffect } from 'react';
import { handleResponse } from '../../../../utilities/ResponseHandler';
import { MainMovieCinemaSchedule } from './MainMovieCinemaSchedule';
import './MainMovieSchedule.css';

export function MainMovieSchedule({ city, cinema, day, movieId }) {
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
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/schedule/${movieId}?city=${city}&cinema=${cinema}&date=${day}`);
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
                            <h2>{formatDate(new Date(elem.day))}</h2>
                        </div>
                        {
                            elem.schedules.map((cinema) => (
                                <MainMovieCinemaSchedule cinema={cinema} />
                            ))
                        }</div>
                )
            })}
        </div>
    );
}
