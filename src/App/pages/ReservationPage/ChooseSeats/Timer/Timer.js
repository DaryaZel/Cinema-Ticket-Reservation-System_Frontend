import { useEffect, useState } from "react";

export function Timer({ makeAllSelectedSeatsFalse }) {
    const [countDown, setCountDown] = useState(0);
    const [runTimer, setRunTimer] = useState(true);

    useEffect(() => {
        let timerId;

        if (runTimer) {
            setCountDown(60 * 5);
            timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000);
        } else {
            clearInterval(timerId);
            makeAllSelectedSeatsFalse();
            alert('Sorry, time to choose a seat has expired! Please, try again.')
            setRunTimer(true);
        }

        return () => clearInterval(timerId);
    }, [runTimer]);

    useEffect(() => {
        if (countDown < 0 && runTimer) {
            setRunTimer(false);
            setCountDown(0);
        }
    }, [countDown, runTimer]);

    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

    return (
        <div className="App">
            <h3>
                Time to choose a seat: {minutes}:{seconds}
            </h3>
        </div>
    );
}
