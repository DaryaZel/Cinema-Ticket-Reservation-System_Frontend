import userAvatar from './image/user.png';
import './Avatar.css';

export function Avatar({ username, logoutUser }) {
    debugger
    const logOut = () => {
        localStorage.clear();
        logoutUser(null);
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
