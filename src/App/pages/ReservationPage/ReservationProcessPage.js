import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { handleResponse } from '../../utilities/ResponseHandler';
import { ReservationResult } from './ReservationResult/ReservationResult';
import { ChooseSeats } from './ChooseSeats/ChooseSeats';
import './ReservationProcessPage.css';
import { PageLoader } from './PageLoader/PageLoader';

export function ReservationPage() {
    const params = useParams();
    const sessionId = params.id;
    const [contentReady, setContentReady] = useState(
        {
            availableseats: false,
            session: false,
            seattypes: false
        });
    const [rowsOfSeats, setRowsOfSeats] = useState(null);
    const [reserved, setReserved] = useState(false);
    let shouldDisplayContent = contentReady.availableseats && contentReady.seattypes && contentReady.session;


    function handleSessionSeatsUpdate(event) {
        try {
            const message = JSON.parse(event.data);
            const seats = message;
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
            setRowsOfSeats(rowsArray);
        }
        catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const ws = new WebSocket(`wss://cinematicketbooking.herokuapp.com/?movieSessionId=${sessionId}`);
        ws.onmessage = e => {
            handleSessionSeatsUpdate(e)
        };
        ws.onerror = e => {
            alert('WebSocket error')
        }
        return () => ws.close();
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
    const mapSeats = (seatData) => {
        let transformedSeat = {
            seat_details: seatData,
            chosen: false,
            loading: false
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
                let newRowsOfSeats = [...rowsOfSeats];
                newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].loading = true;
                setRowsOfSeats(newRowsOfSeats);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    () => {
                        let newRowsOfSeats = [...rowsOfSeats];
                        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].chosen = true;
                        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].loading = false;
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
                let newRowsOfSeats = [...rowsOfSeats];
                newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].loading = true;
                setRowsOfSeats(newRowsOfSeats);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    () => {
                        let newRowsOfSeats = [...rowsOfSeats];
                        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].chosen = false;
                        newRowsOfSeats[seat.seat_details.rowNumber - 1][seat.seat_details.number - 1].loading = false;
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
