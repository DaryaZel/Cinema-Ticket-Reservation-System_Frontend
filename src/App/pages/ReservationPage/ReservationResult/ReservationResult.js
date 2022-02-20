import { Header } from '../../components/Header/Header';
import { SessionInformation } from '../../components/SessionInformation/SessionInformation';
import { TotalPrice } from '../TotalPrice';

export function ReservationResult({ rowsOfSeats, sessionId }) {
    return (
        <div>
            <Header showSearchForm={false} />
            <h2>Thank You for Reservation!</h2>
            <SessionInformation sessionId={sessionId} />
            {rowsOfSeats.map((row) => {
                return (
                    row.map((seat) => {
                        if (seat.chosen) {
                            return <h3>Seat: {seat.seat_details.number} Row: {seat.seat_details.rowNumber} .....  {seat.seat_details.price}$</h3>
                        }
                    })


                )
            })
            }
            <TotalPrice seats={rowsOfSeats ? rowsOfSeats.flat().filter((seat) => seat.chosen === true) : null} />
        </div>
    );
}
