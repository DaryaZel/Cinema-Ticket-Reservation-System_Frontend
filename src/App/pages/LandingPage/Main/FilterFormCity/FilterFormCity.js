export function FilterFormCity() {
    const cinemaData = [
        { id: 655, cinemaName: "eiufeiufheuf", address: { streetAddress: "6388 Lacus Ct", city: "Kenora" } },
        { id: 761, cinemaName: "qsqsq", address: { streetAddress: "6057 Vitae Rd", city: "Washington" } },
        { id: 764, cinemaName: "wdwdwdsq", address: { streetAddress: "5435 Sollicitudin Ln", city: "Hudsonville" } },
        { id: 461, cinemaName: "ujujkukik", address: { streetAddress: "9375 Amet Ave", city: "Kenora" } },
        { id: 701, cinemaName: "alalsalsa", address: { streetAddress: "8942 Sit Ct", city: "Washington" } }
    ];
    const cityArray = [];
    for (let i = 0; i < cinemaData.length; i++) {
        if (!cityArray.includes(cinemaData[i].address.city)) {
            cityArray.push(cinemaData[i].address.city)
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
    cityArray.unshift('New York');
    return (
        <div className='filter-form'>
            <select className='filter-form__selector' name="select" >
                {
                    cityArray.map((city, index) => (
                        <option key={city + index} value={city}>{city}</option>
                    ))
                }
            </select>
        </div>
    );
}
