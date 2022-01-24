export function SessionTime({ session }) {
    const locale = "en-US";
    const formattingOptions = {
        hour: 'numeric', minute: 'numeric',
        hour12: false
    };

    return (
        <div className='movie-schedule__time-item'>
            <a href='#'><span>{new Intl.DateTimeFormat(locale, formattingOptions).format(new Date(session.date))}</span></a>
        </div>
    )

}
