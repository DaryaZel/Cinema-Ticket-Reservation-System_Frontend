import { FilterFormDate } from './FilterFormDate/FilterFormDate';
import { FilterFormCity } from './FilterFormCity/FilterFormCity';
import { FilterFormCinema } from './FilterFormCinema/FilterFormCinema';
import './FilterForms.css';

export function FilterForms({ city, setCity, setCinema, setDay }) {
    return (
        <div className='filters'>
            <FilterFormDate changeSelectedDay={setDay} />
            <FilterFormCity changeSelectedCity={setCity} />
            <FilterFormCinema city={city} changeSelectedCinema={setCinema} />
        </div>
    )
}
