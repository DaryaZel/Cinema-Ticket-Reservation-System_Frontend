import { SessionTime } from './SessionTime'

export function CinemaSchedule({ cinema }) {
    return (
        <div className='cinema-schedule'>
            <div className='cinema-schedule__cinema-name-container'>
                <h3>{cinema.cinemaName}</h3>
                <h5>{cinema.cinemaAddress}</h5>
            </div>
            <div className='cinema-schedule__time-container'>
                {cinema.sessions.map((session) => (
                    <SessionTime session={session} />
                ))}
            </div>
        </div>
    );
}
