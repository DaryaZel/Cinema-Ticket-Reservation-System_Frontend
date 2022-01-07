import { useState } from 'react';
import { LogInUser, SignUpUser } from './User.js';
import './ModalWindow.css';
import name from './images/user.png';
import password from './images/lock.png';

export function LogInModalWindow({ setLogInActiveModal, logoutUser }) {
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
            })
            const json = await response.json()
            if (response.status >= 500 && response.status < 600) {
                throw new Error("Bad response from server");
            }
            else if (response.status >= 400 && response.status < 500) {
                alert(json)
            }
            else {
                setLogInActiveModal(false)
                logoutUser(json)
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    const handleChange = (text, setInputText) => {
        setInputText(text)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
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
            })
            const json = await response.json()

            if (response.status >= 500 && response.status < 600) {
                throw new Error("Bad response from server");
            }
            else if (response.status >= 400 && response.status < 500) {
                alert(json)
            }
            else {
                localStorage.setItem('AUTH_TOKEN', json)
                getUser(json)
            }


        } catch (error) {
            alert(error.message)
        }
    }




    return (
        <div className='modal' onClick={() => setLogInActiveModal(false)}>
            <div className='modal__content ' onClick={(e) => e.stopPropagation()}>
                <div className='modal__title'>
                    <h2>Log In</h2>
                </div>
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
            </div>
        </div>
    )
}
