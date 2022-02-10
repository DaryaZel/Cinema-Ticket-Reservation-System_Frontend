import { FilterContext } from '../LandingPage';
import { FilterForms } from '../../components/FilterForms/FilterForms';
import { Carousel } from './Carousel/Carousel';
import { Schedule } from './Schedule/Schedule';
import './Main.css';
import { useContext } from 'react';

export function Main() {
    const { city, setCity, cinema, setCinema, day, setDay } = useContext(FilterContext);

    return (
        <main className='main'>
            <div className='main__container'>
                <div className='main__filters'>
                    <FilterForms
                        city={city}
                        changeSelectedCity={setCity}
                        changeSelectedCinema={setCinema}
                        changeSelectedDay={setDay}
                    />
                </div>
                <div className='main__carousel'>
                    <Carousel />
                </div>
                <div className='main__schedule'>
                    <Schedule
                        city={city}
                        cinema={cinema}
                        day={day}
                    />
                </div>
            </div>
        </main>
    );
}
