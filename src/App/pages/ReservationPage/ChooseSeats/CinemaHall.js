export function CinemaHall({ rows, seatHandleClick, selectedSeats }) {
    const getClassNamesFor = (seat) => {
        let index = selectedSeats.indexOf(seat);
        let basicClass = 'row__seat seat'
        if (seat.isReserved) {
            basicClass = basicClass + ' seat_reserved';
            return basicClass
        }
        return index == -1 ? basicClass : basicClass + ' seat_selected';
    }
    return (
        <div>
            <div><span>Screen</span></div>
            <div>
                {rows &&
                    rows.map((row, index) => {
                        return (<div className='row'>
                            <div>{index + 1}</div>
                            {row.map((seat) => {
                                return (<div className={getClassNamesFor(seat)} onClick={() => seatHandleClick(seat)}>
                                    <h4>{seat.number}</h4>
                                </div>)
                            })}
                        </div>)
                    })
                }
            </div>
        </div>
    )
}
