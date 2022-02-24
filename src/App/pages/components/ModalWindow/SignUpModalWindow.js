import { useState } from 'react';
import { SignUpUser } from './User.js';
import { tokenStorageKey } from '../../../App.js';
import './ModalWindow.css';
import name from './images/user.png';
import email from './images/arroba.png';
import password from './images/lock.png';
import { ModalWindow } from './ModalWindow.js';
import { handleResponse } from '../../../utilities/ResponseHandler.js'

export function SignUpModalWindow({ onCloseSignUpModal, setUserState }) {
    const [showMessage, setShowMessage] = useState(false);
    const [responseErrors, setResponseErrors] = useState(
        {
            'username': null,
            'email': null,
            'password': null
        });
    const [inputTextName, setInputTextName] = useState('');
    const [inputTextEmail, setInputTextEmail] = useState('');
    const [inputTextPassword, setInputTextPassword] = useState('');
    const [inputTextRepeatPassword, setInputTextRepeatPassword] = useState('');
    const signUpData = [
        { title: 'Name', name: 'username', type: 'text', img: name, placeholder: 'type your username', inputText: inputTextName, setText: setInputTextName },
        { title: 'Email', name: 'email', type: 'email', img: email, placeholder: 'type your email', inputText: inputTextEmail, setText: setInputTextEmail },
        { title: 'Password', name: 'password', type: 'password', img: password, placeholder: 'type your password', inputText: inputTextPassword, setText: setInputTextPassword },
        { title: 'Repeat Password', name: 'repeatPassword', type: 'password', img: password, placeholder: 'repeat your password', inputText: inputTextRepeatPassword, setText: setInputTextRepeatPassword }
    ];
    const titleSignUpModalWindow = 'Sign Up';
    const getUser = async (token) => {
        try {
            const response = await fetch('https://cinematicketbooking.herokuapp.com/auth/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            handleResponse(response,
                (error) => {
                    alert(error);
                },
                (result) => {
                    setUserState(result);
                }
            );
        }
        catch (error) {
            alert(error);
        }
    }
    const handleChange = (text, setInputText) => {
        setInputText(text);
    };

    const handleSignUpRequest = async (newUser) => {
        try {
            const response = await fetch('https://cinematicketbooking.herokuapp.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
            handleResponse(response,
                (error) => {
                    setResponseErrors(error);
                },
                (result) => {
                    sessionStorage.setItem(tokenStorageKey, result);
                    getUser(result);
                    setShowMessage(true);
                }
            )
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        let name = event.target.username.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let repeatPassword = event.target.repeatPassword.value;
        let newUser = new SignUpUser(name, email, password);
        if (password === repeatPassword) {
            handleSignUpRequest(newUser);
        }
        else {
            setResponseErrors({ 'password': 'Password mismatch' });
        }
    }

    return (
        <ModalWindow title={titleSignUpModalWindow} onCloseModalWindow={() => onCloseSignUpModal()}>
            {showMessage ? <div className='auth-modal__greeting'><h2>Welcome!</h2></div> :
                <form onSubmit={handleSubmit}>
                    <div className='auth-modal__container'>
                        {
                            signUpData.map((item) => (
                                <div className='auth-modal__row'>
                                    <div className='auth-modal__field-container'>
                                        <div className='auth-modal__input-container'>
                                            <div className='auth-modal__label'>
                                                <label for={item.name} className='auth-modal__row-title'>
                                                    <span>{item.title}</span>
                                                </label>
                                            </div>
                                            <div className='auth-modal__input-icon'>
                                                <img src={item.img} />
                                            </div>
                                            <input
                                                id={item.name}
                                                type={item.type}
                                                name={item.name}
                                                value={item.inputText}
                                                placeholder={item.placeholder}
                                                className='auth-modal__input'
                                                onChange={(event) => handleChange(event.target.value, item.setText)}>
                                            </input>
                                        </div>
                                        <div className='auth-modal__error-container'>
                                            {responseErrors[item.name] ?
                                                <h6 className='auth-modal__error'>{responseErrors[item.name]}</h6> :
                                                <h6 className='auth-modal__error'></h6>}
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    <div >
                        <button type='submit' className='auth-modal__button'>
                            <span>Sign Up</span>
                        </button>
                    </div>
                </form>
            }
        </ModalWindow>
    )
}
