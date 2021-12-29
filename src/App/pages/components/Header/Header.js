import film from './images/film.png';
import './Header.css';
import { SearchForm } from './SearchForm/SearchForm';
import { SignUp } from '../SignUp/SignUp';

export function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo logo">
                    <div className="logo__text">
                        <h2>Spool</h2>
                    </div>
                    <div className="logo__icon">
                        <img src={film} alt="film_logo"/>
                    </div>
                </div>
                <SearchForm />
                <SignUp />
            </div>
        </header>
    );
}
