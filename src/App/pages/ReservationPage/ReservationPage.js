import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './ReservationPage.css';
import { ReservedSeatsPage } from './ConfirmReservationPage';
import { CinemaHall } from './CinemaHall';

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
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/hall/${sessionId}`);
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                const json = await response.json();
                const { foundCinemaHall, seats } = json;
                let rowsArray = [];
                for (let i = 0; i < foundCinemaHall.rows; i++) {
                    rowsArray.push(new Array());
                }
                for (let i = 0; i < seats.length; i++) {
                    seats[i].id = seats[i]._id.toString();
                    rowsArray[seats[i].rowNumber - 1].push(seats[i]);
                }
                setRows(rowsArray);
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
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/seat/addSelect`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(isSelectedSeat),
                });
                const json = await response.json();
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                else if (response.status >= 400 && response.status < 500) {
                    alert(json);
                }
                else {
                    setTicketsPriceSum(ticketsPriceSum + rows[row - 1][number - 1].price);
                    let newSelectedSeats = [...selectedSeats];
                    newSelectedSeats.push(isSelectedSeat)
                    setSelectedSeats(newSelectedSeats);
                }
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
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/seat/removeSelect`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(isSelectedSeat),
                });
                const json = await response.json();
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                else if (response.status >= 400 && response.status < 500) {
                    alert(json);
                }
                else {
                    setTicketsPriceSum(ticketsPriceSum - rows[row - 1][number - 1].price);
                    let newSelectedSeats = [...selectedSeats];
                    newSelectedSeats.splice(newSelectedSeats.indexOf(isSelectedSeat), 1);
                    setSelectedSeats(newSelectedSeats);
                }
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
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/seat/reserve`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedSeats),
                });
                const json = await response.json();
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                else if (response.status >= 400 && response.status < 500) {
                    alert(json);
                }
                else {
                    setReserved(true);
                }
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
                <ReservedSeatsPage reservedSeats={selectedSeats} totalPrice={ticketsPriceSum} sessionId={sessionId} /> :
                <CinemaHall rows={rows} ticketsPriceSum={ticketsPriceSum} seatHandleClick={seatHandleClick} reservationHandleClick={reservationHandleClick} selectedSeats={selectedSeats} />
            }
        </div>
    )
}
