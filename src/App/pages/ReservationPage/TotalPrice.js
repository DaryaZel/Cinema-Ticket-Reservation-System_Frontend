export function TotalPrice({ seats }) {
    let ticketsPriceSum = 0;
    if (seats) {
        seats.forEach((seat) => {
            ticketsPriceSum += seat.seat_details.price;
        })
    }

    return (
        <h2>Total price: {ticketsPriceSum}$</h2>
    )
}
