import { useState } from 'react';
import { FilterForms } from '../../components/FilterForms/FilterForms';
import { Carousel } from './Carousel/Carousel';
import { Schedule } from './Schedule/Schedule';
import './Main.css';

export function Main() {
    const [city, setCity] = useState('Minsk');
    const [cinema, setCinema] = useState('All cinemas');
    const [day, setDay] = useState('Whole calender');

    return (
        <main className='main'>
            <div className='main__container'>
                <div className='main__filters'>
                    <FilterForms
                        city={city}
                        setCity={setCity}
                        setCinema={setCinema}
                        setDay={setDay}
                    />
                </div>
                <div className='main__carousel'>
                    <Carousel />
                </div>
                <div className='main__schedule'>
                    <Schedule city={city} cinema={cinema} day={day} />
                </div>
            </div>
        </main>
    );
}
