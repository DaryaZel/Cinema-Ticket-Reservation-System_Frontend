import { useState, useEffect } from "react";
import { handleResponse } from '../../../utilities/ResponseHandler';
import './ChooseSeats.css';

export function SeatTypes({ sessionId, changeSeatTypesContentReady, shouldDisplayContent }) {
    const [seatTypes, setSeatTypes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/sessionsprices/?movieSessionId=${sessionId}`);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setSeatTypes(result);
                        changeSeatTypesContentReady(true);
                    }
                );
            }
            catch (error) {
                alert("Oops, something went wrong");
            }
        }
        fetchData()
    }, [])
    const getClassNamesFor = (seat) => {
        let basicClass = 'seat';
        if (seat.seatType === 'Love Seat') {
            basicClass = 'seat-LoveSeat';
        }
        return basicClass
    }
    return (
        <div className="legend">
            {shouldDisplayContent && <h2 className="legend__title">Seat Types</h2>}
            <div className="legend__seatTypes-container">
                {seatTypes.map((seat) => {
                    return (
                        <div key={seat._id} className="legend__seatType seatType">
                            <div className="seatType__example">
                                <div className={getClassNamesFor(seat)}>
                                </div>
                            </div>
                            <div className="seatType__information">
                                <div className="seatType__title">
                                    <h3>{seat.seatType}</h3> <h3>{seat.price}$</h3>
                                </div>
                                <div className="seatType__description">
                                    {seat.description}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="legend__seat-navigation">
                    <div className="legend__seat-navigation-example">
                        <div className='seat seat_selected'>
                        </div>
                        <span>seat is selected</span>
                    </div>
                    <div className="legend__seat-navigation-example">
                        <div className='seat seat_already-selected'>
                        </div>
                        <span>this seat is already selected by another user(try again in 5 min)</span>
                    </div>
                    <div className="legend__seat-navigation-example">
                        <div className='seat seat_reserved'>
                        </div>
                        <span>seat is reserved</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
