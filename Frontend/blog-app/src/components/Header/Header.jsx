import { Link } from "react-router-dom"
import './Header.css'
import { useContext, useEffect} from "react"
import { UserContext } from "../UserContext.jsx"
export default function Header() {
    const{userInfo,setUserInfo}=useContext(UserContext)
    useEffect(() => {
        fetch("/api/profile", {
            credentials: 'include'
        }).then(res => { res.json().then(user => { setUserInfo(user) }) })
    }, [])
    function logout() {
        const res = fetch("/api/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        setUserInfo(null);
    }
    const userName=userInfo?.username;
    return (
        <div className="header">
            <header className="navContainer">
                <div className="navContainerL   eft">
                    <Link to='/'>My Blog</Link>
                </div>
                <div className="navContainerRight">
                    {userName && (
                        <>
                            <Link to='/createPost'>Create My Post</Link>
                            <a onClick={logout} style={{cursor:'pointer'}}>Logout</a>
                        </>
                    )}
                    {!userName && (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </>
                    )}
                </div>
            </header>
        </div>
    )
}