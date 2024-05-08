import './AuthorProfile.css'
import { Link } from 'react-router-dom'
export function AuthorProfile({_id, name, username }) {
    return (
        <>
            <div className="authorInfo">
                <Link to={`/${_id}`} className="authorName">{name}</Link>
                <Link to={`/${_id}`} className="authorUsername">@{username}</Link>
            </div>
        </>
    )
}