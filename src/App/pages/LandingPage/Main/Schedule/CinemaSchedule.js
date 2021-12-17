import { MovieSchedule } from './MovieSchedule';

export function CinemaSchedule() {
    return (
        <div className='cinema-schedule'>
            <div className='cinema-schedule__cinema-name-container'>
                <h3>Cinema Name</h3>
                <h5>Cinema Address</h5>
            </div>
            <div className='cinema-schedule__movie-schedule-container'>
                <MovieSchedule />
                <MovieSchedule />
            </div>
        </div>
    )
}
