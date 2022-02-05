import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { handleResponse } from '../../utilities/ResponseHandler';
import { ReservationResult } from './ReservationResult/ReservationResult';
import { ChooseSeats } from './ChooseSeats/ChooseSeats';
import './ReservationProcessPage.css';
import { Loader } from './Loader/Loader';

export function ReservationPage() {
    const params = useParams();
    const sessionId = params.id;
    const [loading, setLoading] = useState(true);
    const [rowsOfSeats, setRowsOfSeats] = useState(null);
    const [reserved, setReserved] = useState(false);

    const mapSeats = (seatData) => {
        let transformedSeat = {
            seat_details: seatData,
            chosen: false
        }
        return transformedSeat;
    };
    const mapReservedSeats = (seat) => {
        let transformedReservedSeats = {
            session_id: seat.seat_details.session_id,
            seat_id: seat.seat_details.seat_id
        }
        return transformedReservedSeats;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/availableseat/?movieSessionId=${sessionId}`);

                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        const seats = result;
                        let transformedSeats = seats.map(mapSeats);
                        let { rowNumber } = seats.reduce((acc, curr) => acc.rowNumber > curr.rowNumber ? acc : curr);
                        let rowsArray = [];
                        for (let i = 0; i < rowNumber; i++) {
                            rowsArray.push(new Array());
                        }
                        for (let i = 0; i < transformedSeats.length; i++) {
                            rowsArray[transformedSeats[i].seat_details.rowNumber - 1].push(transformedSeats[i]);
                        }
                        setLoading(false);
                        setRowsOfSeats(rowsArray);
                    }
                );
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, []);

    const addSeatCallback = (seat) => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/availableseat/addSelect`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(seat.seat_details),
                });
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    () => {
                        let newRowsOfSeats = [...rowsOfSeats];
                        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].chosen = true;
                        setRowsOfSeats(newRowsOfSeats);
                    }
                );
            }
            catch (error) {
                alert(error);
            }
        }
        fetchData()
    };

    const removeSeatCallback = (seat) => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/availableseat/removeSelect`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(seat.seat_details),
                });
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    () => {
                        let newRowsOfSeats = [...rowsOfSeats];
                        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].chosen = false;
                        setRowsOfSeats(newRowsOfSeats);
                    }
                );
            }
            catch (error) {
                alert(error);
            }
        }
        fetchData();
    };

    const reservationHandleClick = () => {
        let reservedSeats = rowsOfSeats.flat().filter((seat) => seat.chosen === true)
        let transformedReservedSeats = reservedSeats.map(mapReservedSeats)
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/availableseat/reserve`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(transformedReservedSeats),
                });
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    () => {
                        setReserved(true);
                    })
            }
            catch (error) {
                alert(error);
            }
        }
        fetchData();
    };

    const seatHandleClick = (seat) => {
        seat.chosen === true ? removeSeatCallback(seat) : addSeatCallback(seat);
    };

    return (
        <div className='reservation-page__container'>
            {loading ? <Loader /> :
                <div>
                    {reserved ?
                        <ReservationResult rowsOfSeats={rowsOfSeats} sessionId={sessionId} /> :
                        <ChooseSeats
                            rowsOfSeats={rowsOfSeats}
                            seatHandleClick={seatHandleClick}
                            reservationHandleClick={reservationHandleClick}
                        />}
                </div>
            }
        </div>
    )
}
