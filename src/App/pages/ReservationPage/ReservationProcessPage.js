import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { handleResponse } from '../../utilities/ResponseHandler';
import { ReservationResult } from './ReservationResult/ReservationResult';
import { ChooseSeats } from './ChooseSeats/ChooseSeats';
import './ReservationProcessPage.css';

export function ReservationPage() {
    const params = useParams();
    const sessionId = params.id;
    const [rows, setRows] = useState(null);
    const [ticketsPriceSum, setTicketsPriceSum] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reserved, setReserved] = useState(false);

    const mapSeats = (seatData) => {
        let transformedSeat = {
            seat_details: seatData,
            chosen: false
        }
        return transformedSeat;
    };

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
                        setRows(rowsArray);
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
                        setTicketsPriceSum((prevTicketsPriceSum) => prevTicketsPriceSum + seat.seat_details.price);

                        let newRows = [...rows];
                        newRows[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].chosen = true;
                        setSelectedSeats(newRows);
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
                        setTicketsPriceSum((prevTicketsPriceSum) => prevTicketsPriceSum - seat.seat_details.price);

                        let newRows = [...rows];
                        newRows[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].chosen = false;
                        setSelectedSeats(newRows);
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
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/availableseat/reserve`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(rows),
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
            {reserved ?
                <ReservationResult rows={rows} totalPrice={ticketsPriceSum} sessionId={sessionId} /> :
                <ChooseSeats
                    rows={rows}
                    ticketsPriceSum={ticketsPriceSum}
                    seatHandleClick={seatHandleClick}
                    reservationHandleClick={reservationHandleClick}
                />
            }
        </div>
    )
}
