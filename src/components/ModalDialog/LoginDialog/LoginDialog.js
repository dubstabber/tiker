import React from 'react'

import './LoginDialog.styles.css'

const LoginDialog = ({switchPage}) => {
    return (
        <>
            <div className="login-container">
                <form className="login-form">
                    <div className='login-title'>Log in to Tiker</div>
                    <div className='email-field'>
                        <input placeholder="Email" type='email' className='email-input'/>
                    </div>
                    <div className='password-field'>
                        <input placeholder="Password" type='password' className='password-input'/>
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
