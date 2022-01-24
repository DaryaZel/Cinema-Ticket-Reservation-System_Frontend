import { defaultDayValue } from "../../../../App";

export function FilterFormDate({ changeSelectedDay }) {
    const daysArray = [0, 1, 2, 3];
    const today = new Date();
    const nextDay = new Date();

    const locale = "en-US";
    const formattingOptions = { month: 'short', day: 'numeric' };

    return (
        <div className='filter-form'>
            <select className='filter-form__selector' name="select" onChange={(e) => changeSelectedDay(e.target.value)}>
                <option value={defaultDayValue} selected>Date</option>
                {
                    daysArray.map((item) => {
                        nextDay.setDate(today.getDate() + item);
                        return (
                            <option value={nextDay.toLocaleDateString()}>{nextDay.toLocaleDateString(locale, formattingOptions)}</option>
                        )
                    }
                    )
                }
            </select>
        </div>
    );
}
