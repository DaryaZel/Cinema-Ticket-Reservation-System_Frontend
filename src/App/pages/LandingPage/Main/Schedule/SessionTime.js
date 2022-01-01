export function SessionTime({ session }) {
    function formatDate(date) {
        let dateObject = new Date(date);
        let hh = dateObject.getHours();
        if (hh < 10) hh = '0' + hh;

        let mm = dateObject.getMinutes() + 1;
        if (mm < 10) mm = '0' + mm;

        return hh + ':' + mm;
    }

    return (
        <div className='movie-schedule__time-item'>
            <a href='#'><span>{formatDate(session.date)}</span></a>
        </div>
    )

}
