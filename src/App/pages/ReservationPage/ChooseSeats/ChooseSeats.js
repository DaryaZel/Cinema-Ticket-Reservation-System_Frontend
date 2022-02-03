import { CinemaHall } from "./CinemaHall"

export function ChooseSeats({ rows, ticketsPriceSum, seatHandleClick, reservationHandleClick, selectedSeats }) {
    return (
        <div>
            <CinemaHall rows={rows}
                seatHandleClick={seatHandleClick}
                selectedSeats={selectedSeats} />
                <h3>Total price: {ticketsPriceSum}$</h3>
            <button type='submit' value='Reserve' onClick={reservationHandleClick}>Reserve</button>
        </div>
    )
}

