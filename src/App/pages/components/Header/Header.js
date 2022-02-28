import { UserContext } from '../../../App.js';
import { useContext, useState } from 'react';
import film from './images/film.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { SearchForm } from './SearchForm/SearchForm';
import { Authentication } from '../Authentication/Authentication';
import { Avatar } from '../Avatar/Avatar';
import { SignUpModalWindow } from '../ModalWindow/SignUpModalWindow';
import { LogInModalWindow } from '../ModalWindow/LogInModalWindow';
import { LandingPageContext } from '../../LandingPage/LandingPage.js';

export function Header({ showSearchForm, movieData, setMovieData }) {
    const [signUpModalVisibility, setSignUpModalVisibility] = useState(false);
    const [logInModalVisibility, setLogInModalVisibility] = useState(false);
    const { user, setUserState } = useContext(UserContext);
    const { setMoviesList } = useContext(LandingPageContext) || { 'setMoviesList': null };
    return (
        <header className="header">
            <div className="header__container">
                <Link to='/' className="link"> <div className="header__logo logo" onClick={() => setMoviesList ? setMoviesList(null) : null}>
                    <div className="logo__text">
                        <h2>Spool</h2>
                    </div>
                    <div className="logo__icon">
                        <img src={film} alt="film_logo" />
                    </div>
                </div></Link>
                {showSearchForm ? <SearchForm movieData={movieData} setMovieData={setMovieData}/> : null}
                {
                    user ? (
                        <Avatar
                            username={user.username}
                            onLogout={() => {
                                localStorage.clear();
                                sessionStorage.clear();
                                setUserState(null);
                            }}
                        />) :
                        (<Authentication
                            openSignUp={() => setSignUpModalVisibility(true)}
                            openLogIn={() => setLogInModalVisibility(true)}
                        />)
                }
                {
                    signUpModalVisibility ? (
                        <SignUpModalWindow onCloseSignUpModal={() => setSignUpModalVisibility(false)} setUserState={setUserState} />
                    ) :
                        null
                }
                {
                    logInModalVisibility ? (<LogInModalWindow onCloseLogInModal={() => setLogInModalVisibility(false)} setUserState={setUserState} />)
                        : null
                }
            </div>
        </header>
    );
}
