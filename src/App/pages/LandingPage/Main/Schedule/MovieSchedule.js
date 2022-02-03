import { SessionTime } from './SessionTime'
import { Link } from 'react-router-dom';

export function MovieSchedule({ movie }) {
    return (
        <div className='movie-schedule'>
            <div className='movie-schedule__movie-container'>
                <h3>{movie.movieName}</h3>
            </div>
            <div className='movie-schedule__time-container'>
                {movie.sessions.map((session) => {
                    const sessionLink = '/reservation/' + session.id;
                    return (
                        <Link to={sessionLink}><SessionTime session={session} /></Link>
                    )
                })}
            </div>
        </div>
    );
}
