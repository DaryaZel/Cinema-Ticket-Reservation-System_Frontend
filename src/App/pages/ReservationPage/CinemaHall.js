export function CinemaHall({ rows, ticketsPriceSum, seatHandleClick, reservationHandleClick, selectedSeats }) {
    const getClassNamesFor = (seat) => {
        let index = selectedSeats.indexOf(seat);
        if (seat.isReserved) {
            return 'row__seat seat seat_reserved';
        }
        return index == -1 ? `row__seat seat` : 'row__seat seat seat_selected';
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
            <h3>Total price: {ticketsPriceSum}$</h3>
            <button type='submit' value='Reserve' onClick={reservationHandleClick}>Reserve</button>
        </div>
    )
}
