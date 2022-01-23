import { useState } from 'react';
import { LogInUser, SignUpUser } from './User.js';
import './ModalWindow.css';
import name from './images/user.png';
import password from './images/lock.png';
import { ModalWindow } from './ModalWindow.js';
import { handleResponse } from '../../../utilities/ResponseHandler.js';

export function LogInModalWindow({ onCloseLogInModal, setUserState }) {
    const [inputTextName, setInputTextName] = useState('');
    const [inputTextPassword, setInputTextPassword] = useState('');
    const logInData = [
        { title: 'Name', name: 'name', type: 'text', img: name, placeholder: 'type your username', inputText: inputTextName, setText: setInputTextName },
        { title: 'Password', name: 'password', type: 'password', img: password, placeholder: 'type your password', inputText: inputTextPassword, setText: setInputTextPassword }
    ];
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
            alert(error);
        }
    }

    const handleChange = (text, setInputText) => {
        setInputText(text);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let name = event.target.name.value;
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
                    alert(error);
                },
                (result) => {
                    localStorage.setItem('AUTH_TOKEN', result);
                    getUser(result);
                }
            );
        } catch (error) {
            alert(error);
        }
    }

    return (
        <ModalWindow title='Log In' onCloseModalWindow={() => onCloseLogInModal()}>
            <form onSubmit={handleSubmit}>
                <div className='modal__container'>
                    {
                        logInData.map((item) => (
                            <div className='modal__row'>
                                <label for={item.name} className='modal__row-title'>
                                    <span>{item.title}</span>
                                </label>
                                <div className='modal__input-container'>
                                    <div className='modal__input-icon'>
                                        <img src={item.img} />
                                    </div>
                                    <input id={item.name} type={item.type} name={item.name} value={item.inputText} placeholder={item.placeholder} className='modal__input' onChange={(event) => handleChange(event.target.value, item.setText)}></input>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <div className='modal__checkbox'>
                        <input type="checkbox" id="remember" name="remember"></input>
                        <label for="remember"><span>Remember Me</span></label>
                    </div>
                    <button type='submit' className='modal__button'>
                        <span>Log in</span>
                    </button>
                </div>
            </form>
        </ModalWindow>
    )
}
