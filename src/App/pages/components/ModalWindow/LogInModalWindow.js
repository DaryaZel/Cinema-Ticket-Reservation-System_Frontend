import { useState } from 'react';
import { tokenStorageKey } from '../../../App.js';
import { LogInUser } from './User.js';
import name from './images/user.png';
import password from './images/lock.png';
import { ModalWindow } from './ModalWindow.js';
import { handleResponse } from '../../../utilities/ResponseHandler.js';
import './ModalWindow.css';

export function LogInModalWindow({ onCloseLogInModal, setUserState }) {
    const [inputTextName, setInputTextName] = useState('');
    const [inputTextPassword, setInputTextPassword] = useState('');
    const [responseErrors, setResponseErrors] = useState(
        {
            'username': null,
            'password': null
        });
    const [checked, setChecked] = useState(false);

    const logInData = [
        { title: 'Name', name: 'username', type: 'text', img: name, placeholder: 'type your username', inputText: inputTextName, setText: setInputTextName },
        { title: 'Password', name: 'password', type: 'password', img: password, placeholder: 'type your password', inputText: inputTextPassword, setText: setInputTextPassword }
    ];
    const titleLoginModalWindow = 'Log In';
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
                    onCloseLogInModal();
                    setUserState(result);
                }
            );
        }
        catch (error) {
            alert("Oops, something went wrong");
        }
    }

    const handleChange = (text, setInputText) => {
        setInputText(text);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let name = event.target.username.value;
        let password = event.target.password.value;
        let newUser = new LogInUser(name, password);
        try {
            const response = await fetch('https://cinematicketbooking.herokuapp.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            handleResponse(response,
                (error) => {
                    setResponseErrors(error);
                },
                (result) => {
                    if (checked) {
                        localStorage.setItem(tokenStorageKey, result);
                    }
                    else {
                        sessionStorage.setItem(tokenStorageKey, result);
                    }
                    getUser(result);
                }
            );
        } catch (error) {
            alert("Oops, something went wrong");
        }
    }

    return (
        <ModalWindow title={titleLoginModalWindow} onCloseModalWindow={() => onCloseLogInModal()}>
            <form onSubmit={handleSubmit}>
                <div className='auth-modal__container'>
                    {
                        logInData.map((item) => (
                            <div key={item._id} className='auth-modal__row'>
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
                                        <input id={item.name} type={item.type} name={item.name} value={item.inputText} placeholder={item.placeholder} className='auth-modal__input' onChange={(event) => handleChange(event.target.value, item.setText)}></input>
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
                <div>
                    <div className='auth-modal__checkbox'>
                        <input type="checkbox"
                            id="remember"
                            name="remember"
                            checked={checked}
                            onChange={e => setChecked(e.target.checked)}>
                        </input>
                        <label for="remember"><span>Remember Me</span></label>
                    </div>
                    <button type='submit' className='auth-modal__button'>
                        <span>Log in</span>
                    </button>
                </div>
            </form>
        </ModalWindow>
    )
}
