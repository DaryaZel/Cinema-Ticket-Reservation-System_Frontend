import { useState } from 'react';
import { Ticket } from './Ticket/Ticket';
import './Carousel.css';
import leftArrow from './left_arrow.png';
import rightArrow from './right_arrow.png';
import poster_1 from './poster_1.jpeg';
import poster_2 from './poster_2.png';
import poster_3 from './poster_3.jpeg';

export function Carousel() {
    const windowWidth = 25;
    const [offset, setOffset] = useState(0);
    const handleLeftArrow = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + windowWidth
            return Math.min(newOffset, 0)
        })
    };
    const handleRightArrow = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - windowWidth
            const maxOffset = -(windowWidth * (6 - 1))
            return Math.max(newOffset, maxOffset)
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
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_1} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_2} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_3} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_1} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_2} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_3} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_1} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_2} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                    <div className='carousel__item'>
                        <div className='carousel__img-container'>
                            <img src={poster_3} />
                            <div className='carousel__ticket'>
                                <a href="#"><Ticket /></a>
                            </div>
                            <h3>Movie name</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='carousel__arrow' onClick={handleRightArrow}>
                <img src={rightArrow} />
            </div>
        </div>
    );
}
