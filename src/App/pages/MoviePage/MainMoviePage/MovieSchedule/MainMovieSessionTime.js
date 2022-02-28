export function MainMovieSessionTime({ session }) {
    const locale = "en-US";
    const formattingOptions = {
        hour: 'numeric', minute: 'numeric',
        hour12: false
    };

    return (
        <div className='movie-schedule__time-item'>
            <span>{new Intl.DateTimeFormat(locale, formattingOptions).format(new Date(session.date))}</span>
        </div>
    )
}

