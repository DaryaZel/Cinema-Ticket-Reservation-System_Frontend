import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from "react-router-dom";
import { handleResponse } from '../../utilities/ResponseHandler';
import { ReservationResult } from './ReservationResult/ReservationResult';
import { ChooseSeats } from './ChooseSeats/ChooseSeats';
import './ReservationProcessPage.css';
import { PageLoader } from '../components/PageLoader/PageLoader';
import { UserContext } from '../../App';

export function ReservationPage() {
    const selectedSeatsStorageKey = 'Selected_Seats';
    const params = useParams();
    const sessionId = params.id;
    const { user } = useContext(UserContext);
    const [contentReady, setContentReady] = useState(
        {
            availableseats: false,
            session: false,
            seattypes: false
        });
    const [rowsOfSeats, setRowsOfSeats] = useState(null);
    const [reserved, setReserved] = useState(false);
    let shouldDisplayContent = contentReady.availableseats && contentReady.seattypes && contentReady.session;
    const ws = useRef(null);

    const mapSeats = (seatData) => {
        let existing = localStorage.getItem(selectedSeatsStorageKey);
        existing = existing ? existing.split(',') : [];
        let index = existing.indexOf(seatData._id);
        let transformedSeat = null;
        if (index !== -1 && seatData.isSelected === true) {
            transformedSeat = {
                seat_details: seatData,
                chosen: true,
                loading: false
            }
        }
        else {
            transformedSeat = {
                seat_details: seatData,
                chosen: false,
                loading: false
            }
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

    function handleSessionSeatsUpdate(data) {
        try {
            const seats = JSON.parse(data);

            setRowsOfSeats(prevRowsOfSeats => {
                let newRowsOfSeats = null;
                if (prevRowsOfSeats == null) {
                    newRowsOfSeats = handleInitialSeatsLoad(seats);
                } else {
                    newRowsOfSeats = handleSeatsUpdate(prevRowsOfSeats, seats);
                }
                return newRowsOfSeats;
            })
        }
        catch (error) {
            alert(error)
        }
    }

    function handleInitialSeatsLoad(seats) {
        let transformedSeats = seats.map(mapSeats);
        let { rowNumber } = seats.reduce((acc, curr) => acc.rowNumber > curr.rowNumber ? acc : curr);
        let rowsArray = [];
        for (let i = 0; i < rowNumber; i++) {
            rowsArray.push(new Array());
        }
        for (let i = 0; i < transformedSeats.length; i++) {
            rowsArray[transformedSeats[i].seat_details.rowNumber - 1].push(transformedSeats[i]);
        }
        changeAvailableSeatContentReady(true);

        return rowsArray;
    }

    function handleSeatsUpdate(prevRowsOfSeats, seats) {
        let updatedSeats = [...prevRowsOfSeats]
        for (let row = 0; row < updatedSeats.length; row++) {
            for (let index = 0; index < updatedSeats[row].length; index++) {
                let seatDetailsToUpdate = seats.find(seat => seat._id == updatedSeats[row][index].seat_details._id)
                if (seatDetailsToUpdate) {
                    updatedSeats[row][index].seat_details = seatDetailsToUpdate;
                }
            }
        }
        return updatedSeats;
    }

    useEffect(() => {
        ws.current = new WebSocket(`wss://cinematicketbooking.herokuapp.com/?movieSessionId=${sessionId}`);
        ws.current.onmessage = e => {
            handleSessionSeatsUpdate(e.data);
        };
        ws.current.onerror = e => {
            alert('WebSocket error');
        }
        return () => ws.current.close();
    }, []);

    const changeAvailableSeatContentReady = (state) => {
        setContentReady((prevContentReady) => ({
            ...prevContentReady,
            availableseats: state
        }));
    }
    const changeSessionContentReady = (state) => {
        setContentReady((prevContentReady) => ({
            ...prevContentReady,
            session: state
        }));
    }
    const changeSeatTypesContentReady = (state) => {
        setContentReady((prevContentReady) => ({
            ...prevContentReady,
            seattypes: state
        }));
    }

    let addToLocalStorageArray = function (name, value) {

        let existing = localStorage.getItem(name);
        existing = existing ? existing.split(',') : [];
        existing.push(value);
        localStorage.setItem(name, existing.toString());

    };
    let removeFromLocalStorageArray = function (name, value) {

        let existing = localStorage.getItem(name);
        existing = existing ? existing.split(',') : [];
        let index = existing.indexOf(value);
        if (index !== -1) {
            existing.splice(index, 1);
        }
        localStorage.setItem(name, existing.toString());

    };
    const addSeatCallback = (seat) => {
        const seatDetailsObject = {
            event: 'makeSeatSelectedTrue',
            seat: seat.seat_details
        };
        ws.current.send(JSON.stringify(seatDetailsObject));
        let newRowsOfSeats = [...rowsOfSeats];
        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].chosen = true;
        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].loading = false;
        addToLocalStorageArray(selectedSeatsStorageKey, seat.seat_details._id);
        setRowsOfSeats(newRowsOfSeats);
    };

    const removeSeatCallback = (seat) => {
        const seatDetailsObject = {
            event: 'makeSeatSelectedFalse',
            seat: seat.seat_details
        };
        ws.current.send(JSON.stringify(seatDetailsObject));
        let newRowsOfSeats = [...rowsOfSeats];
        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].chosen = false;
        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].loading = false;
        removeFromLocalStorageArray(selectedSeatsStorageKey, seat.seat_details._id);
        setRowsOfSeats(newRowsOfSeats);
    };

    const reservationHandleClick = () => {
        const mapSeats = (seatData) => {
            const transformedSeat = {
                session_id: seatData.seat_details.session_id,
                availableSeat_id: seatData.seat_details._id,
                availableSeat_row: seatData.seat_details.rowNumber,
                availableSeat_number: seatData.seat_details.number,
                availableSeat_price: seatData.seat_details.price
            }
            return transformedSeat;
        }
        let transformedSeats = rowsOfSeats.flat().filter((seat) => seat.chosen === true).map(mapSeats);
        let reservationInfo = {
            userId: user._id,
            sessionId: sessionId,
            seatsArray: transformedSeats
        }
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/reservation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservationInfo),
                });
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    () => {
                        let reservedSeats = rowsOfSeats.flat().filter((seat) => seat.chosen === true)
                        let transformedReservedSeats = reservedSeats.map(mapReservedSeats)
                        const seatDetailsObject = {
                            event: 'reserveSeat',
                            seat: transformedReservedSeats
                        };
                        ws.current.send(JSON.stringify(seatDetailsObject));
                        localStorage.removeItem(selectedSeatsStorageKey);
                        setReserved(true);
                    }
                );
            } catch (error) {
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
            {shouldDisplayContent ? null : <PageLoader />}
            <div>
                {reserved ?
                    <ReservationResult rowsOfSeats={rowsOfSeats} sessionId={sessionId} /> :
                    <ChooseSeats
                        rowsOfSeats={rowsOfSeats}
                        seatHandleClick={seatHandleClick}
                        reservationHandleClick={reservationHandleClick}
                        sessionId={sessionId}
                        shouldDisplayContent={shouldDisplayContent}
                        changeSessionContentReady={changeSessionContentReady}
                        changeSeatTypesContentReady={changeSeatTypesContentReady}
                    />}
            </div>
        </div>
    )
}
