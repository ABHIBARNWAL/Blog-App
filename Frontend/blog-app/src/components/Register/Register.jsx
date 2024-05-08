import { useState } from 'react'
import './Register.css'
export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    async function registerUser(ev) {
        ev.preventDefault();
        // console.log(email, username, phoneno)
        await fetch('/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email, username, phoneno, password, confirmpassword }),
        });
    }
    return (
        <div className="registerForm">
            <form onSubmit={registerUser}>
                <div className="register-name">
                    <label>Name</label>
                    <input type="text" placeholder="enter your email"
                        value={name}
                        onChange={ev => setName(ev.target.value)}>
                    </input>
                </div>
                <div className="register-email">
                    <label>Email</label>
                    <input type="text" placeholder="enter your email"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}>
                    </input>
                </div>
                <div className="register-username">
                    <label>Username</label>
                    <input type="text" placeholder="enter username" value={username} onChange={ev => setUsername(ev.target.value)}></input>
                </div>
                <div className="register-phonenum">
                    <label>Phone No.</label>
                    <input type="tel" placeholder="enter your phoneno" maxLength="10" value={phoneno} onChange={ev => setPhoneno(ev.target.value)}></input>
                </div>
                <div className="register-password">
                    <label>Password</label>
                    <input type="password" placeholder="enter your password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
                </div>
                <div className="register-confirmpassword">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="enter your password" value={confirmpassword} onChange={(ev) => setConfirmPassword(ev.target.value)}></input>
                </div>
                <button type='submit' className='register-button'>Register</button>
            </form>
        </div>
    )

}