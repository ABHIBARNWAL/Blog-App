import { useContext, useState } from 'react'
import './Login.css'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const{setUserInfo}=useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        })
        if (res.ok) {
            res.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
              });
            
        }
        else{
            alert("Wrong Credential");
        }
    }
    if(redirect)
    {
        return <Navigate to={'/'}/>
    }
    return (
        <div className="loginForm">
            <form onSubmit={login}>
                <div className="login-email">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="enter your email"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}>
                    </input>
                </div>
                <div className="login-password">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="enter your password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}></input>
                </div>
                <button type='submit' className='login-button'>Login</button>
            </form>
        </div>
    )

}