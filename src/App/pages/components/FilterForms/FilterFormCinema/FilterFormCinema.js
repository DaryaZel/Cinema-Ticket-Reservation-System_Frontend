import { useState, useEffect } from 'react';
import { handleResponse } from '../../../../utilities/ResponseHandler';

export function FilterFormCinema({ city, changeSelectedCinema }) {
    const [cinemas, setCinemas] = useState([]);
    const allCinemasOptionValue = "All cinemas";

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
                        changeSelectedCinema(allCinemasOptionValue);
                    }
                );
            } catch (error) {
                alert(error);
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

    cinemaArray.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });

    return (
        <div className='filter-form'>
            <select className='filter-form__selector' name="select" onChange={(e) => changeSelectedCinema(e.target.value)} >
                <option value={allCinemasOptionValue} >All cinemas</option>
                {
                    cinemaArray.map((cinema, index) => (
                        <option key={cinema + index} value={cinema}>{cinema}</option>
                    ))
                }
            </select>
        </div>
    );
}
