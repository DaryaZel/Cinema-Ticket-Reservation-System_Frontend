import { SessionTime } from './SessionTime'

export function MovieSchedule({ movie }) {
    return (
        <div className='movie-schedule'>
            <div className='movie-schedule__movie-container'>
                <h3>{movie.movieName}</h3>
            </div>
            <div className='movie-schedule__time-container'>
                {movie.sessions.map((session) => (
                    <SessionTime session={session} />
                ))}
            </div>
        </div>
    );
}
