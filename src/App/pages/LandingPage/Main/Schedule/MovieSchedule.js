import { SessionTime } from './SessionTime';
import { Link } from 'react-router-dom';

export function MovieSchedule({ movie }) {
    const movieLink = '/movie/' + movie.id;
    return (
        <div className='movie-schedule'>
            <div className='movie-schedule__movie-container'>
                <Link to={movieLink} className="link">
                    <h3>{movie.movieName}</h3>
                </Link>
            </div>
            <div className='movie-schedule__time-container'>
                {movie.sessions.map((session) => {
                    const sessionLink = '/reservation/' + session.id;
                    return (
                        <Link key={session.id} to={sessionLink} className="link"><SessionTime session={session} /></Link>
                    )
                })}
            </div>
        </div>
    );
}
