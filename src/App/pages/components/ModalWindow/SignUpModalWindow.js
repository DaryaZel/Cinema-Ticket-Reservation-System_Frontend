import { useState } from 'react';
import { SignUpUser } from './User.js';
import './ModalWindow.css';
import name from './images/user.png';
import email from './images/arroba.png';
import password from './images/lock.png';
import { ModalWindow } from './ModalWindow.js';

export function SignUpModalWindow({ setSignUpActiveModal }) {
    const [showMessage, setShowMessage] = useState(false);
    const [inputTextName, setInputTextName] = useState('');
    const [inputTextEmail, setInputTextEmail] = useState('');
    const [inputTextPassword, setInputTextPassword] = useState('');
    const [inputTextRepeatPassword, setInputTextRepeatPassword] = useState('');
    const signUpData = [
        { title: 'Name', name: 'name', type: 'text', img: name, placeholder: 'type your username', inputText: inputTextName, setText: setInputTextName },
        { title: 'Email', name: 'email', type: 'email', img: email, placeholder: 'type your email', inputText: inputTextEmail, setText: setInputTextEmail },
        { title: 'Password', name: 'password', type: 'password', img: password, placeholder: 'type your password', inputText: inputTextPassword, setText: setInputTextPassword },
        { title: 'Repeat Password', name: 'repeatPassword', type: 'password', img: password, placeholder: 'repeat your password', inputText: inputTextRepeatPassword, setText: setInputTextRepeatPassword }
    ];

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
            const json = await response.json()
            if (response.status >= 500 && response.status < 600) {
                throw new Error("Bad response from server");
            }
            else if (response.status >= 400 && response.status < 500) {
                alert(json);
            }
            else {
                setShowMessage(true);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        let name = event.target.name.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let repeatPassword = event.target.repeatPassword.value;
        let newUser = new SignUpUser(name, email, password);
        if (password === repeatPassword) {
            handleSignUpRequest(newUser);
        }
        else {
            alert('Password mismatch');

        }

    }

    return (
        <ModalWindow title='Sign Up' setActiveModal={setSignUpActiveModal}>
            {showMessage ? <div className='modal__greeting'><h2>Welcome!</h2></div> :
                <form onSubmit={handleSubmit}>
                    <div className='modal__container'>
                        {
                            signUpData.map((item) => (
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
                    <div >
                        <button type='submit' className='modal__button'>
                            <span>Sign Up</span>
                        </button>
                    </div>
                </form>
            }
        </ModalWindow>
    )
}
