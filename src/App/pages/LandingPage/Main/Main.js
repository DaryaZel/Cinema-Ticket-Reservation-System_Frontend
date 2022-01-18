import { FilterForms } from '../../components/FilterForms/FilterForms';
import { Carousel } from './Carousel/Carousel';
import { Schedule } from './Schedule/Schedule';
import './Main.css';

export function Main() {
    return (
        <main className='main'>
            <div className='main__container'>
                <div className='main__filters'>
                    <FilterForms />
                </div>
                <div className='main__carousel'>
                    <Carousel />
                </div>
                <div className='main__schedule'>
                    <Schedule />
                </div>
            </div>
        </main>
    );
}
