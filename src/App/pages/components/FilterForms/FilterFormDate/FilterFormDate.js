import { useState, useEffect } from 'react';
import { handleResponse } from '../../../../utilities/ResponseHandler';
import { defaultDayValue, timezone} from "../../../../App";

export function FilterFormDate({ changeSelectedDay }) {
    const [daysArray, setDaysArrays] = useState([]);
        useEffect(() => {
            async function fetchData() {
                try {
                    const response = await fetch(`https://cinematicketbooking.herokuapp.com/session?timeZone=${timezone}`);
                    handleResponse(response,
                        (error) => {
                            alert(error);
                        },
                        (result) => {
                            setDaysArrays(result);
                        }
                    );
                } catch (error) {
                    alert(error);
                }
            }
            fetchData();
        }, []);

    const locale = "en-US";
    const formattingOptions = { month: 'short', day: 'numeric' };

    return (
        daysArray&&
        (<div className='filter-form'>
            <select className='filter-form__selector' name="select" onChange={(e) => changeSelectedDay(e.target.value)}>
                <option value={defaultDayValue} selected>Date</option>
                {
                    daysArray.map((item) => {
                        return (
                            <option value={new Date (item)}>{new Date (item).toLocaleDateString(locale, formattingOptions)}</option>
                        )
                    }
                    )
                }
            </select>
        </div>)
    );
}
