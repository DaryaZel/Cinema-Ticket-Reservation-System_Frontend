import { useState } from 'react';
import './ModalWindow.css';
import name from './images/user.png';
import email from './images/arroba.png';
import password from './images/lock.png';

export function SignUpModalWindow({ setSignUpActiveModal }) {
    const [inputTextName, setInputTextName] = useState('');
    const [inputTextEmail, setInputTextEmail] = useState('');
    const [inputTextPassword, setInputTextPassword] = useState('');
    const signUpData = [
        { title: 'Name', img: name, placeholder: 'type your username', inputText: inputTextName, setText: setInputTextName },
        { title: 'Email', img: email, placeholder: 'type your email', inputText: inputTextEmail, setText: setInputTextEmail },
        { title: 'Password', img: password, placeholder: 'type your password', inputText: inputTextPassword, setText: setInputTextPassword }
    ];
    const handleChange = (text, setInputText) => {
        setInputText(text)
    };

    return (
        <div className='modal' onClick={() => setSignUpActiveModal(false)}>
            <div className='modal__content ' onClick={(e) => e.stopPropagation()}>
                <div className='modal__title'>
                    <h2>Sign Up</h2>
                </div>
                <form>
                    <div className='modal__container'>
                        {
                            signUpData.map((item) => (
                                <div className='modal__row'>
                                    <div className='modal__row-title'>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className='modal__input-container'>
                                        <div className='modal__input-icon'>
                                            <img src={item.img} />
                                        </div>
                                        <input type='text' value={item.inputText} placeholder={item.placeholder} className='modal__input' onChange={(event) => handleChange(event.target.value, item.setText)}></input>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div >
                        <button className='modal__button'>
                            <span>Sign Up</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
