import { MovieSchedule } from './MovieSchedule';

export function CinemaSchedule({ cinema }) {
    return (
        <div className='cinema-schedule'>
            <div className='cinema-schedule__cinema-name-container'>
                <h3>{cinema.cinemaName}</h3>
                <h5>{cinema.cinemaAddress}</h5>
            </div>
            <div className='cinema-schedule__movie-schedule-container'>
                {cinema.movies.map((movie, index) => (
                    <MovieSchedule key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
}
