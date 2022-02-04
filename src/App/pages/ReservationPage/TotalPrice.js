export function TotalPrice({ rows }) {
    let ticketsPriceSum = 0;
    if (rows) {
        rows.forEach((row) => {
            row.forEach((seat) => {
                if (seat.chosen) {
                    ticketsPriceSum += seat.seat_details.price;
                }
            })
        })
    }

    return (
        <h3>Total price: {ticketsPriceSum}$</h3>
    )
}
