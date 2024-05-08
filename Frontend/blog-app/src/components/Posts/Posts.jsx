import { useState, useEffect } from "react";
import Post from "../Post/Post.jsx";
import "./Posts.css"
export default function Posts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('api/blog/all-blog').then(res => {
            res.json().then(posts => {
                // console.log(posts);
                setPosts(posts);
            })
        })
    }, [])
    return (
        <div className="posts">
            <>
                {posts.length > 0 && posts.map(post => (
                    <Post {...post} />
                ))}
            </>
        </div>
    );
}