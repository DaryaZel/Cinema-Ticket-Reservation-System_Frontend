import { FilterFormDate } from './FilterFormDate/FilterFormDate';
import { FilterFormCity } from './FilterFormCity/FilterFormCity';
import { FilterFormCinema } from './FilterFormCinema/FilterFormCinema';
import './FilterForms.css'
export function FilterForms() {
    return (
        <div className='filters'>
            <FilterFormDate />
            <FilterFormCity />
            <FilterFormCinema />
        </div>
    )
}
