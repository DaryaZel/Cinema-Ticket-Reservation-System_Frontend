import { MainMovieSessionTime } from './MainMovieSessionTime';
import { Link } from 'react-router-dom';

export function MainMovieCinemaSchedule({ cinema }) {
    return (
        <div className='cinema-schedule'>
            <div className='cinema-schedule__cinema-name-container'>
                <h3>{cinema.cinemaName}</h3>
                <h5>{cinema.cinemaAddress}</h5>
            </div>
            <div className='cinema-schedule__time-container'>
                {cinema.sessions.map((session) => {
                    const sessionLink = '/reservation/' + session.id;
                    return (
                        <Link to={sessionLink} key={session.id} className="link"><MainMovieSessionTime session={session} /></Link>
                    )
                }
                )}
            </div>
        </div>
    );
}
