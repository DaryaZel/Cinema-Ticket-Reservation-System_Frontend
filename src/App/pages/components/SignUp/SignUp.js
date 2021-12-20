import './SignUp.css';

export function SignUp({ setSignUpActiveModal, setLogInActiveModal }) {

    return (
        <div className="sign">
            <div className="sign__logIn" onClick={() => setLogInActiveModal(true)}>
                <span>Log In</span>
            </div>
            <div className="sign__signUp" onClick={() => setSignUpActiveModal(true)}>
                <span>Sign Up</span>
            </div>
        </div>
    );
}
