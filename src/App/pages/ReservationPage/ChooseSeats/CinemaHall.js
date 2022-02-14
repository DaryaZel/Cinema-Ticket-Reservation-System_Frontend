import { SeatLoader } from "../SeatLoader/SeatLoader";

export function CinemaHall({ rowsOfSeats, seatHandleClick, shouldDisplayContent }) {
    const getClassNamesFor = (seat) => {
        let basicClass = 'row__seat seat';
        if(seat.seat_details.type==='Love Seat'){
            basicClass = 'row__seat seat-LoveSeat';
        }
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
            {shouldDisplayContent&&<h2 className='cinemahall__screen'>Screen</h2>}
            <div className='cinemahall__rows-container'>
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
