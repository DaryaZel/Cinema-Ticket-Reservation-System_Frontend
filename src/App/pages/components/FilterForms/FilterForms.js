import { FilterFormDate } from './FilterFormDate/FilterFormDate';
import { FilterFormCity } from './FilterFormCity/FilterFormCity';
import { FilterFormCinema } from './FilterFormCinema/FilterFormCinema';
import './FilterForms.css';

export function FilterForms({ city, changeSelectedCity, changeSelectedDay, changeSelectedCinema }) {
    return (
        <div className='filters'>
            <FilterFormDate changeSelectedDay={changeSelectedDay} />
            <FilterFormCity changeSelectedCity={changeSelectedCity} />
            <FilterFormCinema city={city} changeSelectedCinema={changeSelectedCinema} />
        </div>
    )
}
