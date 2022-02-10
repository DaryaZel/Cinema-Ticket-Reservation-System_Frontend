import { MainMovieSessionTime } from './MainMovieSessionTime'

export function MainMovieCinemaSchedule({ cinema }) {
    return (
        <div className='cinema-schedule'>
            <div className='cinema-schedule__cinema-name-container'>
                <h3>{cinema.cinemaName}</h3>
                <h5>{cinema.cinemaAddress}</h5>
            </div>
            <div className='cinema-schedule__time-container'>
                {cinema.sessions.map((session) => (
                    <MainMovieSessionTime session={session} />
                ))}
            </div>
        </div>
    );
}
