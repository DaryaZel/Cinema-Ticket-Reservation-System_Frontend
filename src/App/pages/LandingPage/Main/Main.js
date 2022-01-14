import { FilterContext } from '../LandingPage';
import { FilterForms } from '../../components/FilterForms/FilterForms';
import { Carousel } from './Carousel/Carousel';
import { Schedule } from './Schedule/Schedule';
import './Main.css';

export function Main() {
    return (
        <main className='main'>
            <div className='main__container'>
                <div className='main__filters'>
                    <FilterContext.Consumer>
                        {({ setDay, city, setCity, setCinema }) => {
                            return (
                                <FilterForms
                                    city={city}
                                    changeSelectedCity={setCity}
                                    changeSelectedCinema={setCinema}
                                    changeSelectedDay={setDay}
                                />
                            )
                        }
                        }
                    </FilterContext.Consumer>
                </div>
                <div className='main__carousel'>
                    <Carousel />
                </div>
                <div className='main__schedule'>
                    <FilterContext.Consumer>
                        {({ day, city, cinema }) => {
                            return (
                                <Schedule city={city} cinema={cinema} day={day} />
                            )
                        }
                        }
                    </FilterContext.Consumer>
                </div>
            </div>
        </main>
    );
}
