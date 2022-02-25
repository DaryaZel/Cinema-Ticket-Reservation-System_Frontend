import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LandingPageContext } from '../../LandingPage';
import './MovieList.css'
export function MoviesList({ }) {
    const { moviesList } = useContext(LandingPageContext);

    return (
        <main className='main-movie-list'>
            {moviesList && moviesList.map((movie) => {
                const movieLink = '/movie/' + movie._id;
                return (<div key={movie._id} className='main-movie-list__container'>
                    <div className='main-movie-list__movie-poster'>
                        <Link to={movieLink} className="link">
                            <div className='main-movie-list__movie-poster-img'>
                                <img src={movie.posterImg_link} />
                                <div className='main-movie-list__movie-poster-age-restriction'>
                                    <span>{movie.age_restriction}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='main-movie-list__movie-information'>
                        <div className='main-movie-list__movie-title'>
                            <h2>{movie.movieName}</h2>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Duration:</td>
                                    <td>{movie.duration_min} min</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Genre:</td>
                                    <td>{movie.genres}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Age restriction:</td>
                                    <td>{movie.age_restriction}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>)
            })}
        </main>
    )
}
