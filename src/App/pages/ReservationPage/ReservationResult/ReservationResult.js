import { Header } from '../../components/Header/Header';
import { SessionInformation } from '../../components/SessionInformation/SessionInformation';
import { TotalPrice } from '../TotalPrice';
import arrow_back from './images/back-button.png'
import './ReservationResult.css'

export function ReservationResult({ rowsOfSeats, sessionId, hiddenReservationResultWindow }) {
    debugger
    return (
        <div>
            <Header showSearchForm={false} />
            <h2 className='reservation-result__thanks'>Thank You for your Reservation!</h2>
            <div onClick={hiddenReservationResultWindow} className='reservation-result__back-button'>
                <div className='reservation-result__back-button-img'>
                    <img src={arrow_back} />
                </div>
                <h3>Back to cinema hall</h3></div>
            <div className='reservation-result_reservation-ticket reservation-ticket'>
                <div className='reservation-result__ticket-content'>
                    <div className='reservation-result__session-information'>
                        <SessionInformation sessionId={sessionId} />
                    </div>
                    {rowsOfSeats.map((row) => {
                        return (
                            row.map((seat) => {
                                if (seat.chosen) {
                                    return <h3>Seat: #{seat.seat_details.number} Row: #{seat.seat_details.rowNumber} .....  {seat.seat_details.price}$</h3>
                                }
                            })
                        )
                    })
                    }
                    <div className='reservation-result__total-price'>
                        <TotalPrice seats={rowsOfSeats ? rowsOfSeats.flat().filter((seat) => seat.chosen === true) : null} />
                    </div>
                </div>
            </div>
        </div>
    );
}
