export function TotalPrice({ seats }) {
    let ticketsPriceSum = 0;
    if (seats) {
        seats.forEach((seat) => {
            ticketsPriceSum += seat.seat_details.price;
        })
    }

    return (
        <h3>Total price: {ticketsPriceSum}$</h3>
    )
}
