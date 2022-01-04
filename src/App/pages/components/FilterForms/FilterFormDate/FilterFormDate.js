export function FilterFormDate({ changeSelectedDay }) {
    const daysArray = [0, 1, 2, 3];
    const today = new Date();
    const nextDay = new Date();

    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    return (
        <div className='filter-form'>
            <select className='filter-form__selector' name="select" onChange={(e) => changeSelectedDay(e.target.value)}>
                <option value="Whole calender" selected>Date</option>
                {
                    daysArray.map((item) => {
                        nextDay.setDate(today.getDate() + item);

                        return (
                            <option value={nextDay.toLocaleDateString()}>{formatDate(nextDay)}</option>
                        )

                    }
                    )
                }
            </select>
        </div>
    );
}
