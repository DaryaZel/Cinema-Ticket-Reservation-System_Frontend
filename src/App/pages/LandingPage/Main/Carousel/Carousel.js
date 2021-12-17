import { useState } from 'react';
import { Ticket } from './Ticket/Ticket';
import './Carousel.css';
import leftArrow from './images/left_arrow.png';
import rightArrow from './images/right_arrow.png';
import poster_1 from './images/poster_1.jpeg';
import poster_2 from './images/poster_2.png';
import poster_3 from './images/poster_3.jpeg';

export function Carousel() {
    const movieData = [
        { id: 65, movieName: "Movie Name", posterImg: poster_1 },
        { id: 76, movieName: "Movie Name", posterImg: poster_2 },
        { id: 79, movieName: "Movie Name", posterImg: poster_3 },
        { id: 46, movieName: "Movie Name", posterImg: poster_1 },
        { id: 71, movieName: "Movie Name", posterImg: poster_2 },
        { id: 61, movieName: "Movie Name", posterImg: poster_3 },
        { id: 70, movieName: "Movie Name", posterImg: poster_1 },
        { id: 51, movieName: "Movie Name", posterImg: poster_2 },
        { id: 41, movieName: "Movie Name", posterImg: poster_3 }
    ];
    const windowWidth = 25;
    const itemsInCarouselWindow = 4;
    const [offset, setOffset] = useState(0);
    const handleLeftArrow = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + windowWidth;
            return Math.min(newOffset, 0);
        })
    };
    const handleRightArrow = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - windowWidth;
            const maxOffset = -(windowWidth * (movieData.length - itemsInCarouselWindow));
            return Math.max(newOffset, maxOffset);
        })
    };

    return (
        <div className='carousel'>
            <div className='carousel__arrow' onClick={handleLeftArrow}>
                <img src={leftArrow} />
            </div>
            <div className='carousel__window'>
                <div className='carousel__container'
                    style={{
                        transform: `translateX(${offset}%)`
                    }}
                >
                    {
                        movieData.map((movie, index) => (
                            <div key={movie.id} className='carousel__item'>
                                <div className='carousel__img-container'>
                                    <img src={movie.posterImg} />
                                    <div className='carousel__ticket'>
                                        <a href="#"><Ticket /></a>
                                    </div>
                                    <h3>{movie.movieName}</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='carousel__arrow' onClick={handleRightArrow}>
                <img src={rightArrow} />
            </div>
        </div>
    );
}
