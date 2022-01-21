import React, { useDebugValue } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SeatPicker from 'react-seat-picker';
import './CinemaHallPage.css';
import { ReservedSeatsPage } from './ReservedSeatsPage';

export function CinemaHallPage() {
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
                debugger
                const json = await response.json();
                const { foundCinemaHall, seats } = json;
                let rowsArray = [];
                for (let i = 0; i < foundCinemaHall.rows; i++) {
                    rowsArray.push(new Array())
                }
                for (let i = 0; i < seats.length; i++) {
                    seats[i].id = seats[i]._id.toString()
                    rowsArray[seats[i].rowNumber - 1].push(seats[i])
                }
                setRows(rowsArray);
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, []);
    const addSeatCallback = ({ row, number, id }, addCb) => {
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
                    alert(json)
                }
                else {
                    addCb(row, number, id);
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

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
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
                    alert(json)
                }
                else {
                    removeCb(row, number)
                    setTicketsPriceSum(ticketsPriceSum - rows[row - 1][number - 1].price)
                    let newSelectedSeats = [...selectedSeats];
                    newSelectedSeats.slice(newSelectedSeats.indexOf(isSelectedSeat), 1)
                    setSelectedSeats(newSelectedSeats);
                }
            }
            catch (error) {
                alert(error);
            }
        }
        fetchData()
    }
    const handleClick = () => {
        async function fetchData() {
            console.log(selectedSeats)
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
                    alert(json)
                }
                else {
                    setReserved(true)
                }
            }
            catch (error) {
                alert(error);
            }
        }
        fetchData()
    }

    // const rows = [
    //     [{ id: 1, number: 1, isSelected: true }, { id: 2, number: 2, tooltip: 'Cost: 15$' }, { id: 3, number: '3', isReserved: true, tooltip: 'Reserved by Rogger' }, { id: 4, number: '4' }, { id: 5, number: 5 }, { id: 6, number: 6 }],
    //     [{ id: 7, number: 1, isReserved: true }, { id: 8, number: 2, isReserved: true }, { id: 9, number: '3', isReserved: true }, { id: 10, number: '4' }, { id: 11, number: 5 }, { id: 12, number: 6 }],
    //     [{ id: 13, number: 1 }, { id: 14, number: 2 }, { id: 15, number: 3, isReserved: true }, { id: 16, number: '4' }, { id: 17, number: 5 }, { id: 18, number: 6 }],
    //     [{ id: 19, number: 1, tooltip: 'Cost: 25$' }, { id: 20, number: 2 }, { id: 21, number: 3 }, { id: 22, number: '4' }, { id: 23, number: 5 }, { id: 24, number: 6 }],
    //     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2 }, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4' }, { id: 29, number: 5, tooltip: 'Cost: 11$' }]
    // ]
    return (
        <div>
            {reserved ?
                <ReservedSeatsPage reservedSeats={selectedSeats} totalPrice={ticketsPriceSum} sessionId={sessionId} /> :
                <div>
                    <h2>Seat Picker</h2>
                    <div>
                        {rows &&
                            <SeatPicker
                                addSeatCallback={addSeatCallback}
                                removeSeatCallback={removeSeatCallback}
                                rows={rows}
                                maxReservableSeats={10}
                                visible
                                tooltipProps={{ multiline: true }}
                            />
                        }
                    </div>
                    <h3>Total price: {ticketsPriceSum}$</h3>
                    <button type='submit' value='Reserve' onClick={handleClick}>Reserve</button>
                </div>}
        </div>
    )
}
