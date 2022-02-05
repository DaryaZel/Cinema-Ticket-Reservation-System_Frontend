import { useState, useEffect } from 'react';
import { handleResponse } from '../../../utilities/ResponseHandler';
import { TotalPrice } from '../TotalPrice';

export function ReservationResult({ rowsOfSeats, sessionId }) {
    const [movieSession, setMovieSession] = useState(null);
    const locale = "en-US";
    const formattingOptions = {
        month: 'long', day: 'numeric', weekday: 'long',
        hour: 'numeric', minute: 'numeric',
        hour12: false
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/session/${sessionId}`);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setMovieSession(result);
                    }
                );
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, []);

    return (<div>
        {movieSession &&
            <div>
                <h2>Thank You for Reservation!</h2>
                <h2>{movieSession[0].movieName}</h2>
                <h2>{movieSession[0].cinemaName}</h2>
                <h2>{(new Date(movieSession[0].date)).toLocaleDateString(locale, formattingOptions)}</h2>
                {rowsOfSeats.map((row) => {
                    return (
                        row.map((seat) => {
                            if (seat.chosen) {
                                return <h3>Seat: {seat.seat_details.number} Row: {seat.seat_details.rowNumber} .....  {seat.seat_details.price}$</h3>
                            }
                        })


                    )
                })
                }
                <TotalPrice seats={rowsOfSeats ? rowsOfSeats.flat().filter((seat) => seat.chosen === true) : null} />
            </div>
        }
    </div>
    );
}
