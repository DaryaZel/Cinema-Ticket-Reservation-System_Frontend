import { useState, useEffect } from 'react';

export function FilterFormCity({ changeSelectedCity }) {
    const [cities, setCities] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://cinematicketbooking.herokuapp.com/city')
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                const json = await response.json();
                setCities(json);
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, []);

    const cityArray = [];

    for (let i = 0; i < cities.length; i++) {
        if (!cityArray.includes(cities[i].cityName) && cities[i].cityName !== 'Minsk') {
            cityArray.push(cities[i].cityName);
        }
    };
    cityArray.sort((a, b) => {
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
            <select className='filter-form__selector' name="select" onChange={(e) => changeSelectedCity(e.target.value)} >
                <option value="Minsk" selected>Minsk</option>
                {
                    cityArray.map((city, index) => (
                        <option key={city + index} value={city}>{city}</option>
                    ))
                }
            </select>
        </div>
    );
}
