import axios from 'axios'
import React from 'react'

import './LoginDialog.styles.css'

const LoginDialog = ({switchPage}) => {
    const handleLogin = (e) => {
        e.preventDefault()
        //console.log(`Email: ${e.target.email.value}`)
        //console.log(`Pw: ${e.target.password.value}`)
        const loginData = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        axios.post('http://localhost:5000/login', loginData).then(data => {
            console.log(data.data)
        })
    }

    return (
        <>
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <div className='login-title'>Log in to Tiker</div>
                    <div className='email-field'>
                        <input placeholder="Email" type='email' className='email-input' name='email' />
                    </div>
                    <div className='password-field'>
                        <input placeholder="Password" type='password' className='password-input' name='password' />
                    </div>
                    <button className="submit-login">Log in</button>
                </form>
            </div>
            <hr />
            <div className='register-proposal'>
                <span>Don't have an account?</span><span onClick={switchPage} className="register-link">Sign up</span>
            </div>
        </>
    )
}

export default LoginDialog
