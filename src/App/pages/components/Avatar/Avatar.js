import userAvatar from './image/user.png';
import './Avatar.css';
import { Link } from 'react-router-dom';

export function Avatar({ username, onLogout }) {
    const userAccountLink = '/personalaccount';
    return (
        <div className="avatar">
            <Link to={userAccountLink} className="link">
                <div className="avatar__user">
                    <div className="avatar__img" >
                        <img src={userAvatar} alt='avatar' />
                    </div>
                    <div className="avatar__title">
                        <span>Hi, {username}</span>
                    </div>
                </div>
            </Link>
            <div className="avatar__logOut" onClick={onLogout}>
                <span>Log Out</span>
            </div>
        </div>
    )
}
