import { SeatLoader } from "../SeatLoader/SeatLoader";

export function CinemaHall({ rowsOfSeats, seatHandleClick }) {
    const getClassNamesFor = (seat) => {
        let basicClass = 'row__seat seat'
        if (seat.seat_details.isReserved) {
            basicClass = basicClass + ' seat_reserved';
            return basicClass
        }
        if (seat.seat_details.isSelected === true && seat.chosen === false) {
            basicClass = basicClass + ' seat_already-selected';
            return basicClass
        }
        return seat.chosen === false ? basicClass : basicClass + ' seat_selected';
    }
    return (
        <div>
            <div><span>Screen</span></div>
            <div>
                {rowsOfSeats &&
                    rowsOfSeats.map((row, index) => {
                        return (<div className='row'>
                            <div>{index + 1}</div>
                            {row.map((seat) => {
                                return (
                                    <div className={getClassNamesFor(seat)} onClick={() => seatHandleClick(seat)}>{
                                        (seat.loading ?
                                            <SeatLoader /> :
                                            <h4>{seat.seat_details.number}</h4>)
                                    }
                                    </div>)
                            })}
                        </div>)
                    })
                }
            </div>
        </div>
    )
}
