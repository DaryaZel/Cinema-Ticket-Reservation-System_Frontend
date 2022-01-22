import { useState, useEffect, useContext } from 'react';
import { FilterContext } from '../MoviePage';
import { FilterForms } from '../../components/FilterForms/FilterForms';
import { MainMovieSchedule } from './MovieSchedule/MainMovieSchedule';
import { Description } from './Description/Description';
import { Navigation } from './Navigation/Navigation';
import { handleResponse } from '../../../utilities/ResponseHandler';
import './MainMoviePage.css';

export function MainMoviePage({ params }) {
    const [movie, setMovie] = useState([]);
    const { city, setCity, cinema, setCinema, day, setDay } = useContext(FilterContext);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/movie/${params.id}`);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setMovie(result);
                    }
                );
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, []);
    return (
        <main className='main-movie'>
            <div className='main-movie__container'>
                <div className='main-movie__movie-poster'>
                    <img src={movie.posterImg_link} />
                </div>
                <div className='main-movie__movie-information'>
                    <div className='main-movie__movie-title'>
                        <h2>{movie.movieName}</h2>
                    </div>
                    <div className='main-movie__filters'>
                        <FilterForms
                            city={city}
                            changeSelectedCity={setCity}
                            changeSelectedCinema={setCinema}
                            changeSelectedDay={setDay}
                        />
                    </div>
                    <div>
                        <Navigation />
                    </div>
                    <div className='main-movie__schedule'>
                        <MainMovieSchedule
                            city={city}
                            cinema={cinema}
                            day={day}
                            movieId={params.id}
                        />
                    </div>
                    <div className='main-movie__description'>
                        <Description storyline={movie.storyline} />
                    </div>
                </div>
            </div>
        </main>
    )
}
