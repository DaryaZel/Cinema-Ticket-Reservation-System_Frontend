import { TotalPrice } from "../TotalPrice"
import { CinemaHall } from "./CinemaHall"

export function ChooseSeats({ rows, seatHandleClick, reservationHandleClick }) {
    return (
        <div>
            <CinemaHall
                rows={rows}
                seatHandleClick={seatHandleClick}
            />
            <TotalPrice rows={rows} />
            <button type='submit' value='Reserve' onClick={reservationHandleClick}>Reserve</button>
        </div>
    )
}

