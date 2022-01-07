import { UserContext } from '../../../App.js';
import { useState } from 'react';
import film from './images/film.png';
import './Header.css';
import { SearchForm } from './SearchForm/SearchForm';
import { SignUp } from '../SignUp/SignUp';
import { Avatar } from '../Avatar/Avatar';
import { SignUpModalWindow } from '../ModalWindow/SignUpModalWindow';
import { LogInModalWindow } from '../ModalWindow/LogInModalWindow';

export function Header() {
    const [signUpActiveModal, setSignUpActiveModal] = useState(false);
    const [logInActiveModal, setLogInActiveModal] = useState(false);
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo logo">
                    <div className="logo__text">
                        <h2>Spool</h2>
                    </div>
                    <div className="logo__icon">
                        <img src={film} alt="film_logo" />
                    </div>
                </div>
                <SearchForm />
                <UserContext.Consumer>
                    {({ user, logoutUser }) => {
                        if (user) { return (<Avatar username={user.username} logoutUser={logoutUser} />) }
                        else {
                            return (
                                <SignUp
                                    setSignUpActiveModal={setSignUpActiveModal}
                                    setLogInActiveModal={setLogInActiveModal}
                                />
                            )
                        }
                    }
                    }
                </UserContext.Consumer>
                {signUpActiveModal ? (
                    <SignUpModalWindow setSignUpActiveModal={setSignUpActiveModal} />
                ) : (
                    undefined
                )}
                <UserContext.Consumer>
                    {({ logoutUser }) => {
                        {
                            if (logInActiveModal) {
                                return (
                                    <LogInModalWindow setLogInActiveModal={setLogInActiveModal} logoutUser={logoutUser} />
                                )
                            }
                            else { return undefined }
                        }
                    }
                    }
                </UserContext.Consumer>
            </div>
        </header>
    );
}
