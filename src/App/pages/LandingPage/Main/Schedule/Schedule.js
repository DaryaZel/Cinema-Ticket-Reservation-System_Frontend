import './Schedule.css'
import {CinemaSchedule} from './CinemaSchedule'
export function Schedule() {
    return (
        <div className='schedule'>
            <div className='schedule__date-container'>
                <h2>December 16 , Today, Thursday</h2>
            </div>
            <CinemaSchedule/>
            <CinemaSchedule/>
            <CinemaSchedule/>
            <CinemaSchedule/>
            <CinemaSchedule/>
        </div>
    )
}