import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Post from "../Post/Post.jsx";
import { AuthorProfile } from "../AuthorProfile/AuthorProfile.jsx";
import './Author.css'

export function Author() {
    const param = useParams();
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState();
    useEffect(() => {

        // console.log(param.id);
        fetch(`/api/${param.id}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data.blogs);
                setAuthor(data.user);
            });

    }, []) 
    return (
        <>
            <div className="authorDetails">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyxKhehkZs_pVuIVfhoBbck7s920zBjUheh9oHh3v8rZaD_WppZ6fo81itug&s"></img>
                <AuthorProfile {...author} />
            </div>
            <div className="authorPosts">
                {posts.length > 0 && posts.map(post => (
                    <Post {...post} />
                ))}
            </div>
        </>
    )
}