import './Ticket.css';
import ticket from './images/ticket.png';

export function Ticket() {
    return (
        <div className='carousel__ticket ticket'>
            <div className='ticket__icon'>
                <img src={ticket} />
            </div>
            <div className='ticket__text'>
                <span>Ticket</span>
            </div>
        </div>
    );
}
