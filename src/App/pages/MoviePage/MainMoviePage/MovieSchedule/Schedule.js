import { CinemaSchedule } from './CinemaSchedule';
import './Schedule.css';

export function Schedule() {
    const scheduleData = [
        {
            id: 55, cinemaName: "Cinema Name", cinemaAddress: "6388 Lacus Ct", sessions: [
                { time: '10:00' }, { time: '15:00' }, { time: '20:00' }
            ]
        },
        {
            id: 51, cinemaName: "Cinema Name", cinemaAddress: "6057 Vitae Rd", sessions: [
                { time: '10:00' }, { time: '15:00' }, { time: '20:00' }
            ]
        },
        {
            id: 54, cinemaName: "Cinema Name", cinemaAddress: "5435 Sollicitudin Ln", sessions: [
                { time: '10:00' }, { time: '15:00' }, { time: '20:00' }
            ]
        },
        {
            id: 91, cinemaName: "Cinema Name", cinemaAddress: "9375 Amet Ave", sessions: [
                { time: '10:00' }, { time: '15:00' }, { time: '20:00' }
            ]
        }
    ];

    return (
        <div id='schedule' className='schedule'>
            <div className='schedule__date-container'>
                <h3>December 16 , Today, Thursday</h3>
            </div>
            {scheduleData.map((cinema) => (
                <CinemaSchedule cinema={cinema} />
            ))}
        </div>
    );
}
