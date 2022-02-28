import { useState, useEffect, useRef } from 'react';
import { handleResponse } from '../../../../utilities/ResponseHandler';
import { defaultDayValue, timezone } from "../../../../App";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import close from '../images/close.png';

export function FilterFormDate({ changeSelectedDay }) {
    const [daysArray, setDaysArrays] = useState([]);
    const fp = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/session?timeZone=${timezone}`);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        let formatResult = result.map((date) => new Date(date));
                        setDaysArrays(formatResult);
                    }
                );
            } catch (error) {
                alert("Oops, something went wrong");
            }
        }
        fetchData();
    }, []);

    return (
        daysArray &&
        (<div className='filter-form'>
            <Flatpickr className='filter-form__selector' ref={fp}
                placeholder="Select Date.."
                options={{
                    enable: daysArray,
                    dateFormat: "l, F d",
                    onChange: function (selectedDate) {
                        changeSelectedDay(selectedDate)
                    }
                }}
            />
            <button
                type="button"
                className='filter-form__button'
                onClick={() => {
                    if (!fp?.current?.flatpickr) return;
                    fp.current.flatpickr.clear();
                }}
            >
                <img src={close} alt='close' />
            </button>
        </div>)
    );
}
