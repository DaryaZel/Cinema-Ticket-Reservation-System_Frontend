import userAvatar from './image/user.png';
import './Avatar.css';

export function Avatar({ username, onLogout }) {
    return (
        <div className="avatar">
            <div className="avatar__img" >
                <img src={userAvatar} />
            </div>
            <div className="avatar__title">
                <span>Hi, {username}</span>
            </div>
            <div className="avatar__logOut" onClick={onLogout}>
                <span>Log Out</span>
            </div>
        </div>
    )
}
