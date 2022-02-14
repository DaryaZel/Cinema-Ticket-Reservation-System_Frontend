import { useState, useEffect } from "react";
import { handleResponse } from '../../../utilities/ResponseHandler';
import './ChooseSeats.css';

export function SeatTypes({ sessionId, changeSeatTypesContentReady, shouldDisplayContent }) {
    const [seatTypes, setSeatTypes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/seatTypes/?movieSessionId=${sessionId}`);
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
                alert(error);
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
            {shouldDisplayContent&&<h2 className="legend__title">Seat Types</h2>}
            <div className="legend__seatTypes-container">
                {seatTypes.map((seat) => {
                    return (
                        <div className="legend__seatType seatType">
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
            </div>
        </div>
    )
}
