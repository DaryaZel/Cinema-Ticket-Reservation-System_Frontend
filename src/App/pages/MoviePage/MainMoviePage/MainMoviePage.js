import { useState, useEffect, useContext } from 'react';
import { FilterContext } from '../MoviePage';
import { FilterForms } from '../../components/FilterForms/FilterForms';
import { MainMovieSchedule } from './MovieSchedule/MainMovieSchedule';
import { Description } from './Description/Description';
import { Navigation } from './Navigation/Navigation';
import { handleResponse } from '../../../utilities/ResponseHandler';
import './MainMoviePage.css';
import { timezone } from '../../../App';

export function MainMoviePage({ params }) {
    const [movie, setMovie] = useState(null);
    const { city, setCity, cinema, setCinema, day, setDay } = useContext(FilterContext);
    const locale = "en-US";
    const formattingOptions = {
        day: 'numeric', month: 'long'
    };
    debugger
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/movie/${params.id}?timeZone=${timezone}`);
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
            {movie && <div className='main-movie__container'>
                <div className='main-movie__movie-poster'>
                    <div className='main-movie__movie-poster-img'>
                        <img src={movie.movieInformation.posterImg_link} />
                        <div className='main-movie__movie-poster-age-restriction'>
                            <span>{movie.movieInformation.age_restriction}</span>
                        </div>
                    </div>
                </div>
                <div className='main-movie__movie-information'>
                    <div className='main-movie__movie-title'>
                        <h2>{movie.movieInformation.movieName}</h2>
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
                    <table>
                        <tr>
                            <td>Show dates:</td>
                            <td>{(new Date(movie.release_day)).toLocaleDateString(locale, formattingOptions)} - {(new Date(movie.last_day)).toLocaleDateString(locale, formattingOptions)}</td>
                        </tr>
                        <tr>
                            <td>Duration:</td>
                            <td>{movie.movieInformation.duration_min} min</td>
                        </tr>
                        <tr>
                            <td>Genre:</td>
                            <td>{movie.movieInformation.genres}</td>
                        </tr>
                        <tr>
                            <td>Age restriction:</td>
                            <td>{movie.movieInformation.age_restriction}</td>
                        </tr>
                    </table>
                    <div className='main-movie__schedule'>
                        <MainMovieSchedule
                            city={city}
                            cinema={cinema}
                            day={day}
                            movieId={params.id}
                        />
                    </div>
                    <div className='main-movie__description'>
                        <Description storyline={movie.movieInformation.storyline} />
                    </div>
                </div>
            </div>}
        </main>
    )
}
