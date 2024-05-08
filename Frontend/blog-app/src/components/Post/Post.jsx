import './Post.css'
import { Link } from 'react-router-dom'
export default function Post({ _id, topic, title, summary, image, author,createdAt }) {
    return (
        <>
            <div className='post'>
                <div className="title">
                    <div>
                        <Link to="" className="type">{topic}</Link>
                    </div>
                    <Link to={`/blog/${_id}`} className="heading">{title}</Link>
                    <div className="info">
                        <Link to={`/${author._id}`} className="author">{author.name}</Link>
                        <div className="datetime">{createdAt}</div>
                    </div>
                </div>
                <Link to="" className="summary">{summary}</Link>
                <Link to={`/blog/${_id}`}><img src={image}></img></Link>
            </div>
        </>
    )
}