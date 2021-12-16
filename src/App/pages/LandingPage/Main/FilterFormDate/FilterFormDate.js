export function FilterFormDate({ }) {
    return (
        <div className='filter-form'>
                <select className='filter-form__selector' name="select" >
                    {
                            <option value='15.12.2021'>Date</option>
                    }
                </select>
        </div>
    )
}