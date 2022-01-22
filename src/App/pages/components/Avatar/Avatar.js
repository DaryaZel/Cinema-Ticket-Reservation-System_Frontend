import userAvatar from './image/user.png';
import './Avatar.css';

export function Avatar({ username, setUserState }) {
    const logOut = () => {
        localStorage.clear();
        setUserState(null);
    }
    return (
        <div className="avatar">
            <div className="avatar__img" >
                <img src={userAvatar} />
            </div>
            <div className="avatar__title">
                <span>Hi, {username}</span>
            </div>
            <div className="avatar__logOut" onClick={logOut}>
                <span>Log Out</span>
            </div>
        </div>
    )
}
