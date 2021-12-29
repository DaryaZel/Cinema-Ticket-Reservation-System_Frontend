
import { FilterFormCity } from './FilterFormCity/FilterFormCity';
import { FilterFormDate } from './FilterFormDate/FilterFormDate';
import { FilterFormCinema } from './FilterFormCinema/FilterFormCinema';
import { Carousel } from './Carousel/Carousel';
import { Schedule } from './Schedule/Schedule';
import './Main.css';

export function Main() {
    return (
        <main className='main'>
            <div className='main__container'>
                <div className='main__filters'>
                    <FilterFormDate />
                    <FilterFormCity />
                    <FilterFormCinema />
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
