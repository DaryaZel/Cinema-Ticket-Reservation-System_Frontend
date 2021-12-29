import './Schedule.css';
import { CinemaSchedule } from './CinemaSchedule';

export function Schedule() {
    const scheduleData = [
        {
            id: 55, cinemaName: "Cinema Name", cinemaAddress: "6388 Lacus Ct", movies: [
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '10:00' }, { time: '15:00' }, { time: '20:00' }
                    ]
                },
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '11:00' }, { time: '16:00' }, { time: '21:00' }
                    ]
                },
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '11:00' }, { time: '16:00' }, { time: '21:00' }
                    ]
                }
            ]
        },
        {
            id: 51, cinemaName: "Cinema Name", cinemaAddress: "6057 Vitae Rd", movies: [
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '10:00' }, { time: '15:00' }, { time: '20:00' }
                    ]
                },
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '11:00' }, { time: '16:00' }, { time: '21:00' }
                    ]
                }
            ]
        },
        {
            id: 54, cinemaName: "Cinema Name", cinemaAddress: "5435 Sollicitudin Ln", movies: [
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '10:00' }, { time: '15:00' }, { time: '20:00' }
                    ]
                },
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '11:00' }, { time: '16:00' }, { time: '21:00' }
                    ]
                }
            ]
        },
        {
            id: 91, cinemaName: "Cinema Name", cinemaAddress: "9375 Amet Ave", movies: [
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '10:00' }, { time: '15:00' }, { time: '20:00' }
                    ]
                },
                {
                    movieName: 'Movie Name', sessions: [
                        { time: '11:00' }, { time: '16:00' }, { time: '21:00' }
                    ]
                }
            ]
        }
    ];

    return (
        <div className='schedule'>
            <div className='schedule__date-container'>
                <h2>December 16 , Today, Thursday</h2>
            </div>
            {scheduleData.map((cinema) => (
                <CinemaSchedule cinema={cinema} />
            ))}
        </div>
    );
}
