export function FilterFormCinema({}) {
    let cinemaData =[{"id":655,"cinemaName":"eiufeiufheuf","adress":{"streetAddress":"6388 Lacus Ct","city":"Kenora"}},
    {"id":761,"cinemaName":"qsqsq","adress":{"streetAddress":"6057 Vitae Rd","city":"Washington"},},
    {"id":764,"cinemaName":"wdwdwdsq","adress":{"streetAddress":"5435 Sollicitudin Ln","city":"Hudsonville"},},
    {"id":461,"cinemaName":"ujujkukik","adress":{"streetAddress":"9375 Amet Ave","city":"Kenora"},},
    {"id":701,"cinemaName":"alalsalsa","adress":{"streetAddress":"8942 Sit Ct","city":"Washington"},}
]
    const cinemaArray = []
    for (let i = 0; i < cinemaData.length; i++) {
        if (!cinemaArray.includes(cinemaData[i].cinemaName)) {
            cinemaArray.push(cinemaData[i].cinemaName)
        }
    }
    cinemaArray.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
    cinemaArray.unshift('Cinema')
    return (
        <div className='filter-form'>
                <select className='filter-form__selector' name="select" >
                    {
                        cinemaArray.map((cinema, index) => (
                            <option key={cinema + index} value={cinema}>{cinema}</option>
                        ))
                    }
                </select>
        </div>
    )
}