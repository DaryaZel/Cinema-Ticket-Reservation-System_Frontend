import { TotalPrice } from "../TotalPrice"
import { CinemaHall } from "./CinemaHall"

export function ChooseSeats({ rowsOfSeats, seatHandleClick, reservationHandleClick }) {
    return (
        <div>
            <CinemaHall
                rowsOfSeats={rowsOfSeats}
                seatHandleClick={seatHandleClick}
            />
            <TotalPrice seats={rowsOfSeats ? rowsOfSeats.flat().filter((seat) => seat.chosen === true) : null} />
            <button type='submit' value='Reserve' onClick={reservationHandleClick}>Reserve</button>
        </div>
    )
}

