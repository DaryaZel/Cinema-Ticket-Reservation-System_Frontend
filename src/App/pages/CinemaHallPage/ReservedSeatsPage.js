import { useState, useEffect } from 'react';
export function ReservedSeatsPage({ reservedSeats, totalPrice, sessionId }) {
    const [movieSession, setMovieSession] = useState(null);
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

        let mth = months[date.getMonth()];

        let dw = days[date.getDay()];
        
        let hh = date.getHours();
        if (hh < 10) hh = '0' + hh;

        let mm = date.getMinutes();
        if (mm < 10) mm = '0' + mm;
        return `${mth} ${dd}, ${dw} ${hh}:${mm}`;
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/session/${sessionId}`);
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                const json = await response.json();
                debugger
                setMovieSession(json);
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, []);
    return (<div>
        {movieSession &&
            <div>
                <h2>Thank You for Reservation!</h2>
                <h2>{movieSession[0].movieName}</h2>
                <h2>{movieSession[0].cinemaName}</h2>
                <h2>{formatDate(new Date(movieSession[0].date))}</h2>
                {
                    reservedSeats.map((seat) => {
                        return (
                            <h3>Seat: {seat.number} Row: {seat.rowNumber} .....  {seat.price}$</h3>
                        )

                    })
                }
                <h2>Total price: {totalPrice}$</h2>
            </div>
        }
    </div>
    )
}
