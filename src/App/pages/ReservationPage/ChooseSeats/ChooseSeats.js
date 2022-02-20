import { SessionInformation } from "../../components/SessionInformation/SessionInformation";
import {Header} from "../../components/Header/Header";
import { TotalPrice } from "../TotalPrice";
import { CinemaHall } from "./CinemaHall";
import './ChooseSeats.css';
import { SeatTypes } from "./SeatTypes";
import { tokenStorageKey } from "../../../App";

export function ChooseSeats({ rowsOfSeats, seatHandleClick, reservationHandleClick, sessionId, shouldDisplayContent, changeSessionContentReady, changeSeatTypesContentReady }) {
    return (
        <div className='choose-seats__container'>
            <Header showSearchForm={false} />
            <div className='choose-seats__header'>
                <SessionInformation sessionId={sessionId} changeSessionContentReady={changeSessionContentReady}/>
            </div>
            <div className='choose-seats__main main'>
                <div className='choose-seats__cinemaHall'>
                    <CinemaHall
                        rowsOfSeats={rowsOfSeats}
                        seatHandleClick={seatHandleClick}
                        shouldDisplayContent={shouldDisplayContent}
                    />
                    {shouldDisplayContent&&<TotalPrice seats={rowsOfSeats ? rowsOfSeats.flat().filter((seat) => seat.chosen === true) : null} />}
                    {shouldDisplayContent&&<button className='choose-seats__button' type='submit' value='Reserve' onClick={()=>{localStorage.getItem(tokenStorageKey)||sessionStorage.getItem(tokenStorageKey)?reservationHandleClick():alert('Log In Please!')}}>Reserve</button>}
                </div>
                <div className='choose-seats__legend'>
                <SeatTypes sessionId={sessionId} changeSeatTypesContentReady={changeSeatTypesContentReady} shouldDisplayContent={shouldDisplayContent}/>
                </div>
            </div>
        </div>
    )
}

