import { useState, useEffect } from 'react';
import { defaultCinemaValue } from '../../../../App';
import { handleResponse } from '../../../../utilities/ResponseHandler';

export function FilterFormCinema({ city, changeSelectedCinema }) {
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/cinema?city=${city}`)
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setCinemas(result);
                        changeSelectedCinema(defaultCinemaValue);
                    }
                );
            } catch (error) {
                alert("Oops, something went wrong");
            }
        }
        fetchData();
    }, [city]);

    const cinemaArray = [];
    for (let i = 0; i < cinemas.length; i++) {
        if (!cinemaArray.includes(cinemas[i].cinemaName)) {
            cinemaArray.push(cinemas[i].cinemaName);
        }
    };

    cinemaArray.sort();

    return (
        <div className='filter-form'>
            <select className='filter-form__selector' name="select" onChange={(e) => changeSelectedCinema(e.target.value)} >
                <option value={defaultCinemaValue} >All cinemas</option>
                {
                    cinemaArray.map((cinema, index) => (
                        <option key={cinema + index} value={cinema}>{cinema}</option>
                    ))
                }
            </select>
        </div>
    );
}
