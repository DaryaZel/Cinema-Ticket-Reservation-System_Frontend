import { useState } from 'react';
import glass from './images/magnifying_glass.png';
import './SearchForm.css';

export function SearchForm() {
    const [inputText, setInputText] = useState('');
    const handleChange = (event) => {
        setInputText(event.target.value)
    };

    return (
        <form className="search-form">
            <div className="search-form__container">
                <input type='text' name='text' id='text' className="search-form__input" value={inputText} placeholder="Search..." maxLength="20" onChange={handleChange}></input>
                <button name='enter' id='search' className="search-form__button">
                    <img src={glass} />
                </button>
            </div>
        </form>
    );
}
