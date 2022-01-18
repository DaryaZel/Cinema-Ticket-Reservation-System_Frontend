import { FilterForms } from '../../components/FilterForms/FilterForms';
import './MainMoviePage.css';
import poster_1 from './images/poster_1.jpeg';
import { Schedule } from './MovieSchedule/Schedule';
import { Description } from './Description/Description';
import { Navigation } from './Navigation/Navigation';

export function MainMoviePage() {
    return (
        <main className='main-movie'>
            <div className='main-movie__container'>
                <div className='main-movie__movie-poster'>
                    <img src={poster_1} />
                </div>
                <div className='main-movie__movie-information'>
                    <div className='main-movie__movie-title'>
                        <h2>Movie Name</h2>
                    </div>
                    <div className='main-movie__filters'>
                        <FilterForms />
                    </div>
                    <div>
                        <Navigation />
                    </div>
                    <div className='main-movie__schedule'>
                        <Schedule />
                    </div>
                    <div className='main-movie__description'>
                        <Description />
                    </div>
                </div>
            </div>
        </main>
    )
}
