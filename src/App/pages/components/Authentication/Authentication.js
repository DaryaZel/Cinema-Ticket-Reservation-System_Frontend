import './Authentication.css';

export function Authentication({ openLogIn, openSignUp }) {
    return (
        <div className="sign">
            <div className="sign__logIn" onClick={openLogIn}>
                <span>Log In</span>
            </div>
            <div className="sign__signUp" onClick={openSignUp}>
                <span>Sign Up</span>
            </div>
        </div>
    );
}
