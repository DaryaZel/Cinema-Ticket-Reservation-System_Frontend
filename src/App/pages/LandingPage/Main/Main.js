import { FilterContext, LandingPageContext } from '../LandingPage';
import { FilterForms } from '../../components/FilterForms/FilterForms';
import { Carousel } from './Carousel/Carousel';
import { Schedule } from './Schedule/Schedule';
import './Main.css';
import { useContext } from 'react';
import { MoviesList } from './MovieList/MovieList';

export function Main() {
    const { city, setCity, cinema, setCinema, day, setDay } = useContext(FilterContext);
    const {moviesList, setMoviesList } = useContext(LandingPageContext);

    return (
        <main className='main'>
            <div className='main__container'>
                {moviesList ? <MoviesList /> :
                    <div>
                        <div className='main__filters'>
                            <FilterForms
                                city={city}
                                changeSelectedCity={setCity}
                                changeSelectedCinema={setCinema}
                                changeSelectedDay={setDay}
                            />
                        </div>
                        <div className='main__carousel'>
                            <Carousel
                                city={city}
                                cinema={cinema}
                                day={day}
                            />
                        </div>
                        <div className='main__schedule'>
                            <Schedule
                                city={city}
                                cinema={cinema}
                                day={day}
                            />
                        </div>
                    </div>}

            </div>
        </main>
    );
}
