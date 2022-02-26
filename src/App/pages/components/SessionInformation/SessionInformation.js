import { useState, useEffect } from 'react';
import { handleResponse } from '../../../utilities/ResponseHandler';
import './SessionInformation.css'
import location from './images/location.png';
import timetable from './images/timetable.png';

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
                        if (changeSessionContentReady) {
                            changeSessionContentReady(true);
                        }

                    }
                );
            } catch (error) {
                alert("Oops, something went wrong");
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {movieSession &&
                <div className='session-information'>
                    <div className='session-information__poster-img'>
                        <img src={movieSession[0].posterImg_link} />
                    </div>
                    <div className='session-information__content-container'>
                        <h2 className='session-information__thanks'>{movieSession[0].movieName}</h2>
                        <div className='session-information__place'>
                            <img src={location}/>
                            <h3>{movieSession[0].cinemaName}</h3>
                            </div>
                        <div className='session-information__date'>
                        <img src={timetable}/>
                            <h3>{(new Date(movieSession[0].date)).toLocaleDateString(locale, formattingOptions)}</h3>
                            </div>
                    </div>
                </div>
            }
        </div>
    )
}
