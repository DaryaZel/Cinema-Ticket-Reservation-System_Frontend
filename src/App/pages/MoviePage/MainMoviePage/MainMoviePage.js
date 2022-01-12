import { useState, useEffect } from 'react';
import { FilterForms } from '../../components/FilterForms/FilterForms';
import './MainMoviePage.css';
import { MainMovieSchedule } from './MovieSchedule/MainMovieSchedule';
import { Description } from './Description/Description';
import { Navigation } from './Navigation/Navigation';

export function MainMoviePage({params}) {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/movie/${params.id}`);
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                const json = await response.json();
                setMovie(json);
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
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
                        <FilterForms />
                    </div>
                    <div>
                        <Navigation />
                    </div>
                    <div className='main-movie__schedule'>
                        <MainMovieSchedule movieId={params.id} />
                    </div>
                    <div className='main-movie__description'>
                        <Description storyline={movie.storyline}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
