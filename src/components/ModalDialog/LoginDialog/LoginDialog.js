import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {AppContext} from '../../../context'

import './LoginDialog.styles.css'

const LoginDialog = ({switchPage}) => {
    const [error, setError] = useState(false)
    const {login} = useContext(AppContext)
    
    const handleLogin = (e) => {
        e.preventDefault()
        const loginData = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        setError(login(loginData))
        window.location.reload()
        return <Redirect to='/' />
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
                    {error && <span className='login-error'>Invalid login or password</span>}
                    <button className='submit-login'>Log in</button>
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
