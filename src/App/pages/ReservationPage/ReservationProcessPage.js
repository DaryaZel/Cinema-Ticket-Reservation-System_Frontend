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
                        let { rowNumber } = seats.reduce((acc, curr) => acc.rowNumber > curr.rowNumber ? acc : curr);
                        let rowsArray = [];
                        for (let i = 0; i < rowNumber; i++) {
                            rowsArray.push(new Array());
                        }
                        for (let i = 0; i < seats.length; i++) {
                            seats[i].id = seats[i]._id.toString();
                            rowsArray[seats[i].rowNumber - 1].push(seats[i]);
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
    const addSeatCallback = (row, number) => {
        let isSelectedSeat = rows[row - 1][number - 1];
        async function fetchData() {
            try {
                debugger
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/availableseat/addSelect`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(isSelectedSeat),
                });
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    () => {
                        setTicketsPriceSum((prevTicketsPriceSum) => prevTicketsPriceSum + rows[row - 1][number - 1].price);
                        let newSelectedSeats = [...selectedSeats];
                        newSelectedSeats.push(isSelectedSeat);
                        setSelectedSeats(newSelectedSeats);
                    }
                );
            }
            catch (error) {
                alert(error);
            }
        }
        fetchData()
    }

    const removeSeatCallback = (row, number) => {
        let isSelectedSeat = rows[row - 1][number - 1];
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/availableseat/removeSelect`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(isSelectedSeat),
                });
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    () => {
                        setTicketsPriceSum((prevTicketsPriceSum) => prevTicketsPriceSum - rows[row - 1][number - 1].price);
                        let newSelectedSeats = [...selectedSeats];
                        newSelectedSeats.splice(newSelectedSeats.indexOf(isSelectedSeat), 1);
                        setSelectedSeats(newSelectedSeats);
                    }
                );
            }
            catch (error) {
                alert(error);
            }
        }
        fetchData();
    }
    const reservationHandleClick = () => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/availableseat/reserve`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedSeats),
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
    }
    const seatHandleClick = (seat) => {
        let index = selectedSeats.indexOf(seat);
        index != -1 ? removeSeatCallback(seat.rowNumber, seat.number) : addSeatCallback(seat.rowNumber, seat.number);
    }
    return (
        <div className='reservation-page__container'>
            {reserved ?
                <ReservationResult reservedSeats={selectedSeats} totalPrice={ticketsPriceSum} sessionId={sessionId} /> :
                <ChooseSeats rows={rows}
                    ticketsPriceSum={ticketsPriceSum}
                    seatHandleClick={seatHandleClick}
                    reservationHandleClick={reservationHandleClick}
                    selectedSeats={selectedSeats} />
            }
        </div>
    )
}
