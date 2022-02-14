import { useState, useEffect } from 'react';
import { handleResponse } from '../../../utilities/ResponseHandler';
import './SessionInformation.css'

export function SessionInformation({ sessionId, changeSessionContentReady }) {
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
                        changeSessionContentReady(true);
                    }
                );
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {movieSession &&
                <div>
                    <h2>{movieSession[0].movieName}</h2>
                    <h2>{movieSession[0].cinemaName}</h2>
                    <h3>{(new Date(movieSession[0].date)).toLocaleDateString(locale, formattingOptions)}</h3>
                </div>
            }
        </div>
    )
}
