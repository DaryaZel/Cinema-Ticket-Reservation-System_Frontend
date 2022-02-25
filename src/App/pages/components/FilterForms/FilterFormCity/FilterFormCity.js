import { useState, useEffect } from 'react';
import { defaultCityValue } from '../../../../App';
import { handleResponse } from '../../../../utilities/ResponseHandler';

export function FilterFormCity({ changeSelectedCity }) {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://cinematicketbooking.herokuapp.com/city')
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setCities(result);
                    }
                );
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, []);

    const cityArray = [];

    for (let i = 0; i < cities.length; i++) {
        if (!cityArray.includes(cities[i].cityName) && cities[i].cityName !== defaultCityValue) {
            cityArray.push(cities[i].cityName);
        }
    };
    cityArray.sort();

    return (
        <div className='filter-form'>
            <select className='filter-form__selector' defaultValue={defaultCityValue} name="select" onChange={(e) => changeSelectedCity(e.target.value)} >
                <option value={defaultCityValue} >Minsk</option>
                {
                    cityArray.map((city, index) => (
                        <option key={city + index} value={city}>{city}</option>
                    ))
                }
            </select>
        </div>
    );
}
