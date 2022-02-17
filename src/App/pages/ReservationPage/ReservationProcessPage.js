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

    const mapSeats = (seatData) => {
        let existing = localStorage.getItem('Selected Seats');
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
        else if (index !== -1 && seatData.isSelected === false) {
            removeFromLocalStorageArray('Selected Seats', seatData._id);
            transformedSeat = {
                seat_details: seatData,
                chosen: false,
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
                let newRowsOfSeats = null
                if (prevRowsOfSeats == null) {
                    newRowsOfSeats = handleInitialSeatsLoad(seats)
                } else {
                    newRowsOfSeats = handleSeatsUpdate(prevRowsOfSeats, seats)
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
                    updatedSeats[row][index].seat_details = seatDetailsToUpdate
                    let existing = localStorage.getItem('Selected Seats');
                    existing = existing ? existing.split(',') : [];
                    let indexOf = existing.indexOf(updatedSeats[row][index].seat_details._id);
                    if (indexOf !== -1 && updatedSeats[row][index].seat_details.isSelected === false) {
                        removeFromLocalStorageArray('Selected Seats', updatedSeats[row][index].seat_details._id);
                        updatedSeats[row][index].chosen = false;
                        alert(`Time is over for seat Number ${index + 1} Row ${row + 1}`)
                    }
                }
            }
        }
        return updatedSeats;
    }

    useEffect(() => {
        const ws = new WebSocket(`wss://cinematicketbooking.herokuapp.com/?movieSessionId=${sessionId}`);
        ws.onmessage = e => {
            handleSessionSeatsUpdate(e.data)
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
                        addToLocalStorageArray('Selected Seats', seat.seat_details._id);
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
                        removeFromLocalStorageArray('Selected Seats', seat.seat_details._id);
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
