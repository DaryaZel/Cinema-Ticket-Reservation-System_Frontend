export function SessionTime({ session }) {
    return (
        <div className='cinema-schedule__time-item'>
            <a href='#'><span>{session.time}</span></a>
        </div>
    )

}
