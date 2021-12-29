export function FilterFormDate() {
    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }
    return (
        <div className='filter-form'>
            <select className='filter-form__selector' name="select" >
                <option value="" disabled selected hidden>Date</option>
                {
                    <option value={formatDate(new Date())}>{formatDate(new Date())}</option>
                }
            </select>
        </div>
    );
}
